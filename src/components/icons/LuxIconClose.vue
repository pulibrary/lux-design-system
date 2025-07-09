<template>
  <path
    stroke="currentColor"
    stroke-width="3.3"
    stroke-linecap="round"
    d="M2 2
  L22 22
  M22 2
  L2 22"
  />
</template>

<script>
/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. Please be aware that all elements must have closing tags (not "self-closing").
 * To add additional icons, please consult [the instructions](/#/Adding%20Icons).
 */
export default {
  name: "LuxIconClose",
  status: "ready",
  release: "1.0.0",
  type: "Element",
}
</script>

<docs>
  ```jsx
  <div>
    <!-- you can pass in a smaller `width` and `height` as props -->
    <lux-icon-base width="12" height="12" icon-name="close" >
      <lux-icon-close></lux-icon-close>
    </lux-icon-base>

    <!-- or you can use the default, which is 18 -->
    <lux-icon-base icon-name="close">
      <lux-icon-close></lux-icon-close>
    </lux-icon-base>

    <!-- or make it a little bigger too, with colors :) -->
    <lux-icon-base width="30" height="30" icon-name="close" icon-color="red">
      <lux-icon-close></lux-icon-close>
    </lux-icon-base>

    <!-- or in a circle -->
    <lux-icon-base width="30" height="30" icon-name="close" icon-color="white" circle-color="purple">
      <lux-icon-close></lux-icon-close>
    </lux-icon-base>
  </div>
  ```
</docs>
