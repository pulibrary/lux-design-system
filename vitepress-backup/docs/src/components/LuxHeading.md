# LuxHeading

> Headings are used as the titles of each major section of a page in the
> interface. For example, templates generally use headings as their title.
> Heading element provides an option to change the level of the heading.

## Props

| Prop name | Description                                                          | Type    | Values | Default |
| --------- | -------------------------------------------------------------------- | ------- | ------ | ------- |
| level     | The heading level used for the heading.<br/>`h1, h2, h3, h4, h5, h6` | string  | -      | "h1"    |
| size      | The size of the heading.<br/>`h1, h2, h3, h4, h5, h6`                | string  | -      | "h1"    |
| hidden    | Whether the heading is visually hidden or not.<br/>`true, false`     | boolean | -      | false   |

## Slots

| Name    | Description               | Bindings |
| ------- | ------------------------- | -------- |
| default | The text of your heading. |          |

---

```jsx
<div>
  <lux-heading level="h1" hidden>
    The quick brown fox
  </lux-heading>
  <lux-heading level="h2" size="h1">
    The quick brown fox
  </lux-heading>
  <lux-heading level="h3" size="h3">
    The quick brown fox
  </lux-heading>
  <lux-heading level="h4" size="h5">
    The quick brown fox
  </lux-heading>
</div>
```

```jsx noeditor
<div class="dos-n-donts">
  <div class="do">
    <div class="do-dont-example">
      <lux-heading level="h1">This is an h1</lux-heading>
      <lux-heading level="h2" size="h2">
        This is an h2
      </lux-heading>
    </div>
    <p>
      Nest headings appropriately by level. You can pick the desired font size
      with the size prop.
    </p>
  </div>

  <div class="dont">
    <div class="do-dont-example">
      <lux-heading level="h2" size="h2">
        This is an h2
      </lux-heading>
      <lux-heading level="h1">This is an h1</lux-heading>
    </div>
    <p>
      If you nest headings out of order or skip levels, the lack of organization
      of content on the page will confuse users.
    </p>
  </div>
</div>
```
