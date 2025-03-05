<template>
  <ul class="lux-tag" :class="[type, horizontal]" :aria-label="label">
    <li v-for="(item, index) in tagItems" v-bind:key="item">
      <component
        :is="componentType(item)"
        :key="index"
        :href="item.href"
        :class="['lux-tag-item', size, item.color, { pill: isPill(item.style) }]"
      >
        <span v-if="item.icon" class="prepend-icon">
          <lux-icon-base width="14" height="14">
            <lux-icon-alert v-if="item.icon === 'alert'"></lux-icon-alert>
            <lux-icon-approved v-if="item.icon === 'approved'"></lux-icon-approved>
            <lux-icon-denied v-if="item.icon === 'denied'"></lux-icon-denied>
            <lux-icon-clock v-if="item.icon === 'clock'"></lux-icon-clock>
            <lux-icon-refresh v-if="item.icon === 'refresh'"></lux-icon-refresh>
            <lux-icon-reported v-if="item.icon === 'reported'"></lux-icon-reported>
          </lux-icon-base>
        </span>
        <span v-html="item.name"></span>
        <span v-if="type === 'filter'" class="append-icon">
          <lux-icon-base width="14" height="14">
            <lux-icon-denied></lux-icon-denied>
          </lux-icon-base>
        </span>
      </component>
    </li>
  </ul>
</template>

<script>
/**
 * Tags are compact elements used for items that need to be labeled or categorized
 * using keywords that describe them. Tags are also used to represent applied filters.
 *
 * Multiple or single tags can be used to categorize items.
 */
export default {
  name: "LuxTag",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  props: {
    /**
     * The type of tag. The `filter` option includes
     * a remove icon inside the tag.
     */
    type: {
      type: String,
      default: "tag",
      validator: value => {
        return value.match(/(tag|filter)/)
      },
    },
    /**
     * Tag items are tags to be displayed to the user.
     * You can pass a `name` and `href` in a tag-items array.
     */
    tagItems: {
      required: true,
      type: Array,
    },
    /**
     * Sets the horizontal alignment of the item. `start`, `center`, or `end`.
     */
    horizontal: {
      type: String,
      validator: value => {
        return value.match(/(start|center|end)/)
      },
    },
    /**
     * Sets the size of the item.
     */
    size: {
      type: String,
      default: "medium",
      validator: value => {
        return value.match(/(small|medium|large)/)
      },
    },
    /**
     * Sets the label of the list.
     */
    label: {
      type: String,
      default: "",
    },
  },
  methods: {
    isPill(pill) {
      return pill === "pill" ? true : false
    },
    componentType(item) {
      if (item.hasOwnProperty("href")) {
        return "a"
      } else {
        return "span"
      }
    },
  },
}
</script>

<style lang="scss">
@use "sass:color";
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/system.scss" as *;
@use "/src/assets/styles/variables.css" as *;

.lux-tag {
  @include stack-space($space-base);
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

  .lux-tag-item,
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

  .lux-tag-item.small {
    @include inset-space(11px);
    font-size: var(--font-size-small);
  }

  .lux-tag-item.large {
    @include inset-space(27px);
    font-size: var(--font-size-large);
  }

  .lux-tag-item.green {
    background: color.adjust($color-green, $lightness: 30%);
    color: color.adjust($color-green, $lightness: -20%);
    border-color: transparent;
  }

  a:hover.green,
  a:focus.green {
    color: color.adjust($color-green, $lightness: -20%);
    border-color: color.adjust($color-green, $lightness: -15%);
  }

  .lux-tag-item.red {
    background: color.adjust($color-red, $lightness: 45%);
    color: color.adjust($color-red, $lightness: -25%);
    border-color: transparent;
  }

  a:hover.red,
  a:focus.red {
    color: color.adjust($color-red, $lightness: -25%);
    border-color: color.adjust($color-red, $lightness: -10%);
  }

  .lux-tag-item.yellow {
    background: color.adjust($color-yellow, $lightness: 35%);
    color: color.adjust($color-yellow, $lightness: -30%);
    border-color: transparent;
  }

  a:hover.yellow,
  a:focus.yellow {
    color: color.adjust($color-yellow, $lightness: -30%);
    border-color: color.adjust($color-yellow, $lightness: -10%);
  }

  .lux-tag-item.blue {
    background: color.adjust($color-bleu-de-france-dark, $lightness: 30%);
    color: color.adjust($color-bleu-de-france-dark, $lightness: -25%);
    border-color: transparent;
  }

  .lux-tag-item.pill {
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
      <lux-tag type="tag" :tag-items="[
        {name: 'Cats', href: '/tags/cats', color: 'red', icon: 'denied', style: 'pill'},
        {name: 'Cats', href: '/tags/cats', color: 'yellow', icon: 'alert'},
        {name: 'Cats', href: '/tags/cats', color: 'green', icon: 'approved'},
        {name: 'Cats', href: '/tags/cats', color: 'blue'},
        {name: 'Cats', color: 'blue'}
        ]"
        horizontal="end"/>
  
       <lux-tag type="filter" label="filtered by" :tag-items="[
        {name: 'Cats', href: '/tags/cats'},
        {name: 'Dogs', href: '/tags/dogs'}
        ]"/>
    </div>
```
</docs>
