<template>
  <span class="hamburger-box">
    <span class="hamburger-inner"></span>
  </span>
</template>

<script setup>
import { defineOptions } from "vue"

/**
 * Used in conjunction with LuxMenuBar to display a menu on narrow screens.
 */
defineOptions({
  name: "LuxHamburger",
  status: "ready",
  release: "1.0.0",
  type: "Element",
})
</script>

<style scoped>
.hamburger-box {
  --hamburger-padding-x: 15px;
  --hamburger-padding-y: 15px;
  --hamburger-layer-height: 4px;
  --hamburger-layer-width: 40px;
  --hamburger-layer-spacing: calc(var(--space-xx-small) * 1.5);
  --hamburger-layer-color: #fff;
  --hamburger-layer-border-radius: 4px;
  --hamburger-hover-opacity: 0.7;
  --hamburger-active-layer-color: var(--hamburger-layer-color);
  --hamburger-active-hover-opacity: var(--hamburger-hover-opacity);

  width: var(--hamburger-layer-width);
  height: calc(var(--hamburger-layer-height) * 2 + var(--hamburger-layer-height) * 2);
  display: inline-block;
  position: relative;
}

.hamburger {
  padding: var(--hamburger-padding-y) var(--hamburger-padding-x);
  display: inline-block;
  cursor: pointer;

  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;

  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;

  &:hover {
    opacity: var(--hamburger-hover-opacity);
  }

  &.is-active {
    &:hover {
      opacity: var(--hamburger-active-hover-opacity);
    }

    .hamburger-inner,
    .hamburger-inner::before,
    .hamburger-inner::after {
      background-color: var(--hamburger-active-layer-color);
    }
  }
}

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: calc(var(--hamburger-layer-height) / -2);

  &,
  &::before,
  &::after {
    width: var(--hamburger-layer-width);
    height: var(--hamburger-layer-height);
    background-color: var(--hamburger-layer-color);
    border-radius: var(--hamburger-layer-border-radius);
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }

  &::before,
  &::after {
    content: "";
    display: block;
  }

  &::before {
    top: calc((var(--hamburger-layer-spacing) + var(--hamburger-layer-height)) * -1);
  }

  &::after {
    bottom: calc((var(--hamburger-layer-spacing) + var(--hamburger-layer-height)) * -1);
  }
}

.hamburger-inner {
  transition-duration: 0.075s;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);

  &::before {
    transition: top 0.075s 0.12s ease, opacity 0.075s ease;
  }

  &::after {
    transition: bottom 0.075s 0.12s ease, transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
}

.is-active {
  .hamburger-inner {
    transform: rotate(45deg);
    transition-delay: 0.12s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);

    &::before {
      top: 0;
      opacity: 0;
      transition: top 0.075s ease, opacity 0.075s 0.12s ease;
    }

    &::after {
      bottom: 0;
      transform: rotate(-90deg);
      transition: bottom 0.075s ease, transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-hamburger></lux-hamburger>
  </div>
  ```
</docs>
