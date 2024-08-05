<template>
  <component :is="type" :class="['lux-library-logo', theme]">
    <a href="https://library.princeton.edu">
      <lux-logo-library :width="width" :height="height" v-if="theme === 'dark'" class="full-logo" />
      <lux-logo-library :width="width" :height="height" v-else color="#000000" class="full-logo" />
    </a>
  </component>
</template>

<script>
import LuxLogoLibrary from "./logos/LuxLogoLibrary.vue"

/**
 * Used to identify that the site is a Princeton University site in the footer
 * and links to princeton.edu.
 */
export default {
  name: "LuxLibraryLogo",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  props: {
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
    /*
     * The width of the logo
     */
    width: {
      type: String,
      default: "155px",
    },
    /*
     * The height of the logo
     */
    height: {
      type: String,
      default: "34px",
    },
  },
  components: {
    LuxLogoLibrary,
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.css";
@import "../assets/styles/media_queries.scss";
@import "../assets/styles/focus.scss";

.lux-library-logo {
  margin: var(--space-x-small) 0;
  a {
    &:focus,
    &:focus-visible {
      outline: none;
    }
  }
  &.light {
    @include princeton-focus(light);
    &:hover,
    &:focus-within {
      outline-offset: 0.1rem;
    }
  }
  &.dark {
    @include princeton-focus(dark);
    &:focus-within {
      outline-offset: 0.1rem;
    }
  }
  &.shade {
    @include princeton-focus(shade);
    &:focus-within {
      outline-offset: 0.1rem;
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
