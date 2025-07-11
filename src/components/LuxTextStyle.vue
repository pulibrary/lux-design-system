<template>
  <component :is="type" :class="['lux-text-style ', variation, color]">
    <!-- @slot The text you'd like to style -->
    <slot />
  </component>
</template>

<script>
/**
 * Text style enhances text with additional visual meaning. For example, using
 * disabled text to de-emphasize it from its surrounding text. Don’t use text
 * styles only for aesthetic effect.
 */
export default {
  name: "LuxTextStyle",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  props: {
    /**
     * The html element name used for the text
     */
    type: {
      type: String,
      default: "p",
    },
    /**
     * Style variation to give additional meaning.
     * `default, disabled, strong, positive, negative,small,uppercase`
     */
    variation: {
      type: String,
      default: "default",
      validator: value => {
        return value.match(/(default|disabled|strong|emphasis|positive|negative|small|uppercase)/)
      },
    },
    color: {
      type: String,
      default: "var(--color-rich-black)",
      validator: value => {
        return value.match(/(grey-dark|red|green|blue)/)
      },
    },
  },
}
</script>

<style lang="scss">
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/variables.css" as *;
@use "/src/assets/styles/system.scss" as *;
$positive-text: #7cb518;

.lux-text-style {
  @include reset;
  @include stack-space($space-small);
  color: var(--color-rich-black);
  font-family: var(--font-family-text);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  @media (min-width: 900px) {
    // This is how you’d use design tokens with media queries
  }
  &.disabled {
    color: tint($color-rich-black, 40%);
    text-decoration: line-through;
  }
  &.strong {
    font-weight: var(--font-weight-semi-bold);
  }
  &.emphasis {
    font-style: italic;
  }
  &.positive {
    color: shade($positive-text, 20%);
  }
  &.negative {
    color: var(--color-red);
  }
  &.small {
    font-size: var(--font-size-x-small);
  }
  &.uppercase {
    text-transform: uppercase;
  }
  &.blue {
    color: var(--very-dark-blue);
  }
  &.red {
    color: var(--color-brick-red);
  }
  &.green {
    color: var(--color-green);
  }
  &.grey-dark {
    color: var(--color-grey-dark);
  }
}
</style>

<docs>
  ```
  <div>
    <lux-text-style variation="default">Design isn’t just about the look and feel. Design is how it works.</lux-text-style>
    <lux-text-style variation="disabled">Design isn’t just about the look and feel.</lux-text-style>
    <lux-text-style variation="strong">Design isn’t just about look and feel.</lux-text-style>
    <lux-text-style variation="emphasis">Design is how it works.</lux-text-style>
    <lux-text-style variation="strong" color="red">Design is how it works.</lux-text-style>
  </div>
  ```
</docs>
