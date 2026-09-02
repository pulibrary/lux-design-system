# LuxGridContainer

> Used to build the container of GridItems.

## Props

| Prop name  | Description                                                                                                                                                             | Type   | Values | Default |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------- |
| type       | The html element name used for the grid container.                                                                                                                      | string | -      | "div"   |
| horizontal | Determines how the flexbox container is horizontally aligned. This value defaults to<br/>having space between grid items. Options include `start`, `center`, and `end`. | string | -      | ""      |

## Slots

| Name    | Description                                      | Bindings |
| ------- | ------------------------------------------------ | -------- |
| default | The grid items that live in your grid container. |          |

---

```jsx
<div>
  <lux-grid-container>
    Grid container can be used to contain grid items together.
  </lux-grid-container>
</div>
```
