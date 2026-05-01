<template>
  <LuxInputText :value="dateString"></LuxInputText>
  <LuxInputButton type="button" variation="text" currentColor="black" @buttonClicked="open()">
    <LuxIconBase height="14" width="14" iconName="close">
      <LuxIconCalendar></LuxIconCalendar>
    </LuxIconBase>
  </LuxInputButton>
  <LuxDialog position="inline" ref="dialog">
    <template v-if="props.label" #title>{{ props.label }}</template>
    <LuxCalendar @selected="writeToInput($event)" :locale="locale"></LuxCalendar>
  </LuxDialog>
</template>
<script setup>
import LuxInputText from "./LuxInputText.vue"
import LuxCalendar from "./_LuxCalendar.vue"
import { ref, useTemplateRef } from "vue"
import { toString } from "@/utils/luxDate"
import LuxDialog from "./LuxDialog.vue"
import LuxInputButton from "./LuxInputButton.vue"
import LuxIconCalendar from "./icons/LuxIconCalendar.vue"

const props = defineProps({
  label: String,
  /**
   * The locale to use for the calendar (e.g. en-US, cs-CZ).  If none is specified, use the user's browser default locale.
   */
  locale: { type: String, default: "default" },
})

const dialog = useTemplateRef("dialog")

const dateString = ref(toString(new Date()))

function open() {
  dialog.value.open()
}

function writeToInput(date) {
  dateString.value = toString(date)
}
</script>
<docs>
  ```jsx
    <new-lux-date-picker label="Presentation date"></new-lux-date-picker>
  ```
</docs>
