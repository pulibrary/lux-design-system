<template>
  <component :is="type" class="lux-search-box">
    <!-- @slot The input and its button. -->
    <slot>
      <lux-input-text
        id="searchbox"
        name="query"
        label="Search"
        :hide-label="true"
        placeholder="Search for library materials and website content"
        size="large"
        class="default-input"
      ></lux-input-text>
      <lux-input-button
        type="button"
        variation="icon"
        size="medium"
        icon="search"
        class="default-button"
      ></lux-input-button>
    </slot>
  </component>
</template>

<script>
/**
 * The SearchBox is a wrapper for an input group consisting of an
 * InputText and InputButton.
 */
export default {
  name: "LuxSearchBox",
  status: "ready",
  release: "1.0.0",
  type: "Pattern",
  props: {
    /**
     * The html element name used for the container
     */
    type: {
      type: String,
      default: "div",
    },
  },
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/system.scss" as *;
@use "/src/assets/styles/mixins.scss" as *;

.lux-search-box {
  @include box-shadow-inputs;
  box-sizing: border-box;
  display: flex;
  background: $color-white;
  margin-bottom: 1rem;
  border: 2px solid #212529;

  &:hover,
  &[hover] {
    @include box-shadow-inputs-hover;
  }

  :deep(.lux-input-field) {
    border: 0;
    box-shadow: initial;
    width: 100%;

    &:hover,
    &[hover] {
      box-shadow: initial;
    }
  }

  :deep(.lux-input) {
    flex: 1;
    margin-bottom: 0;
    font-size: small !important;
    height: 3rem;

    input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  :deep(.default-button) {
    background-color: $color-princeton-orange-on-white;
    border-radius: 0px !important;
    padding: 12px 15px;
  }

  :deep(.lux-button) {
    margin: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &.lux-icon {
      background: var(--color-white);
      padding: 2px;
    }
  }
}
</style>

<docs>
```jsx
    <div>
    <lux-search-box>
        <lux-input-text id="foo" name="value" label="Search" :hide-label="true" placeholder="Find all the things" size="large"></lux-input-text>
        <lux-input-button type="button" variation="icon" size="medium" icon="search"></lux-input-button>
    </lux-search-box>
    </div>

    <div>
      <lux-search-box>
      </lux-search-box>
    </div>
```
  </docs>
