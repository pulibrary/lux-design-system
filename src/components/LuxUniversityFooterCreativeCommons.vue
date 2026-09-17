<template>
  <component :is="type" :class="['lux-university-footer-creative-commons', theme]">
    <lux-wrapper class="lux-footer-creative-commons-content" :maxWidth="maxWidth">
      <LuxIconCreativeCommons :theme="theme" width="30" height="30" />
      <LuxIconCreativeCommonsBy :theme="theme" width="30" height="30" />
      <LuxCreativeCommonsStatement :theme="theme" />
    </lux-wrapper>
  </component>
</template>

<script setup>
import LuxIconCreativeCommons from "./icons/LuxIconCreativeCommons.vue"
import LuxIconCreativeCommonsBy from "./icons/LuxIconCreativeCommonsBy.vue"
import LuxCreativeCommonsStatement from "./_LuxCreativeCommonsStatement.vue"
import LuxWrapper from "./LuxWrapper.vue"

/**
 * UniversityFooter includes footer elements required by the University. It may
 * be used when the LibraryFooter is too heavy for or not fully relevant to the
 * site in question.
 */
defineOptions({
  name: "LuxUniversityFooterCreativeCommons",
  status: "ready",
  release: "7.7.3",
  type: "Pattern",

  methods: {
    value: function (theme) {
      if (theme == "light" || theme == "shade") {
        return theme
      }
      return "dark"
    },
  },
})
const props = defineProps({
  /**
   * The html element name used for the container
   */
  type: {
    type: String,
    default: "div",
  },
  /**
   * The maximum width of the wrapper. Default is set to 1440.
   */
  maxWidth: {
    type: Number,
    default: 1440,
  },
  /**
   * Whether the header is dark, shade, or light. Default is set to dark.
   */
  theme: {
    type: String,
    default: "dark",
  },
})
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/system.scss" as *;
@use "/src/assets/styles/focus.scss" as *;

.lux-university-footer-creative-commons {
  @include reset;
  background: var(--color-gray-100);
  padding: 1rem;
}

.lux-footer-creative-commons-content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  padding: 0rem 1rem 0rem 1rem;
  gap: 0.3rem;

  @media (min-width: 900px) {
    max-width: 1440px;
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-university-footer-creative-commons theme="dark"></lux-university-footer-creative-commons>
  </div>
  ```
</docs>
