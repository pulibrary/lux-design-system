# LuxInputRadio

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `vertical` | If true, the radio buttons will be stacked vertically. Otherwise they will be horizontal (inline). | `Boolean` | `false` |
| `options` | The available options to check. Option properties are: id, value, disabled, required, checked | `Array` | `-` |
| `groupLabel` | The label of the form input field. | `String` | `""` |
| `errormessage` | The validation message a user should get. | `String` | `""` |
| `id` | Unique identifier of the form input field. | `String` | `""` |
| `disabled` | Whether the form input field is disabled or not. `true, false` | `Boolean` | `false` |
| `required` | Whether the form input field is required or not. `true, false` | `Boolean` | `false` |
| `hover` | Manually trigger input field’s hover state. `true, false` | `Boolean` | `false` |
| `focus` | Manually trigger input field’s focus state. `true, false` | `Boolean` | `false` |

## Usage

<div>
  <lux-input-radio
    id="foo"
    vertical groupLabel="Where is my mind?"
    :options="[
      {name: 'radio-group-name', value: 'In the clouds', id: 'radio-opt1', required: true},
      {name: 'radio-group-name', value: 'I don\'t know', id: 'radio-opt2', disabled: true}
    ]">
  </lux-input-radio>
</div>
