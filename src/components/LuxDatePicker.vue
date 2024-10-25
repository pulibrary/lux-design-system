<template>
  <div :class="['lux-date-picker', size]">
    <DatePicker
      v-if="mode == 'single'"
      mode="single"
      :disabled-dates="disabledDates"
      :update-on-input="true"
      :attributes="attributes"
      v-model="date"
      @popover-did-disappear="calendarClosedSingle($event)"
    >
      <template #default="{ inputValue, inputEvents }">
        <lux-input-text
          :id="id"
          :label="label"
          :name="name"
          :required="required"
          :width="width"
          :size="size"
          v-on="inputEvents"
          :value="inputValue"
          :placeholder="placeholder"
          :helper="helper"
        ></lux-input-text>
      </template>
    </DatePicker>
    <DatePicker
      v-if="mode == 'range'"
      :disabled-dates="disabledDates"
      :update-on-input="true"
      :attributes="attributes"
      v-model.range="range"
      @popover-did-disappear="calendarClosedRange($event)"
    >
      <template #default="{ inputEvents }">
        <lux-input-text
          :id="id"
          :label="label"
          :name="name"
          :width="width"
          :size="size"
          :required="required"
          v-on="inputEvents.start"
          v-model:value="formattedRange"
          :placeholder="placeholder"
          :helper="helper"
        ></lux-input-text>
      </template>
    </DatePicker>
  </div>
</template>

<script setup>
/**
 * Date Pickers allow users to select a valid date or date range as a text input field value.
 * The LUX DatePicker uses [vCalendar](https://vcalendar.io/) and can be modified to support
 * existing vCalendar functionality.
 */
import { DatePicker } from "v-calendar"
import { ref, watchEffect, computed } from "vue"

defineOptions({ name: "LuxDatePicker" })
const props = defineProps({
  /**
   * Allows for a single date or a date range to be selected. Possible values are: `single, range`.
   */
  mode: {
    type: String,
    default: "single",
    validator: value => {
      return value.match(/(single|range)/)
    },
  },
  /**
   * The label of the form input field.
   */
  label: {
    type: String,
    default: "",
  },
  /**
   * Unique identifier of the form input field.
   */
  id: {
    type: String,
    default: "",
    required: true,
  },
  /**
   * The name attribute for the form input field.
   */
  name: {
    type: String,
    default: "",
    required: true,
  },
  /**
   * The width of the form input field.
   * `auto, expand`
   */
  width: {
    type: String,
    default: "auto",
    validator: value => {
      return value.match(/(auto|expand)/)
    },
  },
  /**
   * Sets the size of the input area `small, medium, large`
   */
  size: {
    type: String,
    default: "medium",
    validator: value => {
      return value.match(/(small|medium|large)/)
    },
  },
  /**
   * Whether the form input field is required or not.
   * `true, false`
   */
  required: {
    type: Boolean,
    default: false,
  },
  /**
   * Placeholder text to display
   */
  placeholder: {
    type: String,
    default: "",
  },
  /**
   * defaultDate offers a way to add data that may already exist for the field when `mode='single'`.
   * It takes the form of a Javascript Date object.
   * Example: `:defaultDate="new Date(2019, 05, 01)"`
   */
  defaultDate: {
    type: Date,
    default: null,
    required: false,
  },
  /**
   * defaultDates offer a way to add data that may already exist for the field when `mode='range'`.
   * It takes the form of an Object containing two properties (start and,
   * optionally, end date) with values that are Javascript date objects.
   * Example: `:defaultDates="{ start: new Date(2019, 05, 01), end: new Date(2019, 05, 02)}"`
   */
  defaultDates: {
    type: Object,
    default: null,
    required: false,
  },
  /**
   * Disable dates using the date object or date range format. This example makes the
   * month of June 2019 selectable, but nothing else: `[{ start: null, end: new Date(2019, 05, 01)}, { start: new Date(2019, 05, 30), end: null }]`
   * Note: In Javascript, months start at zero, which is why 05 = June.
   */
  disabledDates: {
    type: Array,
    default: null,
    required: false,
  },
  /**
   * Highlight PUL holidays using an array of strings in YYYY-MM-DD format. Example: ["2019-11-28","2019-11-29"]
   */
  holidays: {
    type: Array,
    default: null,
    required: false,
  },
  /**
   * The helper text a user should get.
   */
  helper: {
    type: String,
    default: "",
  },
})

