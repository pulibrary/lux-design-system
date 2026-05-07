<template>
  <LuxInputButton @button-clicked="previousMonth()" type="button" size="small"
    >Previous month</LuxInputButton
  >
  <span :id="monthId">{{ monthLabel }} {{ currentYear }}</span>
  <LuxInputButton @button-clicked="nextMonth()" type="button" size="small"
    >Next month</LuxInputButton
  >
  <table class="lux-calendar">
    <tbody>
      <tr>
        <th scope="col">{{ dayName(SUNDAY, props.locale) }}</th>
        <th scope="col">{{ dayName(MONDAY, props.locale) }}</th>
        <th scope="col">{{ dayName(TUESDAY, props.locale) }}</th>
        <th scope="col">{{ dayName(WEDNESDAY, props.locale) }}</th>
        <th scope="col">{{ dayName(THURSDAY, props.locale) }}</th>
        <th scope="col">{{ dayName(FRIDAY, props.locale) }}</th>
        <th scope="col">{{ dayName(SATURDAY, props.locale) }}</th>
      </tr>
      <tr v-for="week in calendarWeeks" :key="week">
        <td
          v-for="day in week"
          @click="selectDay(day)"
          :key="day"
          :class="{
            'lux-day': true,
            'lux-highlight-today': isToday(day),
            'lux-highlight-selected': isSelected(day),
            'lux-highlight-range': isInRange(day),
          }"
          role="button"
          :aria-label="day"
          :aria-describedby="monthId"
          tabindex="-1"
          :ref="'day-' + day"
        >
          {{ day }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import {
  monthName,
  weeks,
  dayName,
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  lastDayOfMonth,
} from "@/utils/luxDate"
import {
  computed,
  defineModel,
  onDeactivated,
  onMounted,
  ref,
  watch,
  useTemplateRef,
  useId,
} from "vue"
import LuxInputButton from "./LuxInputButton.vue"

const JANUARY = 0
const DECEMBER = 11

const props = defineProps({
  month: { type: Number, default: 3 },
  year: { type: Number, default: 2026 },
  /**
   * The locale to use for the calendar (e.g. en-US, cs-CZ).  If none is specified, use the user's browser default locale.
   */
  locale: { type: String, default: "default" },
})
const emit = defineEmits(["selectedRange"])

/*
If it is an array:
  to set it: we would
    - check length
    - know which index to add (default to the first element)
    - use modulus % 2 to know which index to do next
  to emit the event
    - watch the array, and when it has 2 elements, emit it
   
// If it is two separate variables: 
    - set the variables to undefined
    - check if first is undefined.  If so, it goes there
    - check if second is undefined.  If so, it goes there
    - if both were defined, undefine both and put in first position

    to emit the event
      - watch the second variable, emit both variables when it is defined
*/

// The first date that the user has selected, which may or may not be the first one chronologically
const firstSelectedDate = ref()
const secondSelectedDate = ref()

function emitTheRange() {
  const dates = newFunction()
  emit("selectedRange", dates)
}

function newFunction() {
  const dates = [firstSelectedDate.value, secondSelectedDate.value]
  dates.sort((a, b) => a - b)
  return dates
}

function selectDay(day) {
  if (firstSelectedDate.value === undefined) {
    firstSelectedDate.value = toDate(day)
  } else if (secondSelectedDate.value === undefined) {
    secondSelectedDate.value = toDate(day)
    emitTheRange()
  } else {
    // reset to the beginning and start recording a new range
    secondSelectedDate.value = undefined
    firstSelectedDate.value = toDate(day)
  }
}

function toDate(dayString) {
  return new Date(currentYear.value, currentMonth.value, parseInt(dayString))
}

const currentMonth = ref(props.month)
const currentYear = ref(props.year)
const calendarWeeks = computed(() => weeks(currentYear.value, currentMonth.value))
const monthLabel = computed(() => monthName(currentMonth.value, props.locale))

// The day selected with keyboard focus
const focusedDay = ref(firstSelectedDate.value || new Date().getDate())
const keydownBehavior = event => {
  switch (event.key) {
    case "ArrowDown":
      focusedDay.value += 7
      validateFocusedDay()
      break
    case "ArrowUp":
      focusedDay.value -= 7
      validateFocusedDay()
      break
    case "ArrowRight":
      focusedDay.value += 1
      validateFocusedDay()
      break
    case "ArrowLeft":
      focusedDay.value -= 1
      validateFocusedDay()
      break
    case "Enter":
      selectDay(focusedDay.value)
      break
  }
}
onMounted(() => {
  document.addEventListener("keydown", keydownBehavior)
  setTimeout(() => dayRefs[focusedDay.value].value[0].focus())
})
onDeactivated(() => document.removeEventListener("keydown", keydownBehavior))

const dayRefs = [...Array(32).keys()].map(day => useTemplateRef(`day-${day}`))

watch(focusedDay, value => {
  setTimeout(() => dayRefs[value].value[0].focus())
})

function validateFocusedDay() {
  const daysInMonth = lastDayOfMonth(currentYear.value, currentMonth.value)
  if (focusedDay.value < 1) {
    currentMonth.value = currentMonth.value - 1
    if (currentMonth.value < JANUARY) {
      currentMonth.value = DECEMBER
      currentYear.value--
    }
    focusedDay.value = lastDayOfMonth(currentYear.value, currentMonth.value) + focusedDay.value
  } else if (focusedDay.value > daysInMonth) {
    currentMonth.value = currentMonth.value + 1
    if (currentMonth.value > DECEMBER) {
      currentMonth.value = JANUARY
      currentYear.value++
    }
    focusedDay.value = focusedDay.value - daysInMonth
  }
}

function previousMonth() {
  if (currentMonth.value == JANUARY) {
    currentMonth.value = DECEMBER
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value == DECEMBER) {
    currentMonth.value = JANUARY
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function isToday(day) {
  const today = new Date()
  return (
    day === today.getDate() &&
    currentMonth.value === today.getMonth() &&
    currentYear.value === today.getFullYear()
  )
}

function isSelected(day) {
  if (day) {
    const dateToCheck = toDate(day)
    return (
      dateToCheck.getTime() === firstSelectedDate.value?.getTime() ||
      dateToCheck.getTime() === secondSelectedDate.value?.getTime()
    )
  } else {
    return false
  }
}

function isInRange(day) {
  if (day && firstSelectedDate.value && secondSelectedDate.value) {
    const dateToCheck = toDate(day)
    const dates = [firstSelectedDate.value, secondSelectedDate.value]
    dates.sort((a, b) => a - b)
    return dateToCheck.getTime() > dates[0].getTime() && dateToCheck.getTime() < dates[1].getTime()
  } else {
    return false
  }
}

const idPrefix = useId()
const monthId = `${idPrefix}-month`
</script>
<style>
.lux-calendar {
  border-radius: var(--border-radius-default);
}

.lux-highlight-today {
  background-color: var(--color-bleu-de-france-darker);
  color: var(--color-white);
}
.lux-highlight-selected {
  background-color: var(--color-light-blue);
  color: var(--color-gray-90);
  border-radius: var(--border-radius-circle);
  border: 1px solid var(--color-bleu-de-france-light);
}

.lux-highlight-range {
  background-color: var(--color-light-blue);
}

td.lux-day {
  height: var(--lux-cell-size);
  width: var(--lux-cell-size);
  text-align: center;
}

td:focus {
  border: 0.25rem var(--color-princeton-orange-on-white) solid;
}
</style>
