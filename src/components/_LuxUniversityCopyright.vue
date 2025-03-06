<template>
  <component :is="type" :class="['lux-copyright', theme]">
    &copy; {{ new Date().getFullYear() }} The Trustees of Princeton University
  </component>
</template>

<script>
/**
 * Used to show the University’s copyright notice, including the current year
 * (“© 20xx The Trustees of Princeton University”) in the footer.
 */
export default {
  name: "LuxUniversityCopyright",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  props: {
    /**
     * The html element name used for the wrapper.
     */
    type: {
      type: String,
      default: "span",
    },
    theme: {
      type: String,
      default: "dark",
    },
  },
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/mixins.scss" as *;
@use "/src/assets/styles/variables.css" as *;

.lux-copyright {
  @include reset;
  @include stack-space(var(--space-xx-small));
  font-family: var(--font-family-heading);
  font-size: var(--font-size-base);
  line-height: var(--line-height-heading);

  &.dark {
    color: var(--color-white);
    background: var(--color-gray-100);
  }
  &.shade {
    color: var(--color-white);
    background: var(--color-grayscale-darker);
  }
  &.light {
    color: var(--color-rich-black);
    background: var(--color-white);
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-university-copyright theme="light" type="span"></lux-university-copyright>
  </div>
  ```
</docs>