const emit = defineEmits(["updateInput", "updateRangeInput"])

const date = ref(props.defaultDate)
const range = ref(props.defaultDates)
const attributes = ref([
  {
    bar: {
      color: "red",
      class: "lux-holiday-highlight",
    },
    dates: props.holidays,
    popover: {
      label: "Official PUL Holiday",
    },
  },
])

const formattedRange = computed({
  get() {
    return !range.value ? "" : `${formatStart()} - ${formatEnd()}`
  },
  set(newValue) {
    updateRangeInput(newValue)
  },
})

function calendarClosedSingle(value) {
  if (date.value && isValidFormat(date.value.toLocaleDateString("en-US"))) {
    let dateAsText = date.value.toLocaleDateString("en-US")
    emit("updateInput", dateAsText)
  }
}

function calendarClosedRange(value) {
  if (
    range.value &&
    isValidFormat(range.value.start.toLocaleDateString("en-US")) &&
    isValidFormat(range.value.end.toLocaleDateString("en-US"))
  ) {
    let rangeAsText = formatStart() + " - " + formatEnd()
    emit("updateRangeInput", rangeAsText)
  }
}

function formatEnd() {
  if (range.value.hasOwnProperty("end")) {
    return range.value.end.toLocaleDateString("en-US")
  }
}

function formatStart() {
  if (range.value.hasOwnProperty("start")) {
    return range.value.start.toLocaleDateString("en-US")
  }
}

function parseDate(value) {
  // expects value string in MM/DD/YYYY format
  if (value.includes("/")) {
    let d = value.split("/")
    return new Date(d[2] + "-" + d[0] + "-" + d[1])
  }
}
function updateInput(value) {
  if (isValidFormat(value)) {
    if (value.trim().length === 0) {
      date.value = null
    } else {
      date.value = parseDate(value)
    }
    emit("updateInput", value)
  }
}
function updateRangeInput(value) {
  if (stringSeemsLikeDateRange(value)) {
    let r = value.split(" - ")
    if (isValidFormat(r[0]) && isValidFormat(r[1])) {
      if (!range.value) {
        range.value = {}
      }
      range.value = {
        start: parseDate(r[0]),
        end: parseDate(r[1]),
      }
      range.value.end = parseDate(r[1])
      emit("updateRangeInput", value)
    }
  }
}

function isValidFormat(d) {
  if (d.trim().length === 0) {
    return true
  }
  let date_regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/
  return date_regex.test(d)
}

function stringSeemsLikeDateRange(possibleRange) {
  return possibleRange.includes(" - ") && !possibleRange.endsWith(" - ")
}
</script>

<style lang="scss">
@import "../assets/styles/spacing.scss";
@import "../assets/styles/variables.css";
.lux-date-picker {
  @include stack-space(var(--space-small));
}

.lux-input {
  display: flex;
  flex-wrap: wrap;
}

.lux-date-picker .lux-input label {
  display: inline-block;
  width: 100%;
}

.lux-holiday-highlight {
  color: var(--color-red);
}
</style>

<docs>
  ```jsx
    <div>
      <lux-date-picker id="dateRange" name="daterange" label="Date Range" helper="Please enter both start and end dates." mode="range" :disabled-dates="[{ start: null, end: new Date(2019, 05, 01)}, { start: new Date(), end: null }]"  placeholder="01/10/2020" />
  
      <lux-date-picker id="today" name="today" label="Today's Date" mode="single" :holidays="['2020-02-20','2020-02-21']" :defaultDate="new Date()" />
    </div>
  ```
</docs>
