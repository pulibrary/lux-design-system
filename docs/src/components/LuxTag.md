# LuxTag

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `type` | The type of tag. The `filter` option includes a remove icon inside the tag. | `String` | `"tag"` |
| `tagItems` | Tag items are tags to be displayed to the user. You can pass a `name` and `href` in a tag-items array. | `Array` | `-` |
| `horizontal` | Sets the horizontal alignment of the item. `start`, `center`, or `end`. | `String` | `-` |
| `size` | Sets the size of the item. | `String` | `"medium"` |
| `label` | Sets the label of the list. | `String` | `""` |

## Usage

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
