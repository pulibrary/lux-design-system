<template>
  <nav v-if="type === 'links'" :class="['lux-nav', theme]">
    <ul>
      <li v-for="(item, index) in menuItems" :key="index">
        <template v-if="item.children">
          <a
            :key="index"
            :href="item.href"
            :title="item.name"
            class="lux-has-children lux-nav-item"
            aria-haspopup="true"
            @click="menuItemClicked($event, item)"
            ><lux-menu-bar-label :item="item"></lux-menu-bar-label
          ></a>
          <ul class="lux-nav-children" aria-label="submenu">
            <li v-for="{ href, name, index, target } in item.children" :key="index">
              <a
                :href="href"
                :title="name"
                :target="target"
                class="lux-nav-item"
                @click="menuItemClicked($event, item)"
                >{{ name }}</a
              >
            </li>
          </ul>
        </template>
        <template v-else>
          <a
            :href="item.href"
            :title="item.name"
            class="lux-nav-item"
            @click="menuItemClicked($event, item)"
            ><lux-menu-bar-label :item="item"></lux-menu-bar-label
          ></a>
        </template>
      </li>
    </ul>
  </nav>

  <div v-else-if="type === 'buttons'" :class="['lux-menu', theme]">
    <ul>
      <li v-for="(item, index) in menuItems" v-bind:key="item">
        <button
          :key="index"
          :href="item.href"
          :class="[
            'lux-menu-item',
            { 'lux-active': localActive === item.component },
            { 'lux-disabled': item.disabled },
            { 'lux-is-child': item.hasOwnProperty('parent') === true },
          ]"
          :disabled="item.disabled"
          @click="menuItemClicked($event, item)"
        >
          <lux-menu-bar-label :item="item"></lux-menu-bar-label>
        </button>
      </li>
    </ul>
  </div>

  <nav
    v-else-if="type === 'main-menu'"
    :class="['lux-main-menu', theme]"
    aria-label="Main Navigation"
  >
    <button
      aria-haspopup="true"
      aria-label="Main Menu"
      :aria-expanded="isVisible ? 'true' : 'false'"
      class="lux-main-menu-toggle"
      :class="{ 'is-active': isVisible }"
      @click="isVisible = !isVisible"
    >
      <lux-hamburger></lux-hamburger>
    </button>
    <ul class="lux-main-menu-list" :class="{ 'lux-show': isVisible }">
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        :class="{ 'lux-has-children': item.children }"
      >
        <template v-if="item.children">
          <button
            aria-haspopup="true"
            :aria-expanded="activeItem === index ? 'true' : 'false'"
            class="lux-submenu-toggle"
            :data-method="item.method"
            @click="setActiveItem(index)"
            @keydown.esc="setActiveItem(index)"
            v-click-outside="hide"
            @focusout="hideIfExitingMenu"
          >
            <lux-menu-bar-label :item="item"></lux-menu-bar-label>
          </button>
          <ul :class="{ 'lux-show': index === activeItem }">
            <li v-for="(child, index) in item.children" :key="index">
              <a
                v-if="child.href"
                :key="index"
                :href="child.href"
                :title="child.name"
                :target="child.target"
                :data-method="child.method"
                class="lux-nav-item"
                @click="menuItemClicked(child)"
                @focusout="hideIfExitingMenu"
                ><lux-menu-bar-label :item="child"></lux-menu-bar-label
              ></a>
              <button
                v-else
                key="{{ index }}-button"
                :title="child.name"
                :data-method="child.method"
                class="lux-nav-item"
                @click="menuItemClicked(child)"
                @focusout="hideIfExitingMenu"
              >
                <lux-menu-bar-label :item="child"></lux-menu-bar-label>
              </button>
            </li>
          </ul>
        </template>
        <template v-else>
          <a
            :key="index"
            :href="item.href"
            :title="item.name"
            :data-method="item.method"
            class="lux-nav-item"
            @click="menuItemClicked(item)"
          >
            <lux-menu-bar-label :item="item"></lux-menu-bar-label>
          </a>
        </template>
      </li>
    </ul>
  </nav>
