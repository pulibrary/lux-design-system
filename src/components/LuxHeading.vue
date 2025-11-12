<template>
  <component :is="level" class="lux-heading" :class="[{ 'lux-hidden': hidden }, size]">
    <!-- @slot The text of your heading. -->
    <slot />
  </component>
</template>

<script>
/**
 * Headings are used as the titles of each major section of a page in the
 * interface. For example, templates generally use headings as their title.
 * Heading element provides an option to change the level of the heading.
 */
export default {
  name: "LuxHeading",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  props: {
    /**
     * The heading level used for the heading.
     * `h1, h2, h3, h4, h5, h6`
     */
    level: {
      type: String,
      default: "h1",
      validator: value => {
        return value.match(/(h1|h2|h3|h4|h5|h6)/)
      },
    },
    /**
     * The size of the heading.
     * `h1, h2, h3, h4, h5, h6`
     */
    size: {
      type: String,
      default: "h1",
      validator: value => {
        return value.match(/(h1|h2|h3|h4|h5|h6)/)
      },
    },
    /**
     * Whether the heading is visually hidden or not.
     * `true, false`
     */
    hidden: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
@use "/src/assets/styles/mixins.scss" as *;
@use "/src/assets/styles/spacing.scss" as *;

.lux-heading {
  @include reset;
  @include stack-space(var(--space-base));
  font-family: var(--font-family-heading);
  line-height: var(--line-height-heading);
  color: var(--color-rich-black);
}

.lux-hidden {
  @include visually-hidden;
}

.h1 {
  letter-spacing: var(--letter-spacing-x-small);
  font-weight: var(--font-weight-bold);
  @include responsive-font(3vw, 1.602em, 3.157em, 64px);
}

.h2 {
  letter-spacing: var(--letter-spacing-small);
  font-weight: var(--font-weight-bold);
  @include responsive-font(2.5vw, 1.602em, 3.157em, 42px);
}

.h3 {
  font-weight: var(--font-weight-bold);
  @include responsive-font(2vw, 1.266em, 1.777em, 36px);
}

.h4 {
  font-weight: var(--font-weight-semi-bold);
  @include responsive-font(1.5vw, 1.266em, 1.777em, 36px);
}

.h5 {
  font-weight: var(--font-weight-semi-bold);
  @include responsive-font(1vw, 1em, 1.125em, 16px);
}

.h6 {
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-regular);
}
</style>

<docs>
  ```jsx
  <div>
    <lux-heading level="h1" hidden>The quick brown fox</lux-heading>
    <lux-heading level="h2" size="h1">The quick brown fox</lux-heading>
    <lux-heading level="h3" size="h3">The quick brown fox</lux-heading>
    <lux-heading level="h4" size="h5">The quick brown fox</lux-heading>
  </div>
  ```

  ```jsx noeditor
  <div class="dos-n-donts">
    <div class="do">
      <div class="do-dont-example">
        <lux-heading level="h1">This is an h1</lux-heading>
        <lux-heading level="h2" size="h2">This is an h2</lux-heading>
      </div>
      <p>Nest headings appropriately by level. You can pick the desired font size with the size prop.</p>
    </div>

    <div class="dont">
      <div class="do-dont-example">
        <lux-heading level="h2" size="h2">This is an h2</lux-heading>
        <lux-heading level="h1">This is an h1</lux-heading>
      </div>
      <p>If you nest headings out of order or skip levels, the lack of organization of content on the page will confuse users.</p>
    </div>
  </div>
  ```

</docs>
