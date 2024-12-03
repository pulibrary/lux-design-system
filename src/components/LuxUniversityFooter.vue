<template>
  <component :is="type" :class="['lux-university-footer', theme]">
    <lux-wrapper class="lux-footer-content" :maxWidth="maxWidth">
      <div class="lux-footer-bottom bottom-layout">
        <div class="lux-university-links">
          <div class="policy-links" v-for="(link, index) in links" :key="index">
            <a href="{{ link.href }}">{{ link.text }}</a>
          </div>
        </div>
        <div class="lux-university-links center-panel">
          <lux-university-copyright type="div" :theme="value(theme)" />
        </div>
        <div class="lux-university-links pu-logo-white">
          <a href="https://www.princeton.edu"
            ><lux-logo-university-white width="200px" height="72px" type="div"
          /></a>
        </div>
      </div>
    </lux-wrapper>
  </component>
</template>

<script>
import LuxUniversityCopyright from "./_LuxUniversityCopyright.vue"
import LuxLogoUniversityWhite from "./logos/LuxLogoUniversityWhite.vue"
import LuxUniversityPrivacyNotice from "./_LuxUniversityPrivacyNotice.vue"
import LuxWrapper from "./LuxWrapper.vue"

/**
 * UniversityFooter includes footer elements required by the University. It may
 * be used when the LibraryFooter is too heavy for or not fully relevant to the
 * site in question.
 * Don't forget to create a fallback for this component by providing the HTML
 * rendering in _<noscript></noscript>_ tags.
 */
export default {
  name: "LuxUniversityFooter",
  status: "ready",
  release: "1.0.0",
  type: "Pattern",
  components: {
    LuxLogoUniversityWhite,
    LuxUniversityCopyright,
    LuxUniversityPrivacyNotice,
    LuxWrapper,
  },

  methods: {
    value: function (theme) {
      if (theme == "light" || theme == "shade") {
        return theme
      }
      return "dark"
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
    /**
     * Links are supplied via an array of objects containting `text` and `href` properties.  If no links are supplied then a default list is displayed.
     * To remove all links pass an empty array.
     */
    links: {
      required: false,
      type: Array,
      default(rawProps) {
        return [
          {
            text: "Copyright Policy",
            href: "https://library.princeton.edu/about/policies/copyright-and-permissions-policies",
          },
          { text: "Privacy Notice", href: "https://www.princeton.edu/privacy-notice" },
          { text: "Accessibility Help", href: "https://accessibility.princeton.edu/help" },
        ]
      },
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/spacing.scss";
@import "../assets/styles/mixins.scss";
@import "../assets/styles/variables.css";
@import "../assets/styles/system.scss";
@import "../assets/styles/focus.scss";

.bottom-layout {
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.lux-university-footer {
  @include reset;
  @include stack-space(var(--space-base));
  font-family: var(--font-family-heading);
  line-height: var(--line-height-heading);
  color: var(--color-white);
  background: var(--color-gray-100);

  &.dark {
    a {
      text-decoration: none;
      color: var(--color-white);
      @include princeton-focus(dark);
    }
  }

  &.shade {
    background: var(--color-grayscale-darker);

    a {
      text-decoration: none;
      color: var(----color-white);
      @include princeton-focus(dark);
    }
  }

  &.light {
    background: var(--color-white);

    a {
      text-decoration: none;
      color: var(--color-rich-black);
      @include princeton-focus(dark);
    }
  }
}

.lux-footer-bottom {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media (min-width: 900px) {
    max-width: 1440px;
  }
  @media (max-width: 899px) {
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 8px;
  }
}

.lux-footer-content {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  padding: 0rem 1rem 0rem 1rem;

  @media (min-width: 900px) {
    max-width: 1440px;
  }
}

.lux-university-links {
  order: 0;
  display: flex;
  flex-flow: column wrap;
  align-self: auto;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0.5rem 0 0.5rem 0;
  @media (min-width: 900px) {
    flex: 1;
    padding-left: 0.5rem;
  }

  .policy-links {
    display: flow-root;
    text-align: left;
    flex: 0 0 33.3333%;
    font-size: smaller;
  }

  &.pu-logo-white {
    align-content: end;
    padding-right: 0.5rem;
    @media (max-width: 899px) {
      align-content: flex-start;
    }
  }

  &.center-panel {
    @media (min-width: 900px) {
      align-content: center;
      text-align: center;
    }
    @media (max-width: 899px) {
      padding-top: 1em;
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-university-footer theme="dark"></lux-university-footer>
  </div>
  ```
</docs>
