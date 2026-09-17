# LuxInputText

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `type` | The type of the form input field. `text, number, email` | `String` | `"text"` |
| `value` | Text value of the form input field. | `[String, Number]` | `""` |
| `placeholder` | The placeholder value for the form input field. | `String` | `null` |
| `label` | The label of the form input field. | `String` | `""` |
| `hideLabel` | Visually hides the label of the form input field. | `Boolean` | `false` |
| `errormessage` | The validation message a user should get. | `String` | `""` |
| `helper` | The helper text a user should get. | `String` | `""` |
| `wrapper` | The html element name used for the wrapper. `div, section` | `String` | `"div"` |
| `id` | Unique identifier of the form input field. | `String` | `""` |
| `name` | The name attribute for the form input field. | `String` | `""` |
| `width` | The width of the form input field. `auto, expand` | `String` | `"auto"` |
| `size` | Sets the size of the input area `small, medium, large` | `String` | `"medium"` |
| `rows` | The number of visible text lines for textarea. | `String` | `"5"` |
| `maxlength` | The maximum number of characters that the user can enter in textarea. | `Number` | `256` |
| `disabled` | Whether the form input field is disabled or not. `true, false` | `Boolean` | `false` |
| `readonly` | Whether the form input field is readonly or not. `true, false` | `Boolean` | `false` |
| `required` | Whether the form input field is required or not. `true, false` | `Boolean` | `false` |
| `hover` | Manually trigger input field’s hover state. `true, false` | `Boolean` | `false` |
| `focused` | Manually trigger input field’s focus state. `true, false` | `Boolean` | `false` |
| `icon` | Appends icon inside container. Option: `alert`, `approved`, `denied` | `String` | `""` |

## Usage

<div>
  <lux-input-text id="foo" name="value" label="Input" :hide-label="true" placeholder="Write your text" helper="This is helper text to help the user fill out this field" size="large" required></lux-input-text>
  <lux-input-text id="foo" name="value" label="Input" :hide-label="true" placeholder="Write your text" helper="This is helper text to help the user fill out this field"></lux-input-text>
  <lux-input-text id="foo" name="value" label="Input" :hide-label="true" placeholder="Write your text" helper="This is helper text to help the user fill out this field" size="small"></lux-input-text>

  <lux-input-text id="bar" name="value" label=":hover" hover placeholder="Write your text"></lux-input-text>
  <!-- use :focused sparingly and only when necessary to set the focus; uncomment below to test in preview above  -->
  <!--<lux-input-text id="fee" name="value" label=":focused" focused placeholder="Write your text"></lux-input-text>-->
  <lux-input-text id="foe" name="value" label="[disabled]" disabled placeholder="Disabled input"></lux-input-text>
  <lux-input-text id="foe" name="value" label="Textarea" type="textarea"></lux-input-text>

  <!-- with icons -->
  <lux-input-text id="foo" name="value" label="Icon" placeholder="Write your text" icon="alert"></lux-input-text>
  <lux-input-text id="foo" name="value" label="Icon" placeholder="Write your text" icon="calendar"></lux-input-text>
</div>
