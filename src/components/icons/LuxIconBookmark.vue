<template>
  <path
    d="M6 3
  Q5 3 5 4
  L5 20
  Q5 21 6 20
  L11 16
  Q12 15 13 16
  L18 20
  Q19 21 19 19
  L19 4
  Q19 3 18 3
  Z
  "
    :stroke="lineColor"
    :stroke-width="1.5"
  />
</template>

<script>
/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. Please be aware that all elements must have closing tags (not "self-closing").
 * To add additional icons, please consult [the instructions](/#/Adding%20Icons).
 */
export default {
  name: "LuxIconBookmark",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  props: {
    /**
     * The outline/stroke color for the bookmark icon.  If not specified,
     * it will use the iconColor of the parent LuxIconBase component.
     */
    lineColor: {
      required: false,
      type: String,
      default: "currentColor",
    },
  },
}
</script>

<docs>
  ```jsx
  <div>
    <!-- you can pass in a smaller `width` and `height` as props -->
    <lux-icon-base width="12" height="12" icon-name="bookmark" >
      <lux-icon-bookmark></lux-icon-bookmark>
    </lux-icon-base>

    <!-- or you can use the default, which is 18 -->
    <lux-icon-base icon-name="bookmark">
      <lux-icon-bookmark></lux-icon-bookmark>
    </lux-icon-base>

    <!-- you can make the stroke color different from the fill color as well -->
    <lux-icon-base width="30" height="30" icon-name="bookmark" icon-color="#F5A9B8">
      <lux-icon-bookmark line-color="#5BCEFA"></lux-icon-bookmark>
    </lux-icon-base>

    <!-- or put it in a circle! -->
    <lux-icon-base width="30" height="30" icon-name="bookmark" icon-color="#FCF434" circle-color="#9C59D1">
      <lux-icon-bookmark line-color="black"></lux-icon-bookmark>
    </lux-icon-base>
  </div>
  ```
</docs>
