<template>
  <div class="tabs-container">
    <!-- Dynamic Tab Headers -->
    <div class="tab-list">
      <button
        v-for="i in props.count"
        :key="i"
        :class="{ active: activeTab === i }"
        @click="activeTab = i"
      >
        Tab {{ i }}
      </button>
    </div>

    <!-- Dynamic Tab Contents -->
    <div class="tab-content">
      <div v-for="i in props.count" :key="i" v-show="activeTab === i">
        <!-- Named slots allow custom HTML inside each tab body -->
        <slot :name="`tab-${i}`">
          <h3>Default Header {{ i }}</h3>
          <p>This is the default content for tab {{ i }}.</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
/**

 */

import { inject, onMounted } from "vue"
const registerTab = inject("registerTab")

registerTab?.(props.title)

defineOptions({
  name: "LuxTab",
  status: "ready",
  release: "1.0.0",
  type: "Element",
})
defineProps({
  /**
   * The type of tag. The `filter` option includes
   * a remove icon inside the tag.
   */
  title: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss">
@use "sass:color";
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/system.scss" as *;

.lux-tab {
  font-family: var(--font-family-heading);
  line-height: var(--line-height-heading);
  color: var(--color-rich-black);

  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  list-style: none;

  &.end {
    justify-content: flex-end;
  }

  &.center {
    justify-content: center;
  }

  li {
    &:first-child {
      margin-left: 0;
    }
  }

  .lux-tab-item,
  a:visited {
    @include inset-space($space-small);
    font-size: var(--font-size-base);
    font-weight: 400;
    line-height: 1rem;
    letter-spacing: 0.32px;
    display: inline-flex;
    align-items: flex-start;
    margin: 0.25rem;
    border-radius: var(--border-radius-default);
    border: 1px solid tint($color-rich-black, 80%);
    text-decoration: none;
    color: tint($color-rich-black, 20%);
    background: var(--color-white);

    .prepend-icon,
    .append-icon {
      line-height: 16px;
    }
  }

  .lux-tab-item.small {
    @include inset-space(11px);
    font-size: var(--font-size-small);
  }

  .lux-tab-item.large {
    @include inset-space(27px);
    font-size: var(--font-size-large);
  }

  .lux-tab-item.green {
    background: color.adjust($color-green, $lightness: 30%);
    color: color.adjust($color-green, $lightness: -20%);
    border-color: transparent;
  }

  a:hover.green,
  a:focus.green {
    color: color.adjust($color-green, $lightness: -20%);
    border-color: color.adjust($color-green, $lightness: -15%);
  }

  .lux-tab-item.red {
    background: color.adjust($color-red, $lightness: 45%);
    color: color.adjust($color-red, $lightness: -25%);
    border-color: transparent;
  }

  a:hover.red,
  a:focus.red {
    color: color.adjust($color-red, $lightness: -25%);
    border-color: color.adjust($color-red, $lightness: -10%);
  }

  .lux-tab-item.yellow {
    background: color.adjust($color-yellow, $lightness: 35%);
    color: color.adjust($color-yellow, $lightness: -30%);
    border-color: transparent;
  }

  a:hover.yellow,
  a:focus.yellow {
    color: color.adjust($color-yellow, $lightness: -30%);
    border-color: color.adjust($color-yellow, $lightness: -10%);
  }

  .lux-tab-item.blue {
    background: color.adjust($color-bleu-de-france-dark, $lightness: 30%);
    color: color.adjust($color-bleu-de-france-dark, $lightness: -25%);
    border-color: transparent;
  }

  .lux-tab-item.pill {
    border-radius: var(--border-radius-pill);
    font-weight: 400;
  }

  a:hover.blue,
  a:focus.blue {
    color: color.adjust($color-bleu-de-france-dark, $lightness: -25%);
    border-color: color.adjust($color-bleu-de-france-dark, $lightness: -10%);
  }

  span {
    vertical-align: middle;
  }

  .append-icon .lux-icon {
    margin: 0 0 0 6px;
  }

  .prepend-icon .lux-icon {
    margin: 0 4px 0 0;
  }
}

.tag {
  .prepend-icon {
    padding-right: 2px;
  }

  a:hover,
  a:focus {
    border-color: var(--color-bleu-de-france-dark);
    color: var(--color-bleu-de-france-dark);
  }
}

.filter {
  .append-icon {
    padding-left: 2px;
  }

  a:hover,
  a:focus {
    color: var(--color-white);
    background: var(--color-red);
    border-color: var(--color-red);
  }
}
</style>

<docs>
```jsx
    <div>
      <lux-tab :count="4" />
    </div>
```
</docs>
