<template>
  <transition name="fade">
    <div
      v-if="show"
      class="lux-alert"
      :class="{
        'lux-alert-dismissible': dismissible,
        'lux-alert-success': isSuccess,
        'lux-alert-warning': isWarning,
        'lux-alert-error': isError,
        'lux-alert-info': isInfo,
        'lux-alert-fullscreen': isFullScreen,
      }"
      role="alert"
    >
      <span>
        <!-- @slot the alert text -->
        <slot>{{ alertMessage }}</slot>
      </span>
      <button
        v-if="dismissible"
        type="button"
        class="lux-close"
        data-dismiss="alert"
        aria-label="Close"
        @click="hideAlert()"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </transition>
</template>

<script>
/**
 * Alerts are used to provide timely information to a user in response to some event.
 */
export default {
  name: "LuxAlert",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  metaInfo: {
    title: "Global alert message to user.",
    htmlAttrs: {
      lang: "en",
    },
  },
  data: function () {
    return {
      alertMessage: "Something happened, but we're not sure what.",
      show: true,
    }
  },
  computed: {
    isSuccess() {
      return this.status === "success" ? true : false
    },
    isInfo() {
      return this.status === "info" ? true : false
    },
    isWarning() {
      return this.status === "warning" ? true : false
    },
    isError() {
      return this.status === "error" ? true : false
    },
    isFullScreen() {
      return this.type === "alert" ? true : false
    },
  },
  props: {
    /**
     * The intent of the message. Valid options: `alert, indicator`. Alerts are full page and indicators are “inline”.
     */
    type: {
      type: String,
      default: "indicator",
      validator: value => {
        return value.match(/(alert|indicator)/)
      },
    },
    /**
     * Severity of the message. Valid options: `info, warning, success, error`
     */
    status: {
      type: String,
      default: "info",
      validator: value => {
        return value.match(/(info|warning|success|error)/)
      },
    },
    /**
     * Automatically hides the notification after 2 seconds.
     */
    autoclear: {
      type: Boolean,
      default: false,
    },
    /**
     * The number of seconds to wait before autoclearing the
     * notification.  This prop has no effect if autoclear
     * is not true.
     */
    autoclearSeconds: {
      type: Number,
      default: 2,
    },
    /**
     * User can manually hide the notification.  This emits a dismissed
     * event that you can bind to if needed (for example, if you want to
     * record that the user hid the notification in a database or localStorage)
     */
    dismissible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideAlert() {
      this.show = false

      /**
       * The user has dismissed (or hidden) the alert.
       */
      this.$emit("dismissed")
    },
  },
  mounted() {
    if (this.autoclear) {
      setTimeout(() => {
        this.show = false
      }, this.autoclearSeconds * 1000)
    }
  },
  emits: ["dismissed"],
}
</script>

<style lang="scss">
@use "/src/assets/styles/mixins.scss" as *;

.lux-alert-fullscreen {
  position: fixed !important;
  top: 2em;
  left: 50%; /* move the left edge to the center … */
  margin-left: -25vw !important; /* … and move it to the left half the box’ width. */
  z-index: 9999;
  width: 50vw;
}

.lux-alert {
  @include reset;
  font-family: var(--font-family-text);
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  position: relative;
}
.lux-alert-success {
  background-color: var(--color-light-pistachio-green);
  border-color: var(--color-pistachio-green);
  color: var(--color-forest-green);
}
.lux-alert-error {
  background-color: var(--color-light-pink);
  border-color: var(--color-dusty-pink);
  color: var(--color-brick-red);
}
.lux-alert-warning {
  background-color: var(--color-light-sand-yellow);
  border-color: var(--color-sand-yellow);
  color: var(--color-golden-brown);
}
.lux-alert-info {
  background-color: var(--color-light-blue);
  border-color: var(--color-sky-blue);
  color: var(--color-cerulean-blue);
}

.lux-alert-dismissible > span {
  width: calc(100% - 25px);
  display: inline-block;
}

.lux-alert-dismissible .lux-close {
  position: absolute;
  top: -4px;
  right: -5px;
  padding: 0.75rem 1.25rem;
  color: inherit;
}

button.lux-close {
  padding: 0;
  cursor: pointer;
  background: 0 0;
  border: 0;
  -webkit-appearance: none;
}

.lux-close {
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<docs>
  ```jsx
    <div>
      <lux-alert status="warning" autoclear>How to disappear completely...</lux-alert>
      <lux-alert status="error"></lux-alert>
      <lux-alert status="success">Like a boss!</lux-alert>
      <lux-alert status="info" dismissible>Here's some dismissible info for you.</lux-alert>
    </div>
  ```
</docs>
