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
  JANUARY,
  DECEMBER,
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

const props = defineProps({
  month: { type: Number, default: 3 },
  year: { type: Number, default: 2026 },
  /**
   * The locale to use for the calendar (e.g. en-US, cs-CZ).  If none is specified, use the user's browser default locale.
   */
  locale: { type: String, default: "default" },
})
const emit = defineEmits(["selectedRange"])

function emitTheRange() {
  emit("selectedRange", orderedDates())
}

function orderedDates() {
  const dates = [...selectedRange.value]
  dates.sort((a, b) => a - b)
  return dates
}

function selectDay(day) {
  if (selectedRange.value?.[0] === undefined) {
    selectedRange.value = [toDate(day), undefined]
  } else if (selectedRange.value?.[1] === undefined) {
    selectedRange.value = [selectedRange.value[0], toDate(day)]
    emitTheRange()
  } else {
    // reset to the beginning and start recording a new range
    selectedRange.value = [toDate(day), undefined]
  }
}

function toDate(dayString) {
  return new Date(currentYear.value, currentMonth.value, parseInt(dayString))
}

const selectedRange = defineModel({ type: Array })

const mostRecentlySelectedDay = computed(() => {
  if (selectedRange.value?.length) {
    return selectedRange.value[selectedRange.value.length - 1].getDate()
  }
  return null
})

const currentMonth = ref(props.month)
const currentYear = ref(props.year)
const calendarWeeks = computed(() => weeks(currentYear.value, currentMonth.value))
const monthLabel = computed(() => monthName(currentMonth.value, props.locale))

// The day selected with keyboard focus
const focusedDay = ref(mostRecentlySelectedDay.value || new Date().getDate())
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
  if (dayRefs[focusedDay.value].value) {
    setTimeout(() => dayRefs[focusedDay.value].value[0].focus())
  }
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
    return selectedRange.value?.some(
      selectedDate => dateToCheck.getTime() == selectedDate.getTime()
    )
  } else {
    return false
  }
}

function isInRange(day) {
  if (day && selectedRange.value?.[0] && selectedRange.value?.[1]) {
    const dateToCheck = toDate(day)
    const dates = [...selectedRange.value]
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
