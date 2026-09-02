# LuxInputRadio

> Radio buttons should only be used when a user can select one option.
> For multiple selections, use checkboxes.

## Props

| Prop name    | Description                                                                                        | Type    | Values | Default |
| ------------ | -------------------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| vertical     | If true, the radio buttons will be stacked vertically. Otherwise they will be horizontal (inline). | boolean | -      | false   |
| options      | The available options to check. Option properties are: id, value, disabled, required, checked      | array   | -      |         |
| groupLabel   | The label of the form input field.                                                                 | string  | -      | ""      |
| errormessage | The validation message a user should get.                                                          | string  | -      | ""      |
| id           | Unique identifier of the form input field.                                                         | string  | -      | ""      |
| disabled     | Whether the form input field is disabled or not.<br/>`true, false`                                 | boolean | -      | false   |
| required     | Whether the form input field is required or not.<br/>`true, false`                                 | boolean | -      | false   |
| hover        | Manually trigger input field’s hover state.<br/>`true, false`                                      | boolean | -      | false   |
| focus        | Manually trigger input field’s focus state.<br/>`true, false`                                      | boolean | -      | false   |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| change     |            |
| inputblur  |            |

---

```jsx
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
```
