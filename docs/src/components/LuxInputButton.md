# LuxInputButton

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `variation` | The button's variations `solid, outline, text, dropdown, icon` | `String` | `"solid"` |
| `type` | The button's type attribute `button, submit` | `String` | `"button"` |
| `size` | Sets the size of the button `small, medium, large` | `String` | `"medium"` |
| `block` | Whether the button extends the full available width or not | `Boolean` | `false` |
| `disabled` | Whether the button is disabled or not `true, false` | `Boolean` | `false` |
| `focused` | Whether the button is focused or not `true, false` | `Boolean` | `false` |
| `customAlertEvent` | Clicking this button can emit a custom event that should trigger an alert. You must supply an alertStatus and alertMessage, like so: { 'alertStatus': 'success', 'alertMessage': 'This is my message.'} | `Object` | `null` |
| `hideLabel` | Visually hides the button text. | `Boolean` | `false` |
| `icon` | Indicates what icon to use. Values should be hyphenated and do not use the "lux-icon-" prefix. For example, instead of `lux-icon-search`, simply use `search`. | `String` | `""` |

## Usage

<div>
  <!-- use :focused sparingly and only when necessary to set the focus; uncomment below to test in preview above -->
  <!-- <lux-input-button type="button" focused variation="icon" size="small" icon="search" hideLabel></lux-input-button> -->
  <lux-input-button type="button" variation="icon-prepend" size="small" icon="search" hideLabel>Search</lux-input-button>

  <lux-input-button variation="solid" size="small">Apply Changes</lux-input-button>
  <lux-input-button type="button" variation="solid">Apply Changes</lux-input-button>
  <lux-input-button type="button" variation="solid" size="large" disabled>Apply Changes</lux-input-button>

  <lux-input-button type="submit" variation="solid" block>Submit</lux-input-button>

  <lux-input-button type="button" variation="outline">Manage Files</lux-input-button>

  <lux-input-button type="button" variation="text">Manage Files</lux-input-button>
</div>
