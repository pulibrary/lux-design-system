<template>
  <component :is="wrapper" class="lux-input">
    <legend v-if="groupLabel">{{ groupLabel }}</legend>
    <div
      v-for="option in options"
      :class="['lux-checkbox', { 'lux-inline': !vertical }]"
      :key="option.id"
    >
      <input
        type="checkbox"
        :id="option.id"
        :name="label"
        :value="option.value"
        :checked="option.checked"
        :disabled="option.disabled"
        :required="option.required"
        @change="change($event)"
        @blur="inputblur($event.target)"
      />
      <label v-if="option.label" :for="option.id">{{ option.label }}</label>
      <label v-else :for="option.id">{{ option.value }}</label>
    </div>
    <div role="alert" class="lux-error" v-if="errormessage">{{ errormessage }}</div>
  </component>
</template>

<script>
/**
 * Form Inputs are used to allow users to provide text input when the expected
 * input is short. Form Input has a range of options and supports several text
 * formats including numbers. For longer input, use the `FormTextarea` element.
 */
export default {
  name: "LuxInputCheckbox",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  model: {
    prop: "checked",
    event: "change",
  },
  emits: ["change", "inputblur"],
  data: function () {
    return {
      wrapper: this.groupLabel.length ? "fieldset" : "div",
    }
  },
  props: {
    /**
     * If true, the checkboxes will be stacked vertically. Otherwise they will be horizontal (inline).
     */
    vertical: {
      type: Boolean,
      default: false,
    },
    /**
     * The available options to check. Option properties are: id, value, disabled, required, checked
     */
    options: {
      required: true,
      type: Array,
    },
    /**
     * The label of the form input field.
     */
    label: {
      type: String,
      default: "",
    },
    /**
     * The validation message a user should get.
     */
    errormessage: {
      type: String,
      default: "",
    },
    /**
     * The html element name used for the wrapper.
     * `div, section`
     */
    groupLabel: {
      type: String,
      default: "",
    },
    /**
     * Whether the form input field is disabled or not.
     * `true, false`
     */
    disabled: {
      type: Boolean,
      default: false,
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
     * Manually trigger input field’s hover state.
     * `true, false`
     */
    hover: {
      type: Boolean,
      default: false,
    },
    /**
     * Manually trigger input field’s focus state.
     * `true, false`
     */
    focus: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    change(event) {
      this.$emit("change", event.target.checked)
    },
    inputblur(value) {
      this.$emit("inputblur", value)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/spacing.scss";
@import "../assets/styles/mixins.scss";
@import "../assets/styles/variables.css";
@import "../assets/styles/system.scss";
@import "../assets/styles/focus.scss";

fieldset {
  border: 0;
  padding: 0;
}

.lux-input {
  font-weight: var(--font-weight-regular);
  font-family: var(--font-family-text);
  font-size: var(--font-size-base);

  legend {
    margin-bottom: var(--space-x-small);
  }

  label {
    padding-right: var(--space-base);
  }
}

.lux-checkbox {
  font-family: var(--font-family-text);
  line-height: var(--line-height-base);
  display: flex;
}

.lux-checkbox label {
  cursor: pointer;
  margin-left: var(--space-xx-small);
}

label {
  display: inline-block;
  margin-top: calc(var(--font-size-base) * 0.175);
  margin-bottom: calc(var(--font-size-base) * 0.175);
}

input[type="checkbox"] {
  width: calc(var(--font-size-base) * 1.35);
  height: calc(var(--font-size-base) * 1.35);
  outline: 0px;
}

input[type="checkbox"]:focus-visible {
  @include princeton-focus(dark);
}

.lux-error {
  color: var(--color-red);
}

[disabled] + label {
  cursor: not-allowed;
  color: var(--color-grayscale);
}
</style>

<docs>
  ```jsx
  <div>
    <lux-input-checkbox groupLabel="Where is my mind?" :options="[{name: 'opt 1', value: 'In the clouds', id: 'checkbox-opt1', required: true}, {name: 'opt 2', value: 'I don\'t know', id: 'checkbox-opt2', disabled: true}]"></lux-input-checkbox>
  </div>
  ```
</docs>