</template>

<script>
import _LuxHamburger from "./_LuxHamburger.vue"
import _LuxMenuBarLabel from "./_LuxMenuBarLabel.vue"

/**
 * Used as main page navigation in templates.
 */
export default {
  name: "LuxMenuBar",
  status: "ready",
  release: "1.0.0",
  type: "Pattern",
  model: {
    prop: "active",
  },
  data: function () {
    return {
      isVisible: false,
      activeItem: "",
    }
  },
  props: {
    /**
     * The html element types used for the nav bar. Passing 'href' in menuItems
     * will only work if type = "links".
     * `links, buttons`
     */
    type: {
      type: String,
      default: "links",
      validator: value => {
        return value.match(/(links|buttons|main-menu)/)
      },
    },
    /**
     * State which tab is active when initiated (using name of the component).
     */
    active: {
      required: false,
      type: String,
    },
    /**
     * Menu items are options to be displayed to the user.  They have several possible properties:
     * <dl><dt><code>name</code></dt><dd>The text that is displayed for this menu item</dd>
     * <dt><code>href</code></dt><dd>If the type is links or main-menu, the url that the menu item links to.</dd>
     * <dt><code>target</code></dt><dd>If the type is links or main-menu, where to display the linked URL (for example, <code>_blank</code> for a new tab).</dd>
     * <dt><code>children</code></dt><dd>An array of items that should display below the current item hierarchically.</dd>
     * <dt><code>disabled</code></dt><dd>If the type is buttons, whether or not the button should be disabled.</dd>
     * <dt><code>component</code></dt><dd>Optional. An identifier you can use in conjunction with the <code>active</code> prop.</dd>
     * <dt><code>unsafe_name</code></dt><dd>Optional. If you need to include some arbitrary HTML in the menu item text, you can here and it will override the label provided in <code>name</code>.  Don't bind the <code>unsafe_name</code> property to any user-provided value, since it does not have Cross-Site Scripting protections (<code>name</code> does have these protections).</dd>
     * <dt><code>method</code></dt><dd>Optional. For use in conjunction with Rails applications that use UJS to link to non-GET HTTP methods, like POST or DELETE.  To mimic a Rails link_to helper for an item, pass the HTTP method with a `method` property.</dd>
     * </dl>
     */
    menuItems: {
      required: true,
      type: Array,
    },
    /**
     * Whether the header is dark, shade, or light. Default is set to dark.
     */
    theme: {
      type: String,
      default: "dark",
      validator: value => {
        return value.match(/(dark|shade|light)/)
      },
    },
  },
  computed: {
    localActive: {
      get() {
        return this.active
      },
      set(val) {
        this.$emit("input", val)
      },
    },
  },
  methods: {
    menuItemClicked(value) {
      this.$emit("menu-item-clicked", value)
    },
    setActiveItem(index) {
      if (this.activeItem === index) {
        this.activeItem = ""
      } else {
        this.activeItem = index
      }
    },

    hide: function (event) {
      this.activeItem = ""
    },

    hideIfExitingMenu: function (event) {
      const menuOfOldElement = event.currentTarget?.closest(".lux-has-children")
      const menuOfNewElement = event.relatedTarget?.closest(".lux-has-children")
      if (menuOfOldElement !== menuOfNewElement) {
        this.hide(event)
      }
    },
  },
  components: {
    "lux-hamburger": _LuxHamburger,
    "lux-menu-bar-label": _LuxMenuBarLabel,
  },

  directives: {
    "click-outside": {
      beforeMount: function (el, binding) {
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble

        const handler = e => {
          if (
            el.ariaExpanded === "true" &&
            (bubble || (!el.contains(e.target) && el !== e.target))
          ) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener("click", handler)
      },

      unmounted: function (el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      },
    },
  },
  emits: ["input", "menu-item-clicked"],
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/variables.css" as *;
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/system.scss" as *;
@use "/src/assets/styles/media_queries.scss" as mq;
@use "/src/assets/styles/focus.scss" as *;

// CSS variables that are specific to this component
:root {
  --color-nav-link: var(--color-bleu-de-france);
  --color-nav-link-active: var(--color-bleu-de-france);
}

.lux-nav {
  @include stack-space($space-base);
  font-family: var(--font-family-text);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  width: 100%;

  ul {
    list-style-type: none;
    margin: 0;
    padding-left: 0;
  }

  li {
    color: var(--color-nav-link);
    display: block;
    float: left;
    position: relative;
    text-decoration: none;
    transition-duration: 0.5s;

    &:hover,
    &:focus-within {
      cursor: pointer;
    }

    &:hover > ul,
    &:focus-within > ul,
    & ul:hover,
    & ul:focus {
      visibility: visible;
      opacity: 1;
      display: block;
    }
  }

  a {
    color: var(--color-nav-link);
    padding: var(--space-x-small) 0;
    margin: 0 var(--space-x-small);
    text-decoration: none;
    display: block;

    &:hover,
    &:focus {
      color: var(--color-nav-link-active);
    }

    &.lux-active {
      border-bottom: 2px solid var(--color-nav-link);
      font-weight: var(--font-weight-bold);
      color: var(--color-nav-link);
    }

    &.lux-has-children {
      background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%20000002%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
      background-repeat: no-repeat, repeat;
      background-position: right 0.7em top 52%, 0 0;
      background-size: 0.55em auto, 100%;
      padding-right: 23px;
    }
  }

  .lux-nav-children {
    visibility: hidden;
    opacity: 0;
    min-width: 100%;
    width: auto;
    position: absolute;
    margin-top: 0;
    left: 0;
    display: none;
    z-index: 999;

    li {
      clear: both;
      width: 100%;
    }
  }

  li:last-child .lux-nav-children {
    right: 0;
    left: initial;
  }
}

.lux-menu {
  background: var(--color-white);
  box-shadow: var(--box-shadow-small);

  position: absolute;
  min-width: calc(100% - 1px);
  margin: 1px 0 0;
  z-index: 999;
  transition: opacity 0.1s ease;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: block;
  }
  .lux-menu-item {
    background: var(--color-white);
    border: 0;
    cursor: pointer;
    display: block;
    padding: 0.5rem 1rem;
    width: 100%;
    text-align: left;
    font-size: var(--font-size-base);

    &:hover,
    &:focus {
      background: var(--color-grayscale-lighter);
      transition: opacity 0.1s ease;
    }

    &:active {
      transform: scale(0.99);
    }
  }

  .lux-disabled {
    color: var(--color-grayscale-dark);

    &:hover,
    &:focus {
      background: var(--color-white);
      cursor: not-allowed;
      outline: none;
    }
  }
}

.lux-main-menu {
  @include stack-space($space-base);
  font-family: var(--font-family-text);
  font-size: var(--font-size-base);
  line-height: $line-height-base;
  width: 100%;

  .lux-main-menu-toggle {
    text-align: center;
    padding: $space-x-small;
    background: transparent;
    border: 0;
  }

  a,
  .lux-submenu-toggle {
    font-family: var(--font-family-text);
    background-color: transparent;
    border: 0;
    line-height: 1;
    cursor: pointer;
    outline: none;
    padding: $space-small $space-x-small;
    padding-left: $space-small;
    font-size: var(--font-size-base);
    color: $color-rich-black;
    display: block;
    text-decoration: none;
    width: 100%;
    text-align: left;
    white-space: nowrap;

    + ul button {
      font-family: var(--font-family-text);
      font-size: var(--font-size-base);
      line-height: 1;
      border: none;
      background: none;
      color: var(--color-rich-black);
      padding: 0.5rem 1rem;
      @include princeton-focus(light);
      width: 100%;
      box-sizing: border-box;
      text-align: start;
    }

    + ul button:hover {
      cursor: pointer;
      color: var(--color-rich-black);
    }

    + ul button:focus {
      color: var(--color-rich-black);
    }

    @media #{mq.$media-query-medium-max} {
      font-size: var(--font-size-base);
    }

    &[target="_blank"]:after {
      content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==);
      margin: 0px 3px 0px 5px;
    }
  }

  .lux-main-menu-list {
    display: none;
    @include reset;
    flex-wrap: wrap;

    @media #{mq.$media-query-medium-max} {
      > li:first-child a {
        padding-top: $space-base;
      }

      li:last-child a:last-child {
        padding-bottom: $space-base;
      }

      .lux-has-children {
        .lux-submenu-toggle {
          padding-bottom: $space-xx-small;
        }
        li:first-child a {
          padding-top: $space-small;
        }

        &:last-child li:last-child a:last-child {
          padding-bottom: $space-base;
        }
      }
    }

    ul {
      @include reset;
    }

    li {
      list-style-type: none;
      flex-basis: 100%;
      @media #{mq.$media-query-medium-max} {
        border-bottom: 1px solid $color-grayscale-light;
      }

      &.lux-has-children {
        @media #{mq.$media-query-medium-max} {
          border-bottom: 0;
        }
      }

      .lux-show a {
        @include princeton-focus(light);
      }
    }

    @media #{mq.$media-query-medium-max} {
      &.lux-show {
        display: flex;
        position: absolute;
        top: 60px;
        right: 0;
        left: 0;
        background: white;
        z-index: 999;
      }
    }
  }

  @media #{mq.$media-query-medium-max} {
    .lux-submenu-toggle {
      font-size: 0.85rem;
      color: $color-grayscale;
      text-transform: uppercase;
      font-weight: 700;

      + ul a {
        padding-left: $space-base * 1.5;
      }
    }
  }

  @media #{mq.$media-query-large} {
    .lux-main-menu-toggle {
      display: none;
    }

    .lux-main-menu-list {
      display: inline-flex;
      position: static;
    }

    .lux-main-menu-list li {
      flex-basis: auto;
    }

    a,
    button {
      width: auto;
    }

    .lux-has-children {
      position: relative;
    }

    .lux-has-children ul {
      position: absolute;
      background: $color-white;
      margin-bottom: 20px;
      z-index: 100000;
      left: 0;
      top: 48px;
      box-shadow: var(--box-shadow-large);
      display: none;
      min-width: 100%;

      @media (min-width: 900px) {
        background: var(--color-white);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }

      li {
        white-space: nowrap;

        &:last-child {
          border-bottom: 0;
        }
      }

      &.lux-show {
        display: block;
      }

      a {
        color: var(--color-rich-black);

        &:hover,
        &:focus {
          color: var(--color-rich-black);
        }
      }
    }

    .lux-submenu-toggle {
      background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%20000002%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
      background-repeat: no-repeat, repeat;
      background-position: right 0.7em top 52%, 0 0;
      background-size: 0.55em auto, 100%;
      padding-right: 30px;
      color: $color-rich-black;

      + ul a {
        padding: 0.5rem 1rem;
        line-height: 1;

        &:first-child,
        &:last-child {
          padding-top: 0.75rem;
        }
      }
    }
  }
}

