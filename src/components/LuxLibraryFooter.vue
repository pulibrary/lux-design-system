<template>
  <component :is="type" :class="['lux-library-footer', theme]">
    <lux-wrapper class="lux-footer-content" :maxWidth="maxWidth">
      <div class="lux-footer-main">
        <div class="lux-library-links contact-info-layout">
          <div>
            <lux-library-logo width="245" height="54" :theme="value(theme)" />
            <lux-library-contact-info :theme="value(theme)" />
          </div>
        </div>
        <div class="lux-library-links subscribe-layout">
          <h2>Subscribe to our Newsletter</h2>
          <lux-subscribe-newsletter type="div" />
          <div class="social-pul-icons">
            <a href="https://x.com/PULibrary"><lux-logo-x width="24" height="24" /></a>
            <a href="http://www.facebook.com/PULibrary"
              ><lux-logo-facebook width="24" height="24"
            /></a>
            <a href="https://www.instagram.com/PULibrary/"
              ><lux-logo-instagram width="24" height="24"
            /></a>
            <a href="https://libguides.princeton.edu/usgovdocs"
              ><lux-logo-gov-docs width="30" height="30"
            /></a>
            <a href="https://fpul.princeton.edu/"><lux-logo-friends width="120" height="35" /></a>
          </div>
        </div>
        <div class="lux-library-links">
          <nav role="navigation" aria-label="Library Staff">
            <ul>
              <li><a href="https://library.princeton.edu/library-staff">For Library Staff</a></li>
              <li>
                <a href="https://library.princeton.edu/about/staff-directory">Staff Directory</a>
              </li>
              <li>
                <a href="https://library.princeton.edu/about/employment">Library Jobs</a>
              </li>
              <li>
                <lux-university-privacy-notice :theme="value(theme)" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="lux-footer-bottom bottom-layout">
        <div class="lux-library-links">
          <lux-university-accessibility :theme="value(theme)" />
        </div>
        <div class="lux-library-links center-panel">
          <lux-university-copyright type="div" :theme="value(theme)" />
        </div>
        <div class="lux-library-links pu-logo-white">
          <a href="https://www.princeton.edu"
            ><lux-logo-university-white width="200px" height="72px" type="div"
          /></a>
        </div>
      </div>
    </lux-wrapper>
  </component>
</template>

<script>
import LuxLibraryContactInfo from "./_LuxLibraryContactInfo.vue"
import LuxLibraryLogo from "./LuxLibraryLogo.vue"
import LuxLogoFacebook from "./logos/LuxLogoFacebook.vue"
import LuxLogoFriends from "./logos/LuxLogoFriends.vue"
import LuxLogoGovDocs from "./logos/LuxLogoGovDocs.vue"
import LuxLogoInstagram from "./logos/LuxLogoInstagram.vue"
import LuxLogoUniversityWhite from "./logos/LuxLogoUniversityWhite.vue"
import LuxLogoX from "./logos/LuxLogoX.vue"
import LuxSubscribeNewsletter from "./_LuxSubscribeNewsletter.vue"
import LuxUniversityAccessibility from "./_LuxUniversityAccessibility.vue"
import LuxUniversityCopyright from "./_LuxUniversityCopyright.vue"
import LuxUniversityPrivacyNotice from "./_LuxUniversityPrivacyNotice.vue"
import LuxWrapper from "./LuxWrapper.vue"

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
    LuxLibraryLogo,
    LuxLogoFacebook,
    LuxLogoFriends,
    LuxLogoGovDocs,
    LuxLogoInstagram,
    LuxLogoUniversityWhite,
    LuxLogoX,
    LuxSubscribeNewsletter,
    LuxUniversityAccessibility,
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
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/spacing.scss";
@import "../assets/styles/mixins.scss";
@import "../assets/styles/variables.css";
@import "../assets/styles/system.scss";
@import "../assets/styles/focus.scss";

.contact-info-layout {
  @media (min-width: 900px) {
    border-right: 1px solid rgba(255, 255, 255, 0.3);
    > div {
      padding-left: 8px;
    }
  }

  @media (max-width: 899px) {
    /* on phone sizes it stacks */
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
}

.subscribe-layout {
  @media (min-width: 900px) {
    border-right: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0rem 2rem 0rem 2rem;
  }
  @media (max-width: 899px) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
}

.social-pul-icons {
  display: flex;
  flex-flow: row nowrap;
  width: 300px;
  align-items: flex-end;
  justify-content: space-between;
  @media (max-width: 899px) {
    width: 200px;
  }
}

.bottom-layout {
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.lux-logo-x {
  margin: 0.5rem 0.1rem 0rem 0.2rem;
}

.lux-logo-facebook {
  margin: 0.5rem 0.2rem 0rem 0.1rem;
}

.lux-logo-instagram {
  margin: 0.5rem 0.25rem 0rem 0.2rem;
}

.lux-logo-gov-docs {
  margin: 0.5rem 0.1rem 0rem 0.3rem;
}

.lux-logo-friends {
  margin: 0.5rem 0.2rem -0.2rem 0.2rem;
}
.lux-library-footer {
  @include reset;
  @include stack-space(var(--space-base));
  font-family: var(--font-family-heading);
  line-height: var(--line-height-heading);
  color: var(--color-white);
  background: var(--color-gray-100);
  @media (min-width: 900px) {
    padding-top: 1em;
  }

  &.dark {
    .lux-library-links a {
      text-decoration: underline;
      text-underline-offset: 3px;
      color: var(--color-white);
      @include princeton-focus(dark);
    }
  }

  &.shade {
    background: var(--color-grayscale-darker);

    .lux-library-links a {
      text-decoration: underline;
      text-underline-offset: 3px;
      color: var(----color-white);
      @include princeton-focus(dark);
    }
  }

  &.light {
    background: var(--color-white);

    .lux-library-links a {
      text-decoration: underline;
      text-underline-offset: 3px;
      color: var(--color-rich-black);
      @include princeton-focus(dark);
    }
  }
}

.lux-footer-main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0rem 0rem 1rem 0rem;

  @media (min-width: 900px) {
    max-width: 1440px;
  }
  @media (max-width: 899px) {
    flex-direction: column;
    > div {
      padding-bottom: 8px;
      padding-top: 8px;
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

.lux-library-links {
  order: 0;
  display: flex;
  flex-flow: column wrap;
  align-self: auto;
  justify-content: center;
  @media (min-width: 900px) {
    flex: 1;
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

  h2 {
    font-family: var(--font-family-heading);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
  }

  a {
    color: var(--color-white);

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-flow: column wrap;
    padding-right: 2rem;
    @media (max-width: 899px) {
      padding: 0rem 2rem 0rem 0rem;
      align-content: flex-start;
      margin-bottom: 0px;
    }

    li:not(:last-child) {
      padding-bottom: 1rem;
    }
    li {
      line-height: var(--line-height-heading);
      font-size: var(--font-size-base);
      a {
        text-decoration: underline;
        text-underline-offset: 3px;
      }
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
