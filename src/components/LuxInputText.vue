<template>
  <component :is="wrapper" class="lux-input" :class="{ 'lux-has-icon': icon }">
    <label v-if="label" :for="id" :class="{ 'lux-hidden': hideLabel }">{{ label }}</label>
    <div
      class="lux-input-field"
      :class="[{ 'lux-input-expand': width === 'expand' }, { disabled: disabled }, size]"
    >
      <input
        v-if="type !== 'textarea'"
        autocomplete="off"
        ref="textInput"
        :name="name"
        :value="value"
        :id="id"
        :readonly="readonly"
        :disabled="disabled"
        :required="required"
        :type="type"
        :maxlength="maxlength"
        :hover="hover"
        :placeholder="placeholder"
        :errormessage="errormessage"
        :class="['lux-input', { 'lux-input-error': hasError }]"
        @input="event => inputFired(event)"
        @change="(...args) => $emit('change', ...args)"
        @keyup="(...args) => $emit('keyup', ...args)"
        @blur="(...args) => $emit('blur', ...args)"
        @focus="event => focusFired(event)"
      />

      <textarea
        v-else
        autocomplete="off"
        ref="textArea"
        :name="name"
        :id="id"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :rows="rows"
        :maxlength="maxlength"
        :hover="hover"
        :value="value"
        :placeholder="placeholder"
        :errormessage="errormessage"
        :class="[
          'lux-input',
          { 'lux-input-error': hasError },
          { 'lux-input-expand': width === 'expand' },
        ]"
        @input="inputvaluechange($event.target.value)"
        @blur="inputblur($event)"
        @focus="inputfocus($event)"
      />

      <div v-if="icon" class="append-icon">
        <lux-icon-base width="24" height="24">
          <lux-icon-alert v-if="icon === 'alert'"></lux-icon-alert>
          <lux-icon-approved v-if="icon === 'approved'"></lux-icon-approved>
          <lux-icon-denied v-if="icon === 'denied'"></lux-icon-denied>
        </lux-icon-base>
      </div>
    </div>

    <div role="alert" class="lux-error" v-if="errormessage">{{ errormessage }}</div>
    <div class="lux-helper" v-if="helper">{{ helper }}</div>
  </component>
</template>

<script>
import LuxIconAlert from "./icons/LuxIconAlert.vue"
import LuxIconApproved from "./icons/LuxIconApproved.vue"
import LuxIconBase from "./icons/LuxIconBase.vue"
import LuxIconDenied from "./icons/LuxIconDenied.vue"

/**
 * Form Inputs are used to allow users to provide text input when the expected
 * input is short. Form Input has a range of options and supports several text
 * formats including numbers. For longer input, use the `FormTextarea` element.
 */