.dark {
  a,
  .lux-submenu-toggle {
    @include princeton-focus(dark);
  }
  background: var(--color-gray-100);

  @media (max-width: 899px) {
    &.lux-main-menu a {
      color: var(--color-rich-black);
    }
  }

  @media (min-width: 900px) {
    &.lux-main-menu a,
    &.lux-main-menu button {
      color: var(--color-white);

      &:hover,
      &:focus {
        color: var(--color-white);
      }
    }
  }

  &.lux-main-menu .lux-submenu-toggle {
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjkyLjQgMjkyLjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI5Mi40IDI5Mi40OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yODcsNjkuNGMtMy40LTMuNS04LjEtNS41LTEzLTUuNEgxOC40Yy01LDAtOS4zLDEuOC0xMi45LDUuNEMyLDcyLjcsMCw3Ny40LDAsODIuMmMwLDUsMS44LDkuMyw1LjQsMTIuOQoJbDEyOCwxMjcuOWMzLjYsMy42LDcuOCw1LjQsMTIuOCw1LjRzOS4yLTEuOCwxMi44LTUuNEwyODcsOTVjMy41LTMuNSw1LjQtNy44LDUuNC0xMi44cy0xLjktOS4yLTUuNS0xMi44TDI4Nyw2OS40eiIvPgo8L3N2Zz4K");

    @media (min-width: 900px) {
      color: white;
    }
  }
}

