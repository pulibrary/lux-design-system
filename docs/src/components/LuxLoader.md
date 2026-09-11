# LuxLoader

> Loaders indicate to the user that the component is waiting for some task to finish
> before updating the view.

## Props

| Prop name  | Description                                                                                                 | Type    | Values | Default  |
| ---------- | ----------------------------------------------------------------------------------------------------------- | ------- | ------ | -------- |
| size       | Sets the diameter of the circle. `x-small, small, medium, large, x-large`                                   | string  | -      | "medium" |
| fullscreen | Determines whether the loader fills the entire screen (with overlay) or the container it's in (no overlay). | boolean | -      | false    |
| wrapper    | The html element name used for the wrapper.<br/>`div, section`                                              | string  | -      | "div"    |

---

```jsx
<div>
  <lux-loader size="medium"></lux-loader>
</div>
```
