<template>
  <LuxInputText :value="dateString"></LuxInputText>
  <LuxCalendar @selected="writeToInput($event)" :locale="locale"></LuxCalendar>
</template>
<script setup>
import LuxInputText from "./LuxInputText.vue"
import LuxCalendar from "./_LuxCalendar.vue"
import { ref } from "vue"
import { toString } from "@/utils/luxDate"

const props = defineProps({
  /**
   * The locale to use for the calendar (e.g. en-US, cs-CZ).  If none is specified, use the user's browser default locale.
   */
  locale: { type: String, default: "default" },
})

const dateString = ref(toString(new Date()))

function writeToInput(date) {
  dateString.value = toString(date)
}
</script>
