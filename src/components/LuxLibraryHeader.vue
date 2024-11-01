<template>
  <component :is="type" :class="['lux-library-header', theme]">
    <lux-wrapper class="lux-header-content" :maxWidth="maxWidth">
      <!-- @slot A custom logo to display in the Header.  If no logo is provided, it defaults to the Princeton University Library logo. -->
      <slot name="logo">
        <lux-library-logo width="245" height="54" :theme="value(theme)"></lux-library-logo>
      </slot>
      <a
        v-if="appName"
        class="lux-app-name"
        :href="appUrl"
        :title="appName"
        aria-labelledby="appName"
      >
        <span id="appName" class="full-name">{{ appName }}</span>
        <span class="abbr-name">{{ abbrName }}</span>
      </a>
      <lux-spacer></lux-spacer>
      <!-- @slot The content of the header, such as a navigation menu. -->
      <slot />
    </lux-wrapper>
  </component>
</template>

<script>
import LuxLibraryLogo from "./LuxLibraryLogo.vue"
import LuxSpacer from "./LuxSpacer.vue"
import LuxWrapper from "./LuxWrapper.vue"

/**
 * LibraryHeader is the preferred Header styling/behavior for PUL websites.
 * Don't forget to create a fallback for this component by also providing the HTML
 * rendering in _<noscript></noscript>_ tags.
 */
export default {
  name: "LuxLibraryHeader",
  status: "ready",
  release: "1.0.0",
  type: "Pattern",
  props: {
    /**
     * The html element name used for the container
     */
    type: {
      type: String,
      default: "div",
    },
    /**
     * The name of the application or site
     */
    appName: {
      type: String,
      default: "",
    },
    /**
     * The abbreviation of the application or site's name
     */
    abbrName: {
      type: String,
      default: "",
    },
    /**
     * The URL of landing page for the application or site
     */
    appUrl: {
      type: String,
      default: "",
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
  methods: {
    value: function (theme) {
      return theme == "light" ? "light" : "dark"
    },
  },
  components: {
    LuxSpacer,
    LuxWrapper,
    LuxLibraryLogo,
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.css";
@import "../assets/styles/mixins.scss";
@import "../assets/styles/focus.scss";
/**
   * Styles in a top-level App component and in layout components may be global,
   * but all other components should always be scoped (using either scoped
   * attribute or class based scoping).
   */
.lux-library-header {
  @include reset;
  border-bottom: 1px solid var(--color-princeton-orange-on-black);
  font-family: var(--font-family-heading);
  position: relative;

  :deep(.lux-main-menu) {
    width: auto;
  }

  @media (max-width: 899px) {
    :deep(.lux-main-menu .lux-main-menu-list.lux-show) {
      top: 50px;
    }
  }

  :deep(.lux-main-menu .lux-submenu-toggle) {
    @media (min-width: 900px) {
      color: var(--color-white);
    }
    padding-right: 25px;
  }

  :deep(.lux-main-menu-list li:last-child ul) {
    left: initial;
    right: 0;
  }

  &.dark {
    background: var(--color-gray-100);
    a.lux-app-name {
      @include princeton-focus(dark);
    }
  }

  &.shade {
    background: var(--color-grayscale-darker);
    a.lux-app-name {
      @include princeton-focus(shade);
    }
  }

  &.light {
    background: var(--color-white);

    .lux-app-name:not(:empty) {
      color: var(--color-rich-black);
    }
    a.lux-app-name {
      @include princeton-focus(light);
    }
  }
}

.lux-header-content {
  align-items: center;
  display: flex;
  padding: 0 1rem;

  @media (min-width: 900px) {
    flex-direction: row;
    max-width: 1440px;
  }
}

.lux-app-name:not(:empty) {
  align-self: center;
  border-left: 0;
  color: var(--color-white);
  display: flex;
  font-size: var(--font-size-x-large);
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 33px;
  padding-left: 1rem;
  text-align: center;
  text-decoration: none;

  .full-name {
    display: none;
  }

  @media (min-width: 900px) {
    border-left: 1px solid var(--color-grayscale-light);
    height: 35px;
    margin: 0 0 0 1rem;
    padding: 0 0 0 1rem;
    text-align: left;

    .full-name {
      display: block;
      font-size: var(--font-size-large);
    }

    .abbr-name {
      display: none;
    }
  }

  @media (max-width: 899px) {
    border-left: 1px solid var(--color-grayscale-light);
    height: 35px;
    margin: 0 0 0 1rem;
    padding: 0 0 0 1rem;
    text-align: left;

    .full-name {
      display: none;
    }

    .abbr-name {
      display: block;
      font-size: var(--font-size-base);
    }
  }
}
</style>

<docs>
  ```jsx
    <div>
      <lux-library-header app-name="Leave and Travel Requests" abbr-name="LTR" app-url="https://catalog.princeton.edu" theme="dark">
        <lux-menu-bar type="main-menu" :menu-items="[
            {name: 'Help', component: 'Help', href: '/help/'},
            {name: 'Feedback', component: 'Feedback', href: '/feedback/'},
            {name: 'Your Account', component: 'Account', href: '/account/', children: [
              {name: 'Logout', component: 'Logout', href: '/account/'}
            ]}
          ]"
        ></lux-menu-bar>
      </lux-library-header>
    </div>
  ```

  ```jsx noeditor
    <div class="dos-n-donts">
      <div class="do">
        <div class="do-dont-example">
          <lux-library-header></lux-library-header>
          <noscript>Place fallback header here.</noscript>
        </div>
        <p>Make sure users with JavaScript disabled can see important parts of the page by using &lt;noscript&gt; tags.</p>
      </div>

      <div class="dont">
        <div class="do-dont-example">
          <lux-spacer></lux-spacer>
          <p>? ? ? </p>
          <lux-spacer></lux-spacer>
        </div>
        <p>JavaScript-disabled browsers won't see any branding and may be missing important functionality.</p>
      </div>
    </div>
  ```

  You can pass in a custom logo via the logo slot:

  ```jsx
    <div>
      <lux-library-header app-url="https://catalog.princeton.edu" theme="dark">
        <template v-slot:logo><img src="https://raw.githubusercontent.com/pulibrary/tigerdata-app/refs/heads/main/app/assets/images/TigerData-LOGO-KO_wide2.svg" height="100"></template>
        <lux-menu-bar type="main-menu" :menu-items="[
            {name: 'Help', component: 'Help', href: '/help/'},
            {name: 'Feedback', component: 'Feedback', href: '/feedback/'},
            {name: 'Your Account', component: 'Account', href: '/account/', children: [
              {name: 'Logout', component: 'Logout', href: '/account/'}
            ]}
          ]"
        ></lux-menu-bar>
      </lux-library-header>
    </div>
  ```
</docs>
