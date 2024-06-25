<template>
  <component :is="type" class="lux-copyright">
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
@import "../assets/styles/spacing.scss";
@import "../assets/styles/mixins.scss";
@import "../assets/styles/variables.css";
@import "../assets/styles/system.scss";

.lux-copyright {
  @include reset;
  @include stack-space(var(--space-xx-small));
  font-family: var(--font-family-heading);
  font-size: var(--font-size-x-small);
  line-height: var(--line-height-heading);
  color: var(--color-rich-black);
}
</style>

<docs>
  ```jsx
  <div>
    <lux-university-copyright type="span"></lux-university-copyright>
  </div>
  ```
</docs>
