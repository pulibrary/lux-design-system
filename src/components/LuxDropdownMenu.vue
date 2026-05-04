<template>
  <component :is="element" :class="['lux-dropdown-menu', size]" v-click-outside="hide">
    <lux-input-button
      v-on:button-clicked="buttonClicked($event)"
      class="lux-dropdown-button"
      variation="dropdown"
      :size="size"
      >{{ buttonLabel }}</lux-input-button
    >
    <lux-menu-bar
      v-bind:class="{ 'lux-show': isVisible }"
      v-on:menu-item-clicked="menuItemClicked($event)"
      :type="type"
      active="All"
      :menu-items="menuItems"
    />
  </component>
</template>

<script setup>
import { defineOptions, ref } from "vue"

/**
 * Dropdowns allows a user to select a value from a series of options. Note that a simple,
 * two-level hierarchy (not recursive) is possible by adding a `children` property
 * to the item and supplying sub-items using the same syntax as the top level items.
 */
defineOptions({
  name: "LuxDropdownMenu",
  status: "ready",
  release: "1.0.0",
  type: "Pattern",
})

const props = defineProps({
  element: {
    type: String,
    default: "div",
  },
  /**
   * The menu items in the dropdown
   */
  buttonLabel: {
    type: String,
    default: "Dropdown",
  },
  /**
   * Whether the dropdown includes links or buttons as menu items
   * `links, buttons`
   */
  type: {
    type: String,
    default: "buttons",
    validator: value => {
      return value.match(/(links|buttons)/)
    },
  },
  /**
   * An array of item (and sub-item) options for the DropdownMenu. Properties
   * for menuItems are described in the LuxMenuBar pattern.
   */
  menuItems: {
    type: Array,
    default() {
      return ["div"]
    },
  },
  /**
   * Alignment of menu items (not currently working)
   * `left, right`
   */
  align: {
    type: String,
    default: "left",
    validator: value => {
      return value.match(/(left|right)/)
    },
  },
  /**
   * Sets the size of the dropdown menu area `small, medium, large`
   */
  size: {
    type: String,
    default: "medium",
    validator: value => {
      return value.match(/(small|medium|large)/)
    },
  },
})

const emit = defineEmits(["button-clicked", "menu-item-clicked"])

const isVisible = ref(false)

function hide() {
  isVisible.value = false
}
function buttonClicked(value) {
  isVisible.value = !this.isVisible.value
  emit("button-clicked", value)
}
function menuItemClicked(value) {
  isVisible.value = false
  emit("menu-item-clicked", value)
}

const vClickOutside = {
  beforeMount: function (el, binding) {
    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble
    const handler = e => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
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
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/system.scss" as *;
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/mixins.scss" as *;

.lux-dropdown-menu {
  margin: 0 0.25rem 1rem;
  font-family: var(--font-family-text);
  font-size: var(--font-size-base);
  line-height: 1;
  color: tint($color-rich-black, 20%);
  position: relative;
  display: inline-block;
  top: 0;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  .lux-dropdown-button {
    @include inset-space($space-small);
    color: tint($color-rich-black, 20%);
    transition: all 0.2s ease;
    margin: 0;
    padding-right: 36px;

    &:hover,
    &[hover] {
      @include box-shadow-inputs-hover;
    }

    &.small {
      @include inset-space(12px);
      font-size: var(--font-size-small);
      padding-right: 30px;
    }

    &.medium {
      @include inset-space($space-small);
      font-size: var(--font-size-base);
      padding-right: 36px;
    }

    &.large {
      @include inset-space(18px);
      font-size: var(--font-size-large);
      padding-right: 50px;
    }
  }

  .lux-dropdown {
    position: relative;
    vertical-align: middle;
    line-height: 1;
    margin: 0;

    &:hover,
    &:focus {
      background: var(--color-grayscale-lighter);
    }
  }

  .lux-menu,
  .lux-nav {
    opacity: 0;
    visibility: hidden;
  }

  .lux-show {
    opacity: 1;
    z-index: 100000;
    visibility: visible;
  }

  :deep(.lux-nav) {
    background: var(--color-white);
    box-shadow: var(--box-shadow-small);

    position: absolute;
    min-width: calc(100% - 1px);
    margin: 1px 0 0;
    z-index: 100000;

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: block;
      width: 100%;
    }

    li {
      display: block;
      width: 100%;
    }

    .lux-has-children {
      background: none;
    }

    &.lux-show .lux-nav-children {
      visibility: visible;
      opacity: 1;
      display: block;
      position: relative;

      a {
        padding-left: 1.5rem;
        color: var(--color-rich-black);

        &::before {
          content: "-";
          padding-right: 0.5rem;
        }
      }
    }

    .lux-nav-item {
      background: var(--color-white);
      border: 0;
      color: var(--color-rich-black);
      cursor: pointer;
      display: block;
      padding: 0.5rem 1rem;
      margin: 0;
      width: 100%;
      text-align: left;
      font-size: var(--font-size-small);

      &:hover,
      &:focus {
        color: var(--color-rich-black);
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
}
</style>

<docs>
```jsx
    <lux-dropdown-menu type="links" button-label="Select Options" :menu-items="[
      {name: 'Vegetable'},
      {name: 'Fruit', children: [
        {name: 'Apple'},
        {name: 'Pear'},
      ]},
    ]">
    </lux-dropdown-menu>
```
</docs>
