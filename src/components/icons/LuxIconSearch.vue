<template>
  <path
    class="lux-search-icon"
    d="M9.58,16.8c1.65,0,3.25-.57,4.5-1.59l6.14,6.14c.3.32.83.33,1.13.02.32-.31.32-.83.02-1.14,0,0-6.16-6.16-6.16-6.16C19.84,8.26,13.64.15,6.79,2.98-.39,6.12,1.74,16.7,9.58,16.8ZM9.58,4.01c3.92-.07,6.78,4.2,5.16,7.77-1.86,4.54-8.47,4.54-10.32,0-1.62-3.57,1.24-7.84,5.16-7.77Z"
  />
</template>

<script>
/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. Please be aware that all elements must have closing tags (not "self-closing").
 * To add additional icons, please consult [the instructions](/#/Adding%20Icons).
 */
export default {
  name: "LuxIconSearch",
  status: "ready",
  release: "1.0.0",
  type: "Element",
}
</script>

<docs>
  ```jsx
    <div>
      <!-- you can pass in a smaller `width` and `height` as props -->
      <lux-icon-base width="12" height="12" icon-name="search">
        <lux-icon-search></lux-icon-search>
      </lux-icon-base>
  
      <!-- or you can use the default, which is 18 -->
      <lux-icon-base icon-name="search">
        <lux-icon-search></lux-icon-search>
      </lux-icon-base>
  
      <!-- or make it a little bigger too, with colors :) -->
      <lux-icon-base width="30" height="30" icon-name="search" icon-color="red">
        <lux-icon-search></lux-icon-search>
      </lux-icon-base>
    </div>
  ```
</docs>
