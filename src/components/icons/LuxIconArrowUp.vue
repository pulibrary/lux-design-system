<template>
  <g>
    <path
      d="M11.6,5.1L.1,18.1c-.2.2-.2.5,0,.7s.5.2.7,0L11.9,6.2l11.2,12.6c.2.2.5.2.7,0,.2-.2.2-.5,0-.7L12.3,5.2c0-.1-.3-.2-.4-.2s-.3.1-.3.1Z"
    />
  </g>
</template>

<script>
/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. Please be aware that all elements must have closing tags (not "self-closing").
 * To add additional icons, please consult [the instructions](/#/Adding%20Icons).
 */
export default {
  name: "LuxIconArrowUp",
  status: "ready",
  release: "1.0.0",
  type: "Element",
}
</script>

<docs>
  ```jsx
    <div>
      <!-- you can pass in a smaller `width` and `height` as props -->
      <lux-icon-base width="12" height="12" icon-name="Arrow Up">
        <lux-icon-arrow-up></lux-icon-arrow-up>
      </lux-icon-base>
  
      <!-- or you can use the default, which is 18 -->
      <lux-icon-base icon-name="Arrow Right">
        <lux-icon-arrow-up></lux-icon-arrow-up>
      </lux-icon-base>
  
      <!-- or make it a little bigger too, with colors :) -->
      <lux-icon-base width="30" height="30" icon-name="Arrow up" icon-color="red">
        <lux-icon-arrow-up></lux-icon-arrow-up>
      </lux-icon-base>
    </div>
  ```
  </docs>
