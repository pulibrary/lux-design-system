# LuxIconBase

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `iconName` | The name of the icon to display. Also used as the accessible name of the icon. | `String` | `""` |
| `width` | The width of the icon. For square icons use values of `11px, 13px, 16px, 24px, 36px, 48px, 64px` to follow visual heirachy set by typography. | `[Number, String]` | `24` |
| `height` | The height of the icon. For square icons use values of `11px, 13px, 16px, 24px, 36px, 48px, 64px` to follow visual heirachy set by typography. | `[Number, String]` | `24` |
| `iconColor` | The fill color of the SVG icon. | `String` | `"currentColor"` |
| `circleColor` | If set, put the SVG icon in a circle with the specified color. | `String` | `-` |
| `iconHide` | Hides decorative icon from screen readers | `[String, Boolean]` | `false` |

## Usage

```jsx
  <div>
    <lux-icon-base width="30" height="30" icon-name="file">
      <lux-icon-file></lux-icon-file>
    </lux-icon-base>
    <!-- You can also surround the icon in a circle of the color you choose -->
    <lux-icon-base width="40" height="40" icon-name="person" icon-color="white" circle-color="var(--color-rich-black)">
      <lux-icon-person></lux-icon-person>
    </lux-icon-base>
  </div>
  ```
