<template>
  <component :is="props.type" class="lux-card-content">
    <!-- @slot The supplementary conent in your card -->
    <slot></slot>
  </component>
</template>

<script setup>
import { defineOptions } from "vue"

/**
 * Used to establish a section of a card for supplementary content.
 */
defineOptions({
  name: "LuxCardContent",
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
.lux-card-content {
  padding: 0 var(--space-small) var(--space-small);

  @media (min-width: 900px) {
    padding: var(--space-base);
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-card-content>
      <lux-text-style type="span" variation="small">
        <lux-icon-base width="18" height="18">
          <lux-icon-approved></lux-icon-approved>
        </lux-icon-base>
      Approved</lux-text-style>
    </lux-card-content>
  </div>
  ```
</docs>
