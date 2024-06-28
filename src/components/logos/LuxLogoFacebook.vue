<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 25 25"
    preserveAspectRatio="xMinYMid"
    aria-labelledby="logo-facebook"
    role="img"
    fill="currentColor"
    class="lux-logo-facebook"
  >
    <title id="logo-facebook" lang="en">Facebook</title>
    <g>
      <path
        d="M18.768 7.465H14.5V5.56c0-.896.594-1.105 1.012-1.105H18.5V.513L14.171.5C10.244.5 9.5 3.438 9.5 5.32v2.144h-3v4h3v12h5v-12h3.851l.417-3.999z"
      />
      <path fill="none" d="M0 0h24v24H0z" />
    </g>
  </svg>
</template>

<script>
/**
 * Facebook logo for social media sharing purposes.
 */
export default {
  name: "LuxLogoFacebook",
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
    <lux-logo-facebook></lux-logo-facebook>
  </div>
  ```
</docs>
