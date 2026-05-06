<template>
  <div class="lux-datepicker-input-group">
    <LuxInputText :value="dateString" :id="props.id" :name="props.name"></LuxInputText>
    <LuxInputButton
      type="button"
      variation="outline"
      currentColor="black"
      @buttonClicked="toggle()"
      :aria-controls="dialogId"
      :aria-expanded="isOpen()"
    >
      <LuxIconBase height="14" width="14" iconName="toggle calendar">
        <LuxIconCalendar></LuxIconCalendar>
      </LuxIconBase>
    </LuxInputButton>
  </div>
  <LuxDialog position="inline" ref="dialog" :id="dialogId">
    <template v-if="props.label" #title>{{ props.label }}</template>
    <LuxCalendar @selected="writeToInput($event)" :locale="locale"></LuxCalendar>
  </LuxDialog>
</template>
<script setup>
import LuxInputText from "./LuxInputText.vue"
import LuxCalendar from "./_LuxCalendar.vue"
import { ref, useId, useTemplateRef } from "vue"
import { toString } from "@/utils/luxDate"
import LuxDialog from "./LuxDialog.vue"
import LuxIconBase from "./icons/LuxIconBase.vue"
import LuxInputButton from "./LuxInputButton.vue"
import LuxIconCalendar from "./icons/LuxIconCalendar.vue"

const props = defineProps({
  id: String,
  name: String,
  label: String,
  /**
   * The locale to use for the calendar (e.g. en-US, cs-CZ).  If none is specified, use the user's browser default locale.
   */
  locale: { type: String, default: "default" },
})

const dialog = useTemplateRef("dialog")

const dateString = ref(toString(new Date()))

const dialogId = useId()

function isOpen() {
  return Boolean(dialog.value?.isOpen())
}

function toggle() {
  if (isOpen()) {
    dialog.value.close()
  } else {
    dialog.value.open()
  }
}

function writeToInput(date) {
  dateString.value = toString(date)
}
</script>
<style>
.lux-datepicker-input-group {
  display: flex;
}
</style>
<docs>
  ```jsx
    <new-lux-date-picker label="Presentation date"></new-lux-date-picker>
  ```
</docs>
