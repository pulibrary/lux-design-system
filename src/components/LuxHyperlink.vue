<template>
  <a :href="href" :class="['lux-link', variation, size]">
    <slot />
  </a>
</template>

<script>
/**
 * Used to create hyperlinks as text or buttons. Can also be used on Card component
 * sub-elements to make the entire card click-able.
 */
export default {
  name: "LuxHyperlink",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  props: {
    /**
     * The href value of the link.
     */
    href: {
      type: String,
      default: "",
      required: true,
    },
    /**
     * Whether the link appears as text or as a button. Options include `button solid`
     * and `button outline`.
     */
    variation: {
      type: String,
      default: "link",
      validator: value => {
        return value.match(/(link|button)/)
      },
    },
    /**
     * Sets the size of the button `small`, `medium`, `large`
     */
    size: {
      type: String,
      default: "medium",
      validator: value => {
        return value.match(/(small|medium|large)/)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.css";
@import "../assets/styles/spacing.scss";

.lux-link {
  pointer-events: auto;
  color: --var(color-bleu-de-france-dark);
  font-family: --var(font-family-text);
  text-decoration: none;

  &:visited {
    color: --var(color-bleu-de-france-dark);
  }

  &:focus,
  &:hover {
    box-shadow: 0 2px currentColor;
  }

  &:active {
    box-shadow: 0 2px var(--color-bleu-de-france-darker);
  }

  &.button {
    line-height: var(--line-height-base);
    border: 0;
    border-radius: var(--border-radius-default);
    cursor: pointer;
    padding: 0.5rem 1rem;
    text-decoration: none;
    text-align: center;
    transition: background 250ms ease-in-out, transform 150ms ease;
    margin: 0 0.25rem;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &.solid {
      background: var(--color-bleu-de-france);
      color: var(--color-white);
      &:hover,
      &:focus {
        background: var(--color-bleu-de-france-darker);
        box-shadow: none;
      }
    }

    &.outline {
      background: transparent;
      color: --var(color-bleu-de-france-dark);
      border: 2px solid var(--color-bleu-de-france);
      &:hover,
      &:focus {
        color: var(--color-bleu-de-france-darker);
        border-color: var(--color-bleu-de-france-darker);
        box-shadow: none;
      }
    }

    &.small {
      @include inset-space(12px);
      font-size: var(--font-size-small);
    }

    &.medium {
      @include inset-space(15px);
      font-size: var(--font-size-base);
    }

    &.large {
      @include inset-space(18px);
      font-size: var(--font-size-large);
    }
  }
}
</style>

<docs>
  ```jsx
    <div>
      <lux-hyperlink href="#">Foo</lux-hyperlink>
      <lux-hyperlink href="#" variation="button solid">Bar</lux-hyperlink>
      <lux-hyperlink href="#" variation="button solid" size="large">Bar</lux-hyperlink>
      <lux-hyperlink href="#" variation="button outline">Bar</lux-hyperlink>
    </div>
  ```
</docs>
