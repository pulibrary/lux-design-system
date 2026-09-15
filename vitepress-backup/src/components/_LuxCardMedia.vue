<template>
  <component :is="props.type" class="lux-card-media">
    <!-- @slot the media content or icon you'd like to include in your card -->
    <slot></slot>
  </component>
</template>

<script setup>
import { defineOptions } from "vue"

/**
 * Used to establish a section of a card for rich media content and icons.
 */
defineOptions({
  name: "LuxCardMedia",
  status: "ready",
  release: "1.0.0",
  type: "Element",
})

const props = defineProps({
  /**
   * The html element name used for the wrapper.
   */
  type: {
    type: String,
    default: "div",
  },
})
</script>

<style scoped>
:slotted(.lux-card-media .lux-icon) {
  padding: var(--space-small);

  @media (min-width: 900px) {
    padding: var(--space-base);
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-card-media>
      <lux-icon-base width="50" height="50">
        <lux-icon-globe></lux-icon-globe>
      </lux-icon-base>
    </lux-card-media>
  </div>
  ```
</docs>
