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

fieldset {
  border: 0;
  padding: 0;
}

.lux-input {
  @include stack-space(var(--space-small));

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
  @include reset;
  @include stack-space(var(--space-x-small));
  font-family: var(--font-family-text);
  line-height: var(--line-height-base);
}

.lux-checkbox input[type="checkbox"] {
  @include visually-hidden;
  &:focus {
    box-shadow: inset 0 1px 0 0 rgba($color-rich-black, 0.07),
      0 0 0 1px tint($color-rich-black, 80%);
  }
}

.lux-checkbox label {
  position: relative;
  display: inline-block;
  margin-bottom: var(--space-xx-small);
  cursor: pointer;
  padding-left: var(--space-base);
}

.lux-checkbox label::before,
.lux-checkbox label::after {
  position: absolute;
  content: "";

  /*Needed for the line-height to take effect*/
  display: inline-block;
}

/*Outer box of the fake checkbox*/
.lux-checkbox label::before {
  height: 16px;
  width: 16px;
  background-color: var(--color-white);
  border: 0;
  border-radius: var(--border-radius-default);
  box-shadow: inset 0 1px 0 0 rgba($color-rich-black, 0.07), 0 0 0 1px tint($color-rich-black, 80%);
  left: 0;
  top: 4px;
}

/* On mouse-over, add a grey background color */
.lux-checkbox :not([disabled]) + label:hover::before {
  box-shadow: 0 1px 5px 0 rgba($color-rich-black, 0.07), 0 0 0 1px tint($color-rich-black, 60%);
}

.lux-checkbox input:checked + label::before {
  transition: box-shadow 0.2s ease;
  background-color: var(--color-bleu-de-france);
  box-shadow: inset 0 0 0 1px var(--color-bleu-de-france), 0 0 0 1px var(--color-bleu-de-france);
  outline: 0;
}

/*Checkmark of the fake checkbox*/
.lux-checkbox label::after {
  height: 5px;
  width: 10px;
  border-left: 2px solid var(--color-white);
  border-bottom: 2px solid var(--color-white);

  transform: rotate(-45deg);

  left: 3px;
  top: 7px;
}

/*Hide the checkmark by default*/
.lux-checkbox input[type="checkbox"] + label::after {
  content: none;
}

/*Unhide on the checked state*/
.lux-checkbox input[type="checkbox"]:checked + label::after {
  content: "";
}

/*Adding focus styles on the outer-box of the fake checkbox*/
.lux-checkbox input[type="checkbox"]:focus + label::before {
  transition: box-shadow var(--duration-quickly) ease;
  box-shadow: inset 0 0 0 1px var(--color-bleu-de-france), 0 0 0 1px var(--color-bleu-de-france);
}

.lux-inline {
  display: inline-block;
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
