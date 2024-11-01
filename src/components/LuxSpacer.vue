<template>
  <component :is="type" class="lux-spacer">
    <!-- @slot Optional: some content that should be spaced. -->
    <slot />
  </component>
</template>

<script>
/**
 * Used to fill available space or make space between two components.
 */
export default {
  name: "LuxSpacer",
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
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/mixins.scss";
.lux-spacer {
  @include reset;
  flex-grow: 1 !important;
}
</style>

<docs>
```jsx
    <div>
        <lux-spacer></lux-spacer>
    </div>
```
</docs>
