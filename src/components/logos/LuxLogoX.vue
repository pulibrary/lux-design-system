<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 18 18"
    preserveAspectRatio="xMinYMid"
    aria-labelledby="logo-x"
    role="img"
    fill="currentColor"
    class="lux-logo-x"
  >
    <title id="logo-x" lang="en">X</title>
    <g>
      <path
        d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"
      />
    </g>
  </svg>
</template>

<script>
/**
 * X logo for social media sharing purposes.
 */
export default {
  name: "LuxLogoX",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  props: {
    /**
     * The width of the logo.
     */
    width: {
      type: [Number, String],
      default: 24,
    },
    /**
     * The height of the logo.
     */
    height: {
      type: [Number, String],
      default: 24,
    },
  },
}
</script>

<style lang="scss" scoped></style>

<docs>
  ```jsx
  <div>
    <lux-logo-x></lux-logo-x>
  </div>
  ```
</docs>
