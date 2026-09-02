# LuxInputText

> Form Inputs are used to allow users to provide text input when the expected
> input is short. Form Input has a range of options and supports several text
> formats including numbers. For longer input, use the `FormTextarea` element.

## Props

| Prop name    | Description                                                              | Type           | Values | Default  |
| ------------ | ------------------------------------------------------------------------ | -------------- | ------ | -------- |
| type         | The type of the form input field.<br/>`text, number, email`              | string         | -      | "text"   |
| value        | Text value of the form input field.                                      | string\|number | -      | ""       |
| placeholder  | The placeholder value for the form input field.                          | string         | -      | null     |
| label        | The label of the form input field.                                       | string         | -      | ""       |
| hideLabel    | Visually hides the label of the form input field.                        | boolean        | -      | false    |
| errormessage | The validation message a user should get.                                | string         | -      | ""       |
| helper       | The helper text a user should get.                                       | string         | -      | ""       |
| wrapper      | The html element name used for the wrapper.<br/>`div, section`           | string         | -      | "div"    |
| id           | Unique identifier of the form input field.                               | string         | -      | ""       |
| name         | The name attribute for the form input field.                             | string         | -      | ""       |
| width        | The width of the form input field.<br/>`auto, expand`                    | string         | -      | "auto"   |
| size         | Sets the size of the input area `small, medium, large`                   | string         | -      | "medium" |
| rows         | The number of visible text lines for textarea.                           | string         | -      | "5"      |
| maxlength    | The maximum number of characters that the user can enter in textarea.    | number         | -      | 256      |
| disabled     | Whether the form input field is disabled or not.<br/>`true, false`       | boolean        | -      | false    |
| readonly     | Whether the form input field is readonly or not.<br/>`true, false`       | boolean        | -      | false    |
| required     | Whether the form input field is required or not.<br/>`true, false`       | boolean        | -      | false    |
| hover        | Manually trigger input field’s hover state.<br/>`true, false`            | boolean        | -      | false    |
| focused      | Manually trigger input field’s focus state.<br/>`true, false`            | boolean        | -      | false    |
| icon         | Appends icon inside container. Option:<br/>`alert`, `approved`, `denied` | string         | -      | ""       |

## Events

| Event name       | Properties | Description |
| ---------------- | ---------- | ----------- |
| change           |            |
| keyup            |            |
| blur             |            |
| inputvaluechange |            |
| inputblur        |            |
| inputfocus       |            |
| update:value     |            |
| input            |            |
| focus            |            |

---

```jsx
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
```
