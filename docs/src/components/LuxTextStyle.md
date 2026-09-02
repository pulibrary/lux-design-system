# LuxTextStyle

> Text style enhances text with additional visual meaning. For example, using
> disabled text to de-emphasize it from its surrounding text. Don’t use text
> styles only for aesthetic effect.

## Props

| Prop name | Description                                                                                                     | Type   | Values | Default                   |
| --------- | --------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------------------------- |
| type      | The html element name used for the text                                                                         | string | -      | "p"                       |
| variation | Style variation to give additional meaning.<br/>`default, disabled, strong, positive, negative,small,uppercase` | string | -      | "default"                 |
| color     |                                                                                                                 | string | -      | "var(--color-rich-black)" |

## Slots

| Name    | Description                  | Bindings |
| ------- | ---------------------------- | -------- |
| default | The text you'd like to style |          |

---

```
  <div>
    <lux-text-style variation="default">Design isn’t just about the look and feel. Design is how it works.</lux-text-style>
    <lux-text-style variation="disabled">Design isn’t just about the look and feel.</lux-text-style>
    <lux-text-style variation="strong">Design isn’t just about look and feel.</lux-text-style>
    <lux-text-style variation="emphasis">Design is how it works.</lux-text-style>
    <lux-text-style variation="strong" color="red">Design is how it works.</lux-text-style>
  </div>
```
