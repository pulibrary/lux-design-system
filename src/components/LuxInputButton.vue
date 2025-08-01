<template>
  <button
    ref="inputButton"
    :type="!!type ? type : false"
    :class="['lux-button', variation, size, { 'lux-expanded': block == true }]"
    :disabled="disabled"
    @click="buttonClicked($event)"
  >
    <div v-if="variation === 'icon-prepend'" class="prepend-icon">
      <lux-icon-base width="18" height="18" :icon-name="icon">
        <component :is="iconComponent"></component>
      </lux-icon-base>
    </div>
    <!-- @slot The text of your button. -->
    <slot />
    <div v-if="variation === 'icon'" class="append-icon">
      <lux-icon-base width="18" height="18" :icon-name="icon">
        <component :is="iconComponent"></component>
      </lux-icon-base>
    </div>
  </button>
</template>

<script>
import LuxIconBase from "./icons/LuxIconBase.vue"

/**
 * Buttons are used to toggle something in the interface or trigger new
 * content in the same context.
 */
export default {
  name: "LuxInputButton",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  data: function () {
    return {
      label: "Submit",
    }
  },
  props: {
    /**
     * The button's variations `solid, outline, text, dropdown, icon`
     */
    variation: {
      type: String,
      default: "solid",
      validator: value => {
        return value.match(/(solid|outline|text|dropdown|icon|icon-prepend)/)
      },
    },
    /**
     * The button's type attribute `button, submit`
     */
    type: {
      type: String,
      default: "button",
      validator: value => {
        return value.match(/(|button|submit)/)
      },
    },
    /**
     * Sets the size of the button `small, medium, large`
     */
    size: {
      type: String,
      default: "medium",
      validator: value => {
        return value.match(/(small|medium|large)/)
      },
    },
    /**
     * Whether the button extends the full available width or not
     */
    block: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether the button is disabled or not
     * `true, false`
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether the button is focused or not
     * `true, false`
     */
    focused: {
      type: Boolean,
      default: false,
    },
    /**
     * Clicking this button can emit a custom event that should trigger an alert.
     * You must supply an alertStatus and alertMessage, like so:
     * { 'alertStatus': 'success', 'alertMessage': 'This is my message.'}
     */
    customAlertEvent: {
      type: Object,
      default: null,
    },
    /**
     * Visually hides the button text.
     */
    hideLabel: {
      type: Boolean,
      default: false,
    },
    /**
     * Indicates what icon to use. Values should be hyphenated and do not use the "lux-icon-" prefix.
     * For example, instead of `lux-icon-search`, simply use `search`.
     */
    icon: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconComponent() {
      return "lux-icon-" + this.icon
    },
  },
  emits: ["button-clicked", "system-alert"],
  methods: {
    buttonClicked(value) {
      if (this.customAlertEvent) {
        this.$emit("system-alert", {
          event: value,
          alertStatus: this.customAlertEvent.alertStatus,
          alertMessage: this.customAlertEvent.alertMessage,
        })
      }
      this.$emit("button-clicked", value)
    },
  },
  mounted() {
    let vm = this

    vm.$nextTick(function () {
      if (vm.focused) {
        this.$refs.inputButton.focus()
      }
    })
  },
  components: {
    LuxIconBase,
  },
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/system.scss" as *;
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/mixins.scss" as mi;
@use "/src/assets/styles/focus.scss" as *;

.lux-button {
  @include inset-space($space-small);
  font-family: var(--font-family-text);
  font-size: $font-size-base;
  line-height: $line-height-small;
  border: 0;
  border-radius: $border-radius-default;
  color: $color-rich-black;
  cursor: pointer;
  margin: 0.25rem;
  text-decoration: none;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:active {
    transform: scale(0.99);
  }

  &.icon,
  &.icon-prepend {
    padding: 4px;

    &.small {
      @include inset-space(7px);
      font-size: $font-size-small;
    }

    &.medium {
      @include inset-space(12px);
      font-size: $font-size-base;
    }

    &.large {
      @include inset-space(18px);
      font-size: $font-size-large;
    }
  }

  &.icon,
  &.icon-prepend {
    display: flex;
    align-items: center;
    @include princeton-focus(light);
  }

  &.solid {
    background: $color-bleu-de-france;
    color: $color-white;
    @include princeton-focus(light);
    &:hover,
    &:focus-visible {
      background: $color-bleu-de-france-darker;
    }
  }

  &.outline {
    background: transparent;
    color: $color-bleu-de-france;
    border: 0.125rem solid $color-bleu-de-france;
    &:hover,
    &:focus-visible {
      border-color: $color-bleu-de-france-darker;
      outline: var(--color-princeton-orange-on-white) solid (0.25rem-0.125rem);
    }
  }

  &.text {
    background-color: transparent;
    @include princeton-focus(light);
  }

  &.dropdown {
    @include mi.box-shadow-inputs;
    background: $color-white;
    border-radius: $border-radius-default;
    color: $color-rich-black;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%20000002%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
    padding-right: 36px;

    &:hover {
      @include mi.box-shadow-inputs-hover;
    }
  }
}

.small {
  @include inset-space(12px);
  font-size: $font-size-small;
}

.medium {
  @include inset-space($space-small);
  font-size: $font-size-base;
}

.large {
  @include inset-space(18px);
  font-size: $font-size-large;
}

.lux-expanded {
  display: block;
  width: 100%;
  max-width: 100%;
}

[disabled] {
  background: $color-grayscale-light;
  cursor: not-allowed;
  &:hover,
  &:focus {
    background: $color-grayscale-light;
  }
}
</style>

<docs>
  ```jsx
    <div>
      <!-- use :focused sparingly and only when necessary to set the focus; uncomment below to test in preview above -->
      <!-- <lux-input-button type="button" focused variation="icon" size="small" icon="search" hideLabel></lux-input-button> -->
      <lux-input-button type="button" variation="icon-prepend" size="small" icon="search" hideLabel>Search</lux-input-button>

      <lux-input-button variation="solid" size="small">Apply Changes</lux-input-button>
      <lux-input-button type="button" variation="solid">Apply Changes</lux-input-button>
      <lux-input-button type="button" variation="solid" size="large" disabled>Apply Changes</lux-input-button>

      <lux-input-button type="submit" variation="solid" block>Submit</lux-input-button>

      <lux-input-button type="button" variation="outline">Manage Files</lux-input-button>

      <lux-input-button type="button" variation="text">Manage Files</lux-input-button>
    </div>
  ```
</docs>
