<template>
  <g>
    <circle class="st0" cx="12" cy="12" r="2" />
    <polygon class="st1" points="17.5,6.5 12,0.5 6.5,6.5 	" />
    <polygon class="st1" points="6.5,17.5 12,23.5 17.5,17.5 	" />
  </g>
</template>

<script>
/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. Please be aware that all elements must have closing tags (not "self-closing").
 * To add additional icons, please consult [the instructions](/#/Adding%20Icons).
 */
export default {
  name: "LuxIconUnsorted",
  status: "ready",
  release: "1.0.0",
  type: "Element",
}
</script>

<style scoped>
.st0 {
  fill: currentColor;
  stroke: currentColor;
  stroke-miterlimit: 10;
}
.st1 {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}
</style>

<docs>
  ```jsx
    <div>
      <!-- you can pass in a smaller `width` and `height` as props -->
      <lux-icon-base width="16" height="16" icon-name="Add Item">
        <lux-icon-unsorted></lux-icon-unsorted>
      </lux-icon-base>
  
      <!-- or you can use the default, which is 18 -->
      <lux-icon-base icon-name="Add Item">
        <lux-icon-unsorted></lux-icon-unsorted>
      </lux-icon-base>
  
      <!-- or make it a little bigger too, with colors :) -->
      <lux-icon-base width="30" height="30" icon-name="Add Item" icon-color="red">
        <lux-icon-unsorted></lux-icon-unsorted>
      </lux-icon-base>
    </div>
  ```
</docs>
