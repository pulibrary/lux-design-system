<template>
  <component :is="type" :class="['lux-privacy-notice', theme]">
    <LuxHyperlink href="https://www.princeton.edu/privacy-notice" :newTab="true"
      >Princeton University Privacy Notice</LuxHyperlink
    >
  </component>
</template>

<script>
import LuxHyperlink from "./LuxHyperlink.vue"

/**
 * Used to show the University’s Privacy Notice site in the footer.
 */
export default {
  name: "LuxUniversityPrivacyNotice",
  status: "ready",
  release: "5.5.1",
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
@use "/src/assets/styles/focus.scss" as *;

.lux-privacy-notice {
  @include reset;
  @include stack-space(var(--space-base));
  font-family: var(--font-family-heading);
  font-size: var(--font-size-base);
  line-height: var(--line-height-heading);

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
    <lux-university-privacy-notice theme="light" type="span"></lux-university-privacy-notice>
  </div>
  ```
</docs>
