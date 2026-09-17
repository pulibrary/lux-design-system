# LuxCopyToClipboard

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `clipboardValue` | the value to be copied to the clipboard. It can be a string or a number. | `String` | `-` |
| `tooltipText` | No description provided. | `String` | `"Copy"` |
| `copiedTooltipText` | No description provided. | `String` | `"Copied"` |

## Usage

<div>
  <!-- Copy to clipboard -->
  <div style="display: flex; align-items: center; gap: 0.5rem;">
  <div>example to be copied</div>
  <lux-copy-to-clipboard id="example-clip" clipboard-value="example to be copied"> </lux-copy-to-clipboard>
  </div>
  <p> You can change the tooltip text by passing in the props <code>tooltip-text</code> and <code>copied-tooltip-text</code></p>
  <!-- Copy to clipboard -->
  <div style="display: flex; align-items: center; gap: 0.5rem;">
  <div>example to be copied</div>
  <lux-copy-to-clipboard id="example-clip" clipboard-value="example to be copied" tooltip-text="Copy example" copied-tooltip-text="Copied example"> </lux-copy-to-clipboard>
  </div>
</div>
