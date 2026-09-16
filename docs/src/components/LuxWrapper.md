# LuxWrapper

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `type` | The html element name used for the wrapper. | `String` | `"div"` |
| `maxWidth` | The maximum width of the wrapper. Default is set to 1440. | `[String, Number]` | `1440` |
| `fullWidth` | Determines whether the wrapper takes up 100% of the parent container. | `[String, Boolean]` | `false` |
| `horizontal` | Determines how the flexbox wrapper is horizontally aligned. This value defaults to having space between grid items. Options include `start`, `center`, and `end`. | `String` | `""` |

## Usage

```jsx
    <div>
      <lux-wrapper>Wrapper can be used to wrap any components together.</lux-wrapper>
      <lux-wrapper :max-width="1400">Wrapper can be used to wrap any components together.</lux-wrapper>
    </div>
  ```
