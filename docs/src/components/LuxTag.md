# LuxTag

> Tags are compact elements used for items that need to be labeled or categorized
> using keywords that describe them. Tags are also used to represent applied filters.

Multiple or single tags can be used to categorize items.

## Props

| Prop name  | Description                                                                                                | Type   | Values | Default  |
| ---------- | ---------------------------------------------------------------------------------------------------------- | ------ | ------ | -------- |
| type       | The type of tag. The `filter` option includes<br/>a remove icon inside the tag.                            | string | -      | "tag"    |
| tagItems   | Tag items are tags to be displayed to the user.<br/>You can pass a `name` and `href` in a tag-items array. | array  | -      |          |
| horizontal | Sets the horizontal alignment of the item. `start`, `center`, or `end`.                                    | string | -      |          |
| size       | Sets the size of the item.                                                                                 | string | -      | "medium" |
| label      | Sets the label of the list.                                                                                | string | -      | ""       |

---

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
