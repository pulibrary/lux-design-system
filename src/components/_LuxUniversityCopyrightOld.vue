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
  name: "LuxUniversityCopyrightOld",
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
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/mixins.scss" as *;
@use "/src/assets/styles/variables.css" as *;

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
    <lux-university-copyright-old type="span"></lux-university-copyright-old>
  </div>
  ```
</docs>