.shade {
  background: var(--color-grayscale-darker);

  a,
  .lux-submenu-toggle {
    @include princeton-focus(shade);
  }

  @media (max-width: 899px) {
    &.lux-main-menu a {
      color: var(--color-rich-black);
    }
  }

  @media (min-width: 900px) {
    &.lux-main-menu a,
    &.lux-main-menu button {
      color: var(--color-white);

      &:hover,
      &:focus {
        color: var(--color-white);
      }
    }
  }

  &.lux-main-menu .lux-submenu-toggle {
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjkyLjQgMjkyLjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI5Mi40IDI5Mi40OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yODcsNjkuNGMtMy40LTMuNS04LjEtNS41LTEzLTUuNEgxOC40Yy01LDAtOS4zLDEuOC0xMi45LDUuNEMyLDcyLjcsMCw3Ny40LDAsODIuMmMwLDUsMS44LDkuMyw1LjQsMTIuOQoJbDEyOCwxMjcuOWMzLjYsMy42LDcuOCw1LjQsMTIuOCw1LjRzOS4yLTEuOCwxMi44LTUuNEwyODcsOTVjMy41LTMuNSw1LjQtNy44LDUuNC0xMi44cy0xLjktOS4yLTUuNS0xMi44TDI4Nyw2OS40eiIvPgo8L3N2Zz4K");

    @media (min-width: 900px) {
      color: white;
    }
  }
}

