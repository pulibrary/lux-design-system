# LuxInputSelect

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `value` | Sets the value of the selected option. | `String` | `-` |
| `multiple` | Determines whether the user can select multiple options. | `Boolean` | `false` |
| `options` | The available options to check. | `Array` | `-` |
| `label` | The label of the input select field. | `String` | `""` |
| `hideLabel` | Visually hides the label of the form input field. | `Boolean` | `false` |
| `errormessage` | The validation message a user should get. | `String` | `""` |
| `wrapper` | The html element name used for the wrapper. `div, section` | `String` | `"div"` |
| `id` | Unique identifier of the input select field. | `String` | `""` |
| `name` | The name attribute for the form input field. | `String` | `""` |
| `width` | The width of the input select field. `auto, expand` | `String` | `"auto"` |
| `size` | Sets the size of the input area `small, medium, large` | `String` | `"medium"` |
| `disabled` | Whether the form input field is disabled or not. `true, false` | `Boolean` | `false` |
| `required` | Whether the form input field is required or not. `true, false` | `Boolean` | `false` |
| `hover` | Manually trigger input field’s hover state. `true, false` | `Boolean` | `false` |

## Usage

<div>
  <lux-input-select label="Select..." id="myChoice" name="myChoice" value="bar" :options="[{label: 'opt 1', value: 'foo'}, {label: 'opt 2', value: 'bar'}]"></lux-input-select>
</div>
