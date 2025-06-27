<template>
  <span :class="badgeClass"><slot></slot></span>
</template>
<script>
/**
 * Badge is a basic informational component with various color options.
 */
export default {
  name: "LuxBadge",
  status: "ready",
  release: "6.8.0",
  type: "Element",
  props: {
    /**
     * Sets the color for the badge.
     */
    color: {
      type: String,
      default: "green",
    },
  },
  // Calculates the class to apply correct colors
  computed: {
    badgeClass() {
      return `lux-badge lux-badge-${this.color}`
    },
  },
}
</script>
<style>
.lux-badge {
  height: 23px;
  font-size: 0.625rem;
  padding: 0px 8px;
  letter-spacing: 0.32px;
  margin: 0.25rem 0.25rem 0.25rem 0;
  border-radius: 24px;
  display: flex;
  align-items: center;
  width: fit-content;
}

.lux-badge-blue {
  background: var(--color-light-blue);
  color: var(--color-very-dark-blue);
}

.lux-badge-green {
  background: var(--color-pistachio-green);
  color: var(--color-dark-green);
}

.lux-badge-red {
  background: var(--color-light-pink);
  color: var(--color-brick-red);
}

.lux-badge-gray {
  background: var(--color-gray-10);
  color: var(--color-gray-90);
}

.lux-badge-yellow {
  background: var(--color-yellow);
  color: var(--color-dark-yellow);
}
</style>
<docs>
  ```jsx
    <div>
      <lux-badge>A Green Badge</lux-badge>
      <lux-badge color="yellow">A Yellow Badge</lux-badge>
      <lux-badge color="blue">A Blue Badge</lux-badge>
      <lux-badge color="gray">A Gray Badge</lux-badge>
      <lux-badge color="red">A Red Badge</lux-badge>
    </div>
  ```
</docs>
