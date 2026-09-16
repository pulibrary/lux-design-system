# LuxInputCheckbox

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `vertical` | If true, the checkboxes will be stacked vertically. Otherwise they will be horizontal (inline). | `Boolean` | `false` |
| `options` | The available options to check. Option properties are: id, value, disabled, required, checked | `Array` | `-` |
| `label` | The label of the form input field. | `String` | `""` |
| `errormessage` | The validation message a user should get. | `String` | `""` |
| `groupLabel` | The html element name used for the wrapper. `div, section` | `String` | `""` |
| `disabled` | Whether the form input field is disabled or not. `true, false` | `Boolean` | `false` |
| `required` | Whether the form input field is required or not. `true, false` | `Boolean` | `false` |
| `hover` | Manually trigger input field’s hover state. `true, false` | `Boolean` | `false` |
| `focus` | Manually trigger input field’s focus state. `true, false` | `Boolean` | `false` |

## Usage

```jsx
  <div>
    <lux-input-checkbox groupLabel="Where is my mind?" :options="[{name: 'opt 1', value: 'In the clouds', id: 'checkbox-opt1', required: true}, {name: 'opt 2', value: 'I don\'t know', id: 'checkbox-opt2', disabled: true}]"></lux-input-checkbox>
  </div>
  ```
