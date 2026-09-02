# LuxInputCheckbox

> Form Inputs are used to allow users to provide text input when the expected
> input is short. Form Input has a range of options and supports several text
> formats including numbers. For longer input, use the `FormTextarea` element.

## Props

| Prop name    | Description                                                                                     | Type    | Values | Default |
| ------------ | ----------------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| vertical     | If true, the checkboxes will be stacked vertically. Otherwise they will be horizontal (inline). | boolean | -      | false   |
| options      | The available options to check. Option properties are: id, value, disabled, required, checked   | array   | -      |         |
| label        | The label of the form input field.                                                              | string  | -      | ""      |
| errormessage | The validation message a user should get.                                                       | string  | -      | ""      |
| groupLabel   | The html element name used for the wrapper.<br/>`div, section`                                  | string  | -      | ""      |
| disabled     | Whether the form input field is disabled or not.<br/>`true, false`                              | boolean | -      | false   |
| required     | Whether the form input field is required or not.<br/>`true, false`                              | boolean | -      | false   |
| hover        | Manually trigger input field’s hover state.<br/>`true, false`                                   | boolean | -      | false   |
| focus        | Manually trigger input field’s focus state.<br/>`true, false`                                   | boolean | -      | false   |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| change     |            |
| inputblur  |            |

---

```jsx
  <div>
    <lux-input-checkbox groupLabel="Where is my mind?" :options="[{name: 'opt 1', value: 'In the clouds', id: 'checkbox-opt1', required: true}, {name: 'opt 2', value: 'I don\'t know', id: 'checkbox-opt2', disabled: true}]"></lux-input-checkbox>
  </div>
```
