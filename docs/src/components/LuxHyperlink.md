# LuxHyperlink

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `href` | The href value of the link. | `String` | `""` |
| `variation` | Whether the link appears as text or as a button. Options include `button solid` and `button outline`. | `String` | `"link"` |
| `size` | Sets the size of the button `small`, `medium`, `large` | `String` | `"medium"` |
| `newTab` | Should the link open in a new tab?  This can be disconcerting, so don't use it unless necessary. | `Boolean` | `false` |
| `underline` | Should the link have an underline? | `Boolean` | `false` |

## Usage

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
