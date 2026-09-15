<template>
  <component :is="props.type" :class="['lux-flex-container', props.horizontal]">
    <!-- @slot The grid items that live in your grid container. -->
    <slot />
  </component>
</template>

<script setup>
import { defineOptions } from "vue"
/**
 * Used to build the container of GridItems.
 */
defineOptions({
  name: "LuxGridContainer",
  status: "ready",
  release: "1.0.0",
  type: "Element",
})

const props = defineProps({
  /**
   * The html element name used for the grid container.
   */
  type: {
    type: String,
    default: "div",
  },
  /**
   * Determines how the flexbox container is horizontally aligned. This value defaults to
   * having space between grid items. Options include `start`, `center`, and `end`.
   */
  horizontal: {
    type: String,
    default: "",
  },
})
</script>

<style scoped>
.lux-flex-container {
  padding: 0 1rem 1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  &.start {
    justify-content: flex-start;
  }

  &.center {
    justify-content: center;
  }

  &.end {
    justify-content: flex-end;
  }
}
</style>

<docs>
  ```jsx
    <div>
      <lux-grid-container>Grid container can be used to contain grid items together.</lux-grid-container>
    </div>
  ```
</docs>
