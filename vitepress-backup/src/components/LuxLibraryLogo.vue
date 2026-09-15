<template>
  <component :is="type" :class="['lux-library-logo', theme]">
    <a href="https://library.princeton.edu">
      <lux-logo-library v-if="theme === 'dark'" class="full-logo" />
      <lux-logo-library v-else color="#000000" class="full-logo" />
    </a>
  </component>
</template>

<script setup>
import { defineOptions } from "vue"
import LuxLogoLibrary from "./logos/LuxLogoLibrary.vue"

/**
 * Used to identify that the site is a Princeton University site in the footer
 * and links to princeton.edu.
 */
defineOptions({
  name: "LuxLibraryLogo",
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
  /**
   * Whether the theme is dark or light.
   */
  theme: {
    type: String,
    default: "dark",
  },
})
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/focus.scss" as *;
@use "/src/assets/styles/media_queries.scss" as *;

.lux-library-logo {
  a {
    &:focus,
    &:focus-visible {
      outline: none;
    }
  }
  &.light {
    a {
      @include princeton-focus(light);
      &:hover,
      &:focus-within {
        outline-offset: 0.1rem;
      }
    }
  }
  &.dark {
    a {
      @include princeton-focus(dark);
      &:focus-within {
        outline-offset: 0.1rem;
      }
    }
  }
  &.shade {
    a {
      @include princeton-focus(shade);
      &:focus-within {
        outline-offset: 0.1rem;
      }
    }
  }
}

.full-logo {
  display: block;
}
</style>

<docs>
  ```jsx
    <div>
      <lux-library-logo theme="light"></lux-library-logo>
    </div>
  ```
</docs>