.light {
  background: var(--color-white);
  a,
  .lux-submenu-toggle {
    @include princeton-focus(light);
  }

  :deep(.hamburger-inner),
  :deep(.hamburger-inner:after),
  :deep(.hamburger-inner:before) {
    background-color: var(--color-gray-100);
  }

  @media (max-width: 899px) {
    &.lux-main-menu a {
      color: var(--color-rich-black);
    }
  }

  @media (min-width: 900px) {
    &.lux-main-menu a,
    &.lux-main-menu button.lux-submenu-toggle {
      color: var(--color-rich-black);

      &:hover,
      &:focus {
        color: var(--color-rich-black);
      }
    }
  }
}
</style>

<docs>
  ```jsx
    <lux-menu-bar type="main-menu" active="Dashboard" :menu-items="[
      {name: 'Dashboard', component: 'Dashboard', href: '/example/'},
      {name: 'Posts', component: 'Posts', href: '/example/'},
      {name: 'Requests', component: 'Requests', href: '/example/', children: [
        {name: 'New Travel Request', component: 'New Travel Request', href: '/example/'},
        {name: 'New Leave Request', component: 'New Leave Request', href: '/example/'}
      ]},
      {name: 'Users', component: 'Users', href: '/example/', children: [
        {name: 'External Site', component: 'External Site', href: 'http://princeton.edu', target: '_blank'},
        {name: 'Settings', component: 'Settings', href: '/example/'},
        {name: 'Logout', component: 'Logout', href: '/example/'}
      ]}
    ]"/>

    <lux-menu-bar type="links" active="Dashboard" :menu-items="[
      {name: 'Logout', component: 'Logout', href: '/logout'}]" theme="light"/>
  ```
</docs>
