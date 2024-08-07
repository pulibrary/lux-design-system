<template>
  <component
    :is="type"
    :class="['lux-wrapper', { 'lux-full-width': fullWidth }, horizontal]"
    :style="{ 'max-width': maxWidth + 'px' }"
  >
    <slot />
  </component>
</template>

<script>
/**
 * Used to build the outer wrapper of a page, including the page title and
 * associated actions. Wrapper can be span the full width of the viewport or limited to a max-width of 1440px.
 */
export default {
  name: "LuxWrapper",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  props: {
    /**
     * The html element name used for the wrapper.
     */
    type: {
      type: String,
      default: "div",
    },
    /**
     * The maximum width of the wrapper. Default is set to 1440.
     */
    maxWidth: {
      type: [String, Number],
      default: 1440,
    },
    /**
     * Determines whether the wrapper takes up 100% of the parent container.
     */
    fullWidth: {
      type: [String, Boolean],
      default: false,
    },
    /**
     * Determines how the flexbox wrapper is horizontally aligned. This value defaults to
     * having space between grid items. Options include `start`, `center`, and `end`.
     */
    horizontal: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="scss" scoped>
.lux-wrapper {
  margin: auto;

  &.lux-full-width {
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
}
</style>

<docs>
  ```jsx
    <div>
      <lux-wrapper>Wrapper can be used to wrap any components together.</lux-wrapper>
      <lux-wrapper :max-width="1400">Wrapper can be used to wrap any components together.</lux-wrapper>
    </div>
  ```
</docs>
