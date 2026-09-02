# LuxInputSelect

> Input Selects are used to allow users to choose among a number of options.

## Props

| Prop name    | Description                                                        | Type    | Values | Default  |
| ------------ | ------------------------------------------------------------------ | ------- | ------ | -------- |
| value        | Sets the value of the selected option.                             | string  | -      |          |
| multiple     | Determines whether the user can select multiple options.           | boolean | -      | false    |
| options      | The available options to check.                                    | array   | -      |          |
| label        | The label of the input select field.                               | string  | -      | ""       |
| hideLabel    | Visually hides the label of the form input field.                  | boolean | -      | false    |
| errormessage | The validation message a user should get.                          | string  | -      | ""       |
| wrapper      | The html element name used for the wrapper.<br/>`div, section`     | string  | -      | "div"    |
| id           | Unique identifier of the input select field.                       | string  | -      | ""       |
| name         | The name attribute for the form input field.                       | string  | -      | ""       |
| width        | The width of the input select field.<br/>`auto, expand`            | string  | -      | "auto"   |
| size         | Sets the size of the input area `small, medium, large`             | string  | -      | "medium" |
| disabled     | Whether the form input field is disabled or not.<br/>`true, false` | boolean | -      | false    |
| required     | Whether the form input field is required or not.<br/>`true, false` | boolean | -      | false    |
| hover        | Manually trigger input field’s hover state.<br/>`true, false`      | boolean | -      | false    |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| change     |            |
| inputblur  |            |

## Expose

### focusSelect

>

---

```jsx
    <div>
      <lux-input-select label="Select..." id="myChoice" name="myChoice" value="bar" :options="[{label: 'opt 1', value: 'foo'}, {label: 'opt 2', value: 'bar'}]"></lux-input-select>
    </div>
```
