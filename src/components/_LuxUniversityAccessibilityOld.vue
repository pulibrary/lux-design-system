<template>
  <component :is="type" class="lux-accessibility">
    <a href="https://accessibility.princeton.edu/help">Accessibility</a>
  </component>
</template>

<script>
/**
 * Used to show the University’s Accessibility site in the footer.
 */
export default {
  name: "LuxUniversityAccessibilityOld",
  status: "ready",
  release: "5.2.0",
  type: "Element",
  props: {
    /**
     * The html element name used for the wrapper.
     */
    type: {
      type: String,
      default: "span",
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/spacing.scss";
@import "../assets/styles/mixins.scss";
@import "../assets/styles/variables.css";
@import "../assets/styles/system.scss";

.lux-accessibility {
  @include reset;
  @include stack-space(var(--space-base));
  font-family: var(--font-family-heading);
  font-size: var(--font-size-x-small);
  line-height: var(--line-height-heading);
  color: var(--color-rich-black);

  a {
    color: var(--color-rich-black);
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-university-accessibility-old type="span"></lux-university-accessibility-old>
  </div>
  ```
</docs>
