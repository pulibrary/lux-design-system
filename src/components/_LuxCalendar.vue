<template>
  <LuxInputButton @button-clicked="previousMonth()" type="button" size="small"
    >Previous month</LuxInputButton
  >
  {{ monthLabel }} {{ currentYear }}
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
          @click="emitDay(day)"
          :key="day"
          :class="{
            'lux-day': true,
            'lux-highlight-focus': focusedDay == day,
            'lux-highlight-today': isToday(day),
            'lux-highlight-selected': isSelected(day),
          }"
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
import { computed, defineModel, onDeactivated, onMounted, ref } from "vue"
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
const emit = defineEmits(["selected"])
const selectedDate = defineModel()

const currentMonth = ref(props.month)
const currentYear = ref(props.year)
const calendarWeeks = computed(() => weeks(currentYear.value, currentMonth.value))
const monthLabel = computed(() => monthName(currentMonth.value, props.locale))

// The day selected with keyboard focus
const focusedDay = ref(selectedDate.value || new Date().getDate())
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
      emitDay(focusedDay.value)
      break
  }
}
onMounted(() => {
  document.addEventListener("keydown", keydownBehavior)
})
onDeactivated(() => document.removeEventListener("keydown", keydownBehavior))

function validateFocusedDay() {
  const daysInMonth = lastDayOfMonth(currentYear.value, currentMonth.value)
  console.log(focusedDay.value, daysInMonth)
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

function emitDay(day) {
  selectedDate.value = day
  emit("selected", new Date(currentYear.value, currentMonth.value, day))
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
    return day == selectedDate.value
  } else {
    return false
  }
}
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

td.lux-day {
  height: var(--lux-cell-size);
  width: var(--lux-cell-size);
  text-align: center;
}

td.lux-highlight-focus {
  border: 0.25rem var(--color-princeton-orange-on-white) solid;
}
</style>
