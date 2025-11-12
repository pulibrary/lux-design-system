<template>
  <component :is="wrapper" class="lux-input">
    <legend v-if="groupLabel">{{ groupLabel }}</legend>
    <div
      v-for="option in options"
      class="lux-radio"
      :class="{ 'lux-inline': !vertical }"
      :key="option.id"
    >
      <input
        type="radio"
        :id="option.id"
        :name="option.name"
        :value="option.value"
        :checked="option.checked"
        :disabled="option.disabled"
        :required="option.required"
        @change="change($event.target.value)"
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
 * Radio buttons should only be used when a user can select one option.
 * For multiple selections, use checkboxes.
 */
export default {
  name: "LuxInputRadio",
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
     * If true, the radio buttons will be stacked vertically. Otherwise they will be horizontal (inline).
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
    groupLabel: {
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
     * Unique identifier of the form input field.
     */
    id: {
      type: String,
      default: "",
      required: true,
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
    change(value) {
      this.$emit("change", value)
    },
    inputblur(value) {
      this.$emit("inputblur", value)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/mixins.scss" as *;
@use "/src/assets/styles/focus.scss" as *;

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

.lux-radio {
  font-family: var(--font-family-text);
  line-height: var(--line-height-base);
  display: flex;
}

.lux-radio label {
  cursor: pointer;
  padding-left: var(--space-xx-small);
  margin-top: calc(var(--font-size-base) * 0.175);
  margin-bottom: calc(var(--font-size-base) * 0.175);
}

.lux-inline {
  display: inline-block;
}

[disabled] + label {
  cursor: not-allowed;
  color: var(--color-grayscale);
}

input[type="radio"] {
  width: calc(var(--font-size-base) * 1.35);
  height: calc(var(--font-size-base) * 1.35);
}

input[type="radio"]:focus-visible {
  @include princeton-focus(dark);
}
</style>

<docs>
  ```jsx
  <div>
    <lux-input-radio
      id="foo"
      vertical groupLabel="Where is my mind?"
      :options="[
        {name: 'radio-group-name', value: 'In the clouds', id: 'radio-opt1', required: true},
        {name: 'radio-group-name', value: 'I don\'t know', id: 'radio-opt2', disabled: true}
      ]">
    </lux-input-radio>
  </div>
  ```
</docs>
