# LuxInputButton

> Buttons are used to toggle something in the interface or trigger new
> content in the same context.

## Props

| Prop name        | Description                                                                                                                                                                                                     | Type    | Values | Default  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | -------- |
| variation        | The button's variations `solid, outline, text, dropdown, icon`                                                                                                                                                  | string  | -      | "solid"  |
| type             | The button's type attribute `button, submit`                                                                                                                                                                    | string  | -      | "button" |
| size             | Sets the size of the button `small, medium, large`                                                                                                                                                              | string  | -      | "medium" |
| block            | Whether the button extends the full available width or not                                                                                                                                                      | boolean | -      | false    |
| disabled         | Whether the button is disabled or not<br/>`true, false`                                                                                                                                                         | boolean | -      | false    |
| focused          | Whether the button is focused or not<br/>`true, false`                                                                                                                                                          | boolean | -      | false    |
| customAlertEvent | Clicking this button can emit a custom event that should trigger an alert.<br/>You must supply an alertStatus and alertMessage, like so:<br/>{ 'alertStatus': 'success', 'alertMessage': 'This is my message.'} | object  | -      | null     |
| hideLabel        | Visually hides the button text.                                                                                                                                                                                 | boolean | -      | false    |
| icon             | Indicates what icon to use. Values should be hyphenated and do not use the "lux-icon-" prefix.<br/>For example, instead of `lux-icon-search`, simply use `search`.                                              | string  | -      | ""       |

## Events

| Event name     | Properties | Description |
| -------------- | ---------- | ----------- |
| button-clicked |            |
| system-alert   |            |

## Slots

| Name    | Description              | Bindings |
| ------- | ------------------------ | -------- |
| default | The text of your button. |          |

---

```jsx
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
```
