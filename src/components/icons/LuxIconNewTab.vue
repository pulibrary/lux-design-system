<template>
  <g>
    <path
      class="cls-2"
      d="M12.5,13c.3,0,.5-.1.7-.3l5.8-6.2v2.5c0,.6.4,1,1,1s1-.4,1-1V4s0,0,0,0c0-.6-.5-1-1-1h-4.5c-.6,0-1,.4-1,1s.4,1,1,1h2.2l-5.9,6.3c-.4.4-.4,1,0,1.4.2.2.4.3.7.3h0Z"
    />
    <rect class="cls-2" x="1.4" y="5.9" width="11.2" height="2" />
    <rect class="cls-2" x="1.4" y="20.2" width="17.9" height="2" />
    <rect class="cls-2" x="17.3" y="12.1" width="2" height="8.1" />
    <rect class="cls-2" x="1.4" y="7.9" width="2" height="12.3" />
  </g>
</template>

<script>
/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. Please be aware that all elements must have closing tags (not "self-closing").
 * To add additional icons, please consult [the instructions](/#/Adding%20Icons).
 */
export default {
  name: "LuxIconNewTab",
  status: "ready",
  release: "1.0.0",
  type: "Element",
}
</script>

<docs>
  ```jsx
  <div>
    <!-- you can pass in a smaller `width` and `height` as props -->
    <lux-icon-base width="12" height="12" icon-name="Add Item">
      <lux-icon-new-tab></lux-icon-new-tab>
    </lux-icon-base>

    <!-- or you can use the default, which is 18 -->
    <lux-icon-base icon-name="Add Item">
      <lux-icon-new-tab></lux-icon-new-tab>
    </lux-icon-base>

    <!-- or make it a little bigger too, with colors :) -->
    <lux-icon-base width="30" height="30" icon-name="Add Item" icon-color="red">
      <lux-icon-new-tab></lux-icon-new-tab>
    </lux-icon-base>
  </div>
  ```
</docs>
