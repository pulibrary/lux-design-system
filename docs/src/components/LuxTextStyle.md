# LuxTextStyle

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `type` | The html element name used for the text | `String` | `"p"` |
| `variation` | Style variation to give additional meaning. `default, disabled, strong, positive, negative,small,uppercase` | `String` | `"default"` |
| `color` | No description provided. | `String` | `"var(--color-rich-black)"` |

## Usage

<div>
  <lux-text-style variation="default">Design isn’t just about the look and feel. Design is how it works.</lux-text-style>
  <lux-text-style variation="disabled">Design isn’t just about the look and feel.</lux-text-style>
  <lux-text-style variation="strong">Design isn’t just about look and feel.</lux-text-style>
  <lux-text-style variation="emphasis">Design is how it works.</lux-text-style>
  <lux-text-style variation="strong" color="red">Design is how it works.</lux-text-style>
</div>
