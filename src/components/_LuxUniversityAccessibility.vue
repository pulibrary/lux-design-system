<template>
  <component :is="type" class="lux-accessibility" :class="theme">
    <a href="https://accessibility.princeton.edu/help">Digital Accessibility</a>
  </component>
</template>

<script>
/**
 * Used to show the University’s Accessibility site in the footer.
 */
export default {
  name: "UniversityAccessibility",
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

.lux-accessibility {
  @include reset;
  @include stack-space(var(--space-base));
  font-family: var(--font-family-heading);
  font-size: var(--font-size-x-small);
  line-height: var(--line-height-heading);

  a {
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  &.dark {
    a {
      color: var(--color-white);
    }
  }

  &.shade {
    a {
      color: var(--color-rich-black);
    }
  }

  &.light {
    a {
      color: var(--color-rich-black);
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-university-accessibility type="span"></lux-university-accessibility>
  </div>
  ```
</docs>
