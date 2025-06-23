<template>
  <div class="lux-icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :color="iconColor"
      viewBox="0 0 24 24"
      overflow="visible"
      :aria-labelledby="iconTitleId"
      :aria-hidden="iconHide"
      role="img"
    >
      <title v-if="iconName" :id="iconTitleId" lang="en">{{ iconName }}</title>
      <circle v-if="circleColor" cx="50%" cy="50%" r="11.8" :fill="circleColor" />
      <g v-if="circleColor" :fill="iconColor" transform="translate(3.6, 3.6) scale(0.7)">
        <slot></slot>
      </g>
      <g v-else :fill="iconColor">
        <slot></slot>
      </g>
    </svg>
  </div>
</template>

<script>
/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. Please be aware that all elements must have closing tags (not "self-closing").
 * To add additional icons, please consult [the instructions](/#/Adding%20Icons).
 */
export default {
  name: "LuxIconBase",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  props: {
    /**
     * The name of the icon to display. Also used as the accessible name of the icon.
     */
    iconName: {
      required: false,
      type: String,
      default: "",
    },
    /**
     * The width of the icon. For square icons use values of `11px, 13px,
     * 16px, 24px, 36px, 48px, 64px` to follow visual heirachy set by
     * typography.
     */
    width: {
      type: [Number, String],
      default: 24,
    },
    /**
     * The height of the icon. For square icons use values of `11px, 13px,
     * 16px, 24px, 36px, 48px, 64px` to follow visual heirachy set by
     * typography.
     */
    height: {
      type: [Number, String],
      default: 24,
    },
    /**
     * The fill color of the SVG icon.
     */
    iconColor: {
      type: String,
      default: "currentColor",
    },
    /**
     * If set, put the SVG icon in a circle with the specified color.
     */
    circleColor: {
      type: String,
    },
    /**
     * Hides decorative icon from screen readers
     */
    iconHide: {
      type: [String, Boolean],
      default: false,
    },
  },
  computed: {
    // Present the iconName prop in a format suitable for use as an element's ID.
    // Only ASCII letters, digits, '_', and '-' should be used in an id, per
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id
    iconTitleId() {
      return this.iconName
        .toLowerCase()
        .replace(/[^\w\d\s-_]/g, "")
        .trim()
        .replace(/\s/g, "-")
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.css";
.lux-icon {
  display: inline-flex;
  align-self: center;
  margin: 0 var(--space-xx-small);

  svg {
    top: 0.125em;
    position: relative;
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-icon-base width="30" height="30" icon-name="file">
      <lux-icon-file></lux-icon-file>
    </lux-icon-base>
    <!-- You can also surround the icon in a circle of the color you choose -->
    <lux-icon-base width="40" height="40" icon-name="person" icon-color="white" circle-color="var(--color-rich-black)">
      <lux-icon-person></lux-icon-person>
    </lux-icon-base>
  </div>
  ```
</docs>
