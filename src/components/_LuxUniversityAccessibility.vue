<template>
  <component :is="type" :class="['lux-accessibility', theme]">
    <LuxHyperlink href="https://accessibility.princeton.edu/help" :newTab="true"
      >Accessibility Help</LuxHyperlink
    >
  </component>
</template>

<script>
import LuxHyperlink from "./LuxHyperlink.vue"

/**
 * Used to show the University’s Accessibility site in the footer.
 */
export default {
  name: "LuxUniversityAccessibility",
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
  components: {
    LuxHyperlink,
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
  font-size: var(--font-size-small);
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
      background: var(--color-gray-100);
    }
  }

  &.shade {
    a {
      color: var(--color-white);
      background: var(--color-grayscale-darker);
    }
  }

  &.light {
    a {
      color: var(--color-rich-black);
      background: var(--color-white);
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-university-accessibility theme="light" type="span"></lux-university-accessibility>
  </div>
  ```
</docs>
