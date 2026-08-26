<template>
  <path
    d="M9.725 15.2754L17.2 7.80039C17.3818 7.61706 17.5939 7.52539 17.8363 7.52539C18.0788 7.52539 18.2917 7.61706 18.475 7.80039C18.6583 7.98372 18.75 8.19689 18.75 8.43989C18.75 8.68289 18.6616 8.89281 18.4848 9.06964L10.375 17.2004C10.1932 17.3837 9.98108 17.4754 9.73875 17.4754C9.49625 17.4754 9.28333 17.3837 9.1 17.2004L5.525 13.6254C5.34167 13.4421 5.25 13.2296 5.25 12.9879C5.25 12.7462 5.34167 12.5337 5.525 12.3504C5.70833 12.1671 5.92225 12.0754 6.16675 12.0754C6.41108 12.0754 6.62217 12.1671 6.8 12.3504L9.725 15.2754Z"
    fill="#006450"
  />
</template>
<script setup>
import { defineOptions } from "vue"

defineOptions({ name: "LuxIconCheck" })
</script>
<docs>
  ```jsx
    <div>
      <!-- you can pass in a smaller `width` and `height` as props -->
      <lux-icon-base width="12" height="12" icon-name="check">
        <lux-icon-check></lux-icon-check>
      </lux-icon-base>

      <!-- or you can use the default, which is 18 -->
      <lux-icon-base icon-name="check">
         <lux-icon-check></lux-icon-check>
      </lux-icon-base>

      <!-- or make it a little bigger too, with colors :) -->
      <lux-icon-base width="30" height="30" icon-name="check" icon-color="red">
        <lux-icon-check></lux-icon-check>
      </lux-icon-base>
    </div>
  ```
</docs>
