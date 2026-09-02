# LuxHyperlink

> Used to create hyperlinks as text or buttons. Can also be used on Card component
> sub-elements to make the entire card click-able.

## Props

| Prop name | Description                                                                                               | Type    | Values | Default  |
| --------- | --------------------------------------------------------------------------------------------------------- | ------- | ------ | -------- |
| href      | The href value of the link.                                                                               | string  | -      | ""       |
| variation | Whether the link appears as text or as a button. Options include `button solid`<br/>and `button outline`. | string  | -      | "link"   |
| size      | Sets the size of the button `small`, `medium`, `large`                                                    | string  | -      | "medium" |
| newTab    | Should the link open in a new tab? This can be<br/>disconcerting, so don't use it unless necessary.       | boolean | -      | false    |
| underline | Should the link have an underline?                                                                        | boolean | -      | false    |

## Slots

| Name    | Description                 | Bindings |
| ------- | --------------------------- | -------- |
| default | The text of your hyperlink. |          |

---

```jsx
    <div>
      <lux-hyperlink href="#">Foo</lux-hyperlink>
      <lux-hyperlink href="#" variation="button solid">Bar</lux-hyperlink>
      <lux-hyperlink href="#" variation="button solid" size="large">Bar</lux-hyperlink>
      <lux-hyperlink href="#" variation="button outline">Bar</lux-hyperlink>
      <lux-hyperlink href="#" :newTab="true">I open in a new tab</lux-hyperlink>
      <lux-hyperlink href="#" :underline="true">
        I am underlined and have an arrow
        <lux-icon-base width="14" height="14">
          <lux-icon-arrow-right></lux-icon-arrow-right>
        </lux-icon-base>
      </lux-hyperlink>
    </div>
```
