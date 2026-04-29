<template>
  <LuxInputButton @button-clicked="previousMonth()" type="button" size="small"
    >Previous month</LuxInputButton
  >
  {{ monthLabel }} {{ currentYear }}
  <LuxInputButton @button-clicked="nextMonth()" type="button" size="small"
    >Next month</LuxInputButton
  >
  <table>
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
          :class="{ 'lux-highlight-today': isToday(day) }"
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
} from "@/utils/luxDate"
import { computed, ref } from "vue"
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
const emit = defineEmits("selected")

const currentMonth = ref(props.month)
const currentYear = ref(props.year)
const calendarWeeks = computed(() => weeks(currentYear.value, currentMonth.value))
const monthLabel = computed(() => monthName(currentMonth.value, props.locale))

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
</script>
<style>
.lux-highlight-today {
  background-color: var(--color-bleu-de-france-darker);
  color: var(--color-white);
}
</style>