export default {
  name: "LuxInputText",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  emits: [
    "inputvaluechange",
    "inputblur",
    "inputfocus",
    "update:value",
    "input",
    "keyup",
    "change",
    "blur",
    "focus",
  ],
  computed: {
    hasError() {
      return this.errormessage.length
    },
  },
  props: {
    /**
     * The type of the form input field.
     * `text, number, email`
     */
    type: {
      type: String,
      default: "text",
      validator: value => {
        return value.match(/(text|number|email|textarea)/)
      },
    },
    /**
     * Text value of the form input field.
     */
    value: {
      type: [String, Number],
      default: "",
    },
    /**
     * The placeholder value for the form input field.
     */
    placeholder: {
      type: String,
      default: "",
    },
    /**
     * The label of the form input field.
     */
    label: {
      type: String,
      default: "",
    },
    /**
     * Visually hides the label of the form input field.
     */
    hideLabel: {
      type: Boolean,
      default: false,
    },
    /**
     * The validation message a user should get.
     */
    errormessage: {
      type: String,
      default: "",
    },
    /**
     * The helper text a user should get.
     */
    helper: {
      type: String,
      default: "",
    },
    /**
     * The html element name used for the wrapper.
     * `div, section`
     */
    wrapper: {
      type: String,
      default: "div",
      validator: value => {
        return value.match(/(div|section)/)
      },
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
     * The number of visible text lines for textarea.
     */
    rows: {
      type: String,
      default: "5",
    },
    /**
     * The maximum number of characters that the user can enter in textarea.
     */
    maxlength: {
      type: Number,
      default: 256,
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
     * Whether the form input field is readonly or not.
     * `true, false`
     */
    readonly: {
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
    focused: {
      type: Boolean,
      default: false,
    },
    /**
     * Appends icon inside container. Option:
     * `alert`, `approved`, `denied`
     */
    icon: {
      type: String,
      default: "",
    },
  },
  methods: {
    inputFired(event) {
      this.$emit("input", event)
      this.inputvaluechange(event.target.value)
    },
    inputvaluechange(value) {
      this.$emit("update:value", value)
    },
    inputblur(value) {
      this.$emit("inputblur", value)
    },
    focusFired(event) {
      this.$emit("focus", event)
      this.inputfocus(event.target.value)
    },
    inputfocus(value) {
      this.$emit("inputfocus", value)
    },
  },
  mounted: function () {
    let vm = this

    vm.$nextTick(function () {
      if (vm.focused) {
        if (vm.type == "text") {
          this.$refs.textInput.focus()
        }
        if (vm.type == "textarea") {
          this.$refs.textArea.focus()
        }
      }
    })
  },
  components: {
    LuxIconAlert,
    LuxIconApproved,
    LuxIconDenied,
    LuxIconBase,
  },
}
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/styles/variables.css" as *;
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/mixins.scss" as mi;
@use "/src/assets/styles/system.scss" as *;
@use "/src/assets/styles/focus.scss" as *;

// Design Tokens with local scope
$color-placeholder: tint(rgb(149, 156, 167), 50%);

.lux-input {
  @include stack-space(var(--space-small));
  font-weight: var(--font-weight-regular);
  font-family: var(--font-family-text);
  font-size: var(--font-size-base);
  line-height: var(--line-height-heading);
  width: auto;

  label {
    display: block;
    font-size: var(--font-size-base);
    color: tint($color-rich-black, 20%);
    @include stack-space(var(--space-x-small));

    &.lux-hidden {
      @include visually-hidden;
    }
  }

  .lux-error {
    margin-top: var(--space-x-small);
    font-size: var(--font-size-small);
    color: var(--color-red);
  }
  .lux-input-error {
    border: 1px solid var(--color-red);
  }

  .lux-helper {
    margin-top: var(--space-x-small);
    font-size: var(--font-size-small);
    color: var(--color-grayscale-dark);
  }

  .lux-input-field {
    @include reset;
    @include mi.box-shadow-inputs;
    background: var(--color-white);
    border-radius: var(--border-radius-default);
    display: flex;
    width: auto;
    &.lux-input-expand {
      width: 100%;
    }

    input,
    textarea {
      @include reset;
      @include inset-squish-space(16px);
      transition: all 0.2s ease;
      -webkit-appearance: none;
      appearance: none;
      font-family: var(--font-family-text);
      background: var(--color-white);
      border-radius: var(--border-radius-default);
      color: set-text-color($color-rich-black, $color-white);
      margin: 0;
      border: 0;
      width: 100%;

      &::-webkit-input-placeholder {
        -webkit-font-smoothing: antialiased;
        color: $color-placeholder;
      }
      &:-ms-input-placeholder {
        color: $color-placeholder;
      }
      &::-moz-placeholder {
        color: $color-placeholder;
        -moz-osx-font-smoothing: grayscale;
        opacity: 1;
      }
      @include princeton-focus(light);
      &:focus,
      &:hover {
        text-decoration: none;
      }
    }

    textarea {
      resize: none;
    }

    &:hover,
    &[hover] {
      @include mi.box-shadow-inputs-hover;
    }
    &:focus,
    &[focus] {
      transition: box-shadow 0.2s ease;
      box-shadow: inset 0 0 0 1px $color-bleu-de-france, 0 0 0 1px $color-bleu-de-france;
      outline: 0;
    }
    &[disabled],
    &.disabled {
      box-shadow: inset 0 1px 0 0 color-mix(in srgb, var(--color-rich-black) 7%, transparent),
        0 0 0 1px tint($color-rich-black, 80%);
      background: color.adjust($color-placeholder, $lightness: 42%);
      cursor: not-allowed;
      opacity: 0.5;

      input,
      textarea {
        cursor: not-allowed;
      }
    }
  }

  .small input,
  .small textarea {
    @include inset-space(12px);
    font-size: var(--font-size-small);
  }

  .medium input,
  .medium textarea {
    @include inset-space($space-small);
    font-size: var(--font-size-base);
  }

  .large input,
  .large textarea {
    @include inset-space(18px);
    font-size: var(--font-size-large);
  }

  .lux-error {
    margin-top: var(--space-x-small);
    font-size: var(--font-size-small);
    color: var(--color-red);
  }
  .lux-input-error {
    border: 1px solid var(--color-red);
  }
  .lux-helper {
    margin-top: var(--space-x-small);
    font-size: var(--font-size-small);
    color: var(--color-grayscale-dark);
    width: 100%;
  }
}

.lux-has-icon {
  input {
    flex: 1;
  }

  .append-icon {
    padding: var(--space-xx-small);
    background-color: var(--color-white);
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-input-text id="foo" name="value" label="Input" :hide-label="true" placeholder="Write your text" helper="This is helper text to help the user fill out this field" size="large" required></lux-input-text>
    <lux-input-text id="foo" name="value" label="Input" :hide-label="true" placeholder="Write your text" helper="This is helper text to help the user fill out this field"></lux-input-text>
    <lux-input-text id="foo" name="value" label="Input" :hide-label="true" placeholder="Write your text" helper="This is helper text to help the user fill out this field" size="small"></lux-input-text>

    <lux-input-text id="bar" name="value" label=":hover" hover placeholder="Write your text"></lux-input-text>
    <!-- use :focused sparingly and only when necessary to set the focus; uncomment below to test in preview above  -->
    <!--<lux-input-text id="fee" name="value" label=":focused" focused placeholder="Write your text"></lux-input-text>-->
    <lux-input-text id="foe" name="value" label="[disabled]" disabled placeholder="Disabled input"></lux-input-text>
    <lux-input-text id="foe" name="value" label="Textarea" type="textarea"></lux-input-text>

    <!-- with icons -->
    <lux-input-text id="foo" name="value" label="Icon" placeholder="Write your text" icon="alert"></lux-input-text>
  </div>
  ```
</docs>
