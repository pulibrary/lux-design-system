# LuxWrapper

> Used to build the outer wrapper of a page, including the page title and
> associated actions. Wrapper can be span the full width of the viewport or limited to a max-width of 1440px.

## Props

| Prop name  | Description                                                                                                                                                           | Type            | Values | Default |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------ | ------- |
| type       | The html element name used for the wrapper.                                                                                                                           | string          | -      | "div"   |
| maxWidth   | The maximum width of the wrapper. Default is set to 1440.                                                                                                             | string\|number  | -      | 1440    |
| fullWidth  | Determines whether the wrapper takes up 100% of the parent container.                                                                                                 | string\|boolean | -      | false   |
| horizontal | Determines how the flexbox wrapper is horizontally aligned. This value defaults to<br/>having space between grid items. Options include `start`, `center`, and `end`. | string          | -      | ""      |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

```jsx
    <div>
      <lux-wrapper>Wrapper can be used to wrap any components together.</lux-wrapper>
      <lux-wrapper :max-width="1400">Wrapper can be used to wrap any components together.</lux-wrapper>
    </div>
```
