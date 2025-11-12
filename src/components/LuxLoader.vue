<template>
  <component :is="wrapper" class="lux-overlay" :class="{ 'lux-fullscreen': fullscreen }">
    <div class="lux-loader" :size="size"></div>
  </component>
</template>

<script>
/**
 * Loaders indicate to the user that the component is waiting for some task to finish
 * before updating the view.
 */
export default {
  name: "LuxLoader",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  props: {
    /**
     * Sets the diameter of the circle. `x-small, small, medium, large, x-large`
     */
    size: {
      type: String,
      default: "medium",
      validator: value => {
        return value.match(/(x-small|small|medium|large|x-large)/)
      },
    },
    /**
     * Determines whether the loader fills the entire screen (with overlay) or the container it's in (no overlay).
     */
    fullscreen: {
      type: Boolean,
      default: false,
    },
    /**
     * The html element name used for the wrapper.
     * `div, section`
     */
    wrapper: {
      type: String,
      default: "div",
      validator: value => {
        return value.match(/(div|span)/)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/system.scss" as *;

// $border-color: var(--color-white);
.lux-loader {
  @include reset;
  @include stack-space($space-base);
  color: var(--color-rich-black);
  --border-color: var(--color-princeton-orange-on-white);
}

.lux-loader,
.lux-loader:after {
  border-radius: 50%;
}

.lux-loader {
  transform: translate(-50%, -50%);
  text-indent: -9999em;
  border-top: 1.1em solid color-mix(in srgb, var(--border-color) 20%, transparent);
  border-right: 1.1em solid color-mix(in srgb, var(--border-color) 20%, transparent);
  border-bottom: 1.1em solid color-mix(in srgb, var(--border-color) 20%, transparent);
  border-left: 1.1em solid var(--border-color);
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;

  &[size="x-small"] {
    border-width: 2px;
    height: 1rem;
    width: 1rem;
  }
  &[size="small"] {
    border-width: 3px;
    height: 1.5rem;
    width: 1.5rem;
  }
  &[size="medium"] {
    border-width: 7px;
    height: 5rem;
    width: 5rem;
  }
  &[size="large"] {
    border-width: 14px;
    height: 10rem;
    width: 10rem;
  }
  &[size="x-large"] {
    border-width: 18px;
    height: 20rem;
    width: 20rem;
  }
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.lux-overlay.lux-fullscreen {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  background: url(data:;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAAATSURBVBhXY2RgYNgHxGAAYuwDAA78AjwwRoQYAAAAAElFTkSuQmCC)
    repeat scroll transparent\9; /* ie fallback png background image */
  z-index: 9999;
  color: white;
  border-radius: 4px;

  // $border-color: var(--color-white);
  $border-color: $color-princeton-orange-on-white;
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
    <lux-loader size="medium"></lux-loader>
  </div>
  ```
</docs>
