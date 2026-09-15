<template>
  <component :is="props.type" class="lux-copyright">
    &copy; {{ new Date().getFullYear() }} The Trustees of Princeton University
  </component>
</template>

<script setup>
import { defineOptions } from "vue"

/**
 * Used to show the University’s copyright notice, including the current year
 * (“© 20xx The Trustees of Princeton University”) in the footer.
 */
defineOptions({
  name: "LuxUniversityCopyrightOld",
  status: "ready",
  release: "5.2.0",
  type: "Element",
})

const props = defineProps({
  /**
   * The html element name used for the wrapper.
   */
  type: {
    type: String,
    default: "span",
  },
})
</script>

<style lang="css" scoped>
.lux-copyright {
  margin-block-end: var(--space-xx-small);
  font-family: var(--font-family-heading);
  font-size: var(--font-size-x-small);
  line-height: var(--line-height-heading);
  color: var(--color-rich-black);
}
</style>

<docs>
  ```jsx
  <div>
    <lux-university-copyright-old type="span"></lux-university-copyright-old>
  </div>
  ```
</docs>
