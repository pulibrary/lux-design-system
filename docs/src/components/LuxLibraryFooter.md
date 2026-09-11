# LuxLibraryFooter

> LibraryFooter is the preferred Footer styling/behavior for the PUL main
> website. Other sites tightly integrated with the main site may also want
> to use this footer.
> Don't forget to create a fallback for this component by providing the HTML
> rendering in _<noscript></noscript>_ tags.

## Props

| Prop name | Description                                                          | Type   | Values | Default |
| --------- | -------------------------------------------------------------------- | ------ | ------ | ------- |
| type      | The html element name used for the container                         | string | -      | "div"   |
| maxWidth  | The maximum width of the wrapper. Default is set to 1440.            | number | -      | 1440    |
| theme     | Whether the header is dark, shade, or light. Default is set to dark. | string | -      | "dark"  |

---

```jsx
<div>
  <lux-library-footer theme="dark"></lux-library-footer>
</div>
```
