# LuxIconBookmark

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `lineColor` | The outline/stroke color for the bookmark icon.  If not specified, it will use the iconColor of the parent LuxIconBase component. | `String` | `"currentColor"` |

## Usage

```jsx
  <div>
    <!-- you can pass in a smaller `width` and `height` as props -->
    <lux-icon-base width="12" height="12" icon-name="bookmark" >
      <lux-icon-bookmark></lux-icon-bookmark>
    </lux-icon-base>

    <!-- or you can use the default, which is 18 -->
    <lux-icon-base icon-name="bookmark">
      <lux-icon-bookmark></lux-icon-bookmark>
    </lux-icon-base>

    <!-- you can make the stroke color different from the fill color as well -->
    <lux-icon-base width="30" height="30" icon-name="bookmark" icon-color="#F5A9B8">
      <lux-icon-bookmark line-color="#5BCEFA"></lux-icon-bookmark>
    </lux-icon-base>

    <!-- or put it in a circle! -->
    <lux-icon-base width="30" height="30" icon-name="bookmark" icon-color="#FCF434" circle-color="#9C59D1">
      <lux-icon-bookmark line-color="black"></lux-icon-bookmark>
    </lux-icon-base>
  </div>
  ```
