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
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/mixins.scss" as *;
@use "/src/assets/styles/variables.css" as *;
@use "/src/assets/styles/focus.scss" as *;

.lux-accessibility {
  @include reset;
  @include stack-space(var(--space-base));
  font-family: var(--font-family-heading);
  font-size: var(--font-size-base);
  line-height: var(--line-height-heading);

  @media (min-width: 900px) {
    padding-left: 8px;
  }

  :deep(.lux-link) {
    box-shadow: none;
  }

  a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  &.dark {
    a {
      color: var(--color-white);
      background: var(--color-gray-100);
      @include princeton-focus(dark);
    }
  }

  &.shade {
    a {
      color: var(--color-white);
      background: var(--color-grayscale-darker);
      @include princeton-focus(shade);
    }
  }

  &.light {
    a {
      color: var(--color-rich-black);
      background: var(--color-white);
      @include princeton-focus(light);
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
