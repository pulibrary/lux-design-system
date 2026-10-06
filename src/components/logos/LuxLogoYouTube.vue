<template>
  <!-- Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com
    License - https://fontawesome.com/license/free
    Copyright 2026 Fonticons, Inc. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 640 640"
    preserveAspectRatio="xMinYMid"
    aria-labelledby="logo-you-tube"
    role="img"
    fill="currentColor"
    class="lux-logo-you-tube"
  >
    <title id="logo-you-tube" lang="en">PUL YouTube</title>
    <g>
      <path
        d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z"
      />
      <path fill="none" d="M0 0h24v24H0z" />
    </g>
  </svg>
</template>

<script setup>
/**
 * YouTube logo for social media sharing purposes.
 */
defineOptions({
  name: "LuxLogoYouTube",
  status: "ready",
  release: "7.14.1",
  type: "Element",
})
defineProps({
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
})
</script>

<style lang="scss" scoped></style>

<docs>
  ```jsx
  <div>
    <lux-logo-you-tube></lux-logo-you-tube>
  </div>
  ```
</docs>
