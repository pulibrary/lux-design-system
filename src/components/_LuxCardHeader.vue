<template>
  <component :is="type" class="lux-card-header">
    <slot></slot>
  </component>
</template>

<script>
/**
 * Used to establish a section of a card for the primary title of the card.
 */
export default {
  name: "LuxCardHeader",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  props: {
    /**
     * The html element name used for the wrapper.
     */
    type: {
      type: String,
      default: "div",
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/spacing.scss";
.lux-heading {
  margin-bottom: 0;
}

.lux-card-header {
  padding: $space-small;

  @media #{$media-query-large} {
    padding: $space-base;
  }

  .lux-heading + .lux-text-style {
    padding-top: $space-xx-small;
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-card-header>
      <lux-heading level="h2" size="h3">Title</lux-heading>
      <lux-text-style>Secondary title</lux-text-style>
    </lux-card-header>
  </div>
  ```
</docs>
