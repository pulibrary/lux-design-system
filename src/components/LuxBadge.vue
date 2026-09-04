<template>
  <span :class="badgeClass"><slot></slot></span>
</template>
<script setup>
import { computed, defineOptions } from "vue"

/**
 * Badge is a basic informational component with various color options.
 */
defineOptions({
  name: "LuxBadge",
  status: "ready",
  release: "6.8.0",
  type: "Element",
})

const props = defineProps({
  /**
   * Sets the color for the badge.
   */
  color: {
    type: String,
    default: "green",
  },
})

// Calculates the class to apply correct colors
const badgeClass = computed(() => `lux-badge lux-badge-${props.color}`)
</script>
<style>
.lux-badge {
  height: 23px;
  font-size: 0.625rem;
  padding: 0px var(--space-x-small);
  letter-spacing: 0.32px;
  margin: 0.25rem 0.25rem 0.25rem 0;
  border-radius: 24px;
  display: flex;
  align-items: center;
  width: fit-content;
  font-family: var(--font-family-text);
}

.lux-badge-blue {
  background: var(--color-light-blue);
  color: var(--color-very-dark-blue);
}

.lux-badge-green {
  background: var(--color-pistachio-green);
  color: var(--color-dark-green);
}

.lux-badge-purple {
  background: var(--color-light-purple);
  color: var(--color-dark-purple);
}

.lux-badge-red {
  background: var(--color-light-pink);
  color: var(--color-brick-red);
}

.lux-badge-gray {
  background: var(--color-gray-20);
  color: black;
}

.lux-badge-yellow {
  background: var(--color-yellow);
  color: var(--color-dark-yellow);
}
</style>
