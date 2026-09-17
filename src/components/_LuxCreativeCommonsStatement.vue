<template>
  <component :is="props.type" :class="['lux-creative-commons-statement', props.theme]">
    Metadata on this site is licensed under
    <LuxHyperlink href="https://creativecommons.org/licenses/by/4.0/" :newTab="true"
      >Creative Commons Attribution 4.0 International License.</LuxHyperlink
    >
  </component>
</template>

<script setup>
import { defineOptions } from "vue"
import LuxHyperlink from "./LuxHyperlink.vue"

/**
 * Used to show the University’s creative commons statement
 */
defineOptions({
  name: "LuxCreativeCommonsStatement",
  status: "ready",
  release: "1.0.0",
  type: "Element",
})

const props = defineProps({
  /**
   * The html element name used for the wrapper.
   */
  type: {
    type: String,
    default: "div",
  },
  theme: {
    type: String,
    default: "dark",
  },
})
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/mixins.scss" as *;
@use "/src/assets/styles/focus.scss" as *;

.lux-creative-commons-statement {
  @include reset;
  font-family: var(--font-family-heading);
  font-size: var(--font-size-base);
  line-height: var(--line-height-heading);

  .shade {
    color: var(--color-white);
    background: var(--color-grayscale-darker);
  }
  :deep(.lux-link) {
    box-shadow: none;
  }

  a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  &.dark {
    color: var(--color-white);
    background: var(--color-gray-100);
    a {
      color: var(--color-white);
      background: var(--color-gray-100);
      @include princeton-focus(dark);
    }
  }

  &.shade {
    color: var(--color-white);
    background: var(--color-grayscale-darker);
    a {
      color: var(--color-white);
      background: var(--color-grayscale-darker);
      @include princeton-focus(shade);
    }
  }

  &.light {
    color: var(--color-rich-black);
    background: var(--color-white);
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
    <lux-creative-commons-statement theme="light" type="span"></lux-creative-commons-statement>
  </div>
  ```
</docs>
