<template>
  <component :is="type" :class="['lux-library-footer', theme]">
    <lux-wrapper class="lux-footer-content" :maxWidth="maxWidth">
      <div class="lux-library-links">
        <lux-library-logo width="142" height="40" :theme="value(theme)" />
        <lux-library-contact-info :theme="value(theme)" />
        <lux-university-accessibility type="span" :theme="value(theme)" />
      </div>
      <div class="lux-library-links">
        <lux-university-copyright type="div" :theme="value(theme)" />
      </div>
      <div class="lux-library-links">
        <nav role="navigation" aria-label="Library Staff">
          <ul>
            <li><a href="https://library.princeton.edu/staff">For Library Staff</a></li>
            <li><a href="https://library.princeton.edu/staff/directory">Staff Directory</a></li>
            <li>
              <a href="https://library.princeton.edu/about/jobs">Library Jobs</a>
            </li>
          </ul>
        </nav>
      </div>
    </lux-wrapper>
  </component>
</template>

<script>
import LuxLibraryContactInfo from "./_LuxLibraryContactInfo.vue"
import LuxUniversityCopyright from "./_LuxUniversityCopyright.vue"
import LuxUniversityAccessibility from "./_LuxUniversityAccessibility.vue"
import LuxWrapper from "./LuxWrapper.vue"
import LuxLogoUniversity from "./logos/LuxLogoUniversity.vue"
/**
 * LibraryFooter is the preferred Footer styling/behavior for PUL websites.
 * Don't forget to create a fallback for this component by providing the HTML
 * rendering in _<noscript></noscript>_ tags.
 */
export default {
  name: "LuxLibraryFooter",
  status: "ready",
  release: "1.0.0",
  type: "Pattern",
  components: {
    LuxLibraryContactInfo,
    LuxUniversityCopyright,
    LuxUniversityAccessibility,
    LuxWrapper,
    LuxLogoUniversity,
  },
  methods: {
    value: function (theme) {
      return theme == "light" ? "light" : "dark"
    },
  },
  props: {
    /**
     * The html element name used for the container
     */
    type: {
      type: String,
      default: "div",
    },
    /**
     * The maximum width of the wrapper. Default is set to 1170.
     */
    maxWidth: {
      type: Number,
      default: 1170,
    },
    /**
     * Whether the header is dark, shade, or light. Default is set to dark.
     */
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

.lux-library-footer {
  @include reset;
  @include stack-space(var(--space-base));
  font-family: var(--font-family-heading);
  line-height: var(--line-height-heading);
  color: var(--color-white);
  background: var(--color-rich-black);
  padding-top: 1em;
  padding-bottom: 1em;
  margin-top: 3em;

  &.dark {
    background: var(--color-rich-black);

    .lux-library-links a {
      text-decoration: none;
      color: var(--color-white);
    }
  }

  &.shade {
    background: var(--color-grayscale-darker);
    .lux-library-links a {
      text-decoration: none;
      color: var(--color-rich-black);
    }
  }

  &.light {
    background: var(--color-white);

    .lux-library-links a {
      text-decoration: none;
      color: var(--color-rich-black);
    }
  }
}

.lux-footer-content {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  align-items: flex-start;
  padding: 1em;

  @media (min-width: 900px) {
    flex-direction: row;
    max-width: 1170px;
  }
}

.lux-library-links {
  order: 0;
  align-self: auto;
  @media (min-width: 900px) {
    flex: 1;
  }

  h2 {
    font-family: var(--font-family-heading);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
  }

  a {
    text-decoration: none;
    color: var(--color-white);

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      line-height: var(--line-height-base);
      font-size: var(--font-size-small);
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-library-footer theme="dark"></lux-library-footer>
  </div>
  ```
</docs>
