# LuxDatePicker

## Props

| Prop name     | Description                                                                                                                                                                                                                                                                                                                                  | Type    | Values | Default  |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | -------- |
| mode          | Allows for a single date or a date range to be selected. Possible values are: `single, range`.                                                                                                                                                                                                                                               | string  | -      | "single" |
| label         | The label of the form input field.                                                                                                                                                                                                                                                                                                           | string  | -      | ""       |
| id            | Unique identifier of the form input field.                                                                                                                                                                                                                                                                                                   | string  | -      | ""       |
| name          | The name attribute for the form input field.                                                                                                                                                                                                                                                                                                 | string  | -      | ""       |
| width         | The width of the form input field.<br/>`auto, expand`                                                                                                                                                                                                                                                                                        | string  | -      | "auto"   |
| size          | Sets the size of the input area `small, medium, large`                                                                                                                                                                                                                                                                                       | string  | -      | "medium" |
| required      | Whether the form input field is required or not.<br/>`true, false`                                                                                                                                                                                                                                                                           | boolean | -      | false    |
| placeholder   | Placeholder text to display                                                                                                                                                                                                                                                                                                                  | string  | -      | ""       |
| defaultDate   | defaultDate offers a way to add data that may already exist for the field when `mode='single'`.<br/>It takes the form of a Javascript Date object.<br/>Example: `:defaultDate="new Date(2019, 05, 01)"`                                                                                                                                      | date    | -      | null     |
| defaultDates  | defaultDates offer a way to add data that may already exist for the field when `mode='range'`.<br/>It takes the form of an Object containing two properties (start and,<br/>optionally, end date) with values that are Javascript date objects.<br/>Example: `:defaultDates="{ start: new Date(2019, 05, 01), end: new Date(2019, 05, 02)}"` | object  | -      | null     |
| disabledDates | Disable dates using the date object or date range format. This example makes the<br/>month of June 2019 selectable, but nothing else: `[{ start: null, end: new Date(2019, 05, 01)}, { start: new Date(2019, 05, 30), end: null }]`<br/>Note: In Javascript, months start at zero, which is why 05 = June.                                   | array   | -      | null     |
| holidays      | Highlight PUL holidays using an array of strings in YYYY-MM-DD format. Example: ["2019-11-28","2019-11-29"]                                                                                                                                                                                                                                  | array   | -      | null     |
| helper        | The helper text a user should get.                                                                                                                                                                                                                                                                                                           | string  | -      | ""       |
| icon          |                                                                                                                                                                                                                                                                                                                                              | string  | -      | ""       |
| components    |                                                                                                                                                                                                                                                                                                                                              | -       | -      |          |

## Events

| Event name       | Properties | Description |
| ---------------- | ---------- | ----------- |
| updateInput      |            |
| updateRangeInput |            |

---

```jsx
    <div>
      <lux-date-picker id="dateRange" name="daterange" label="Date Range" helper="Please enter both start and end dates." mode="range" :disabled-dates="[{ start: null, end: new Date(2019, 05, 01)}, { start: new Date(), end: null }]"  placeholder="01/10/2020" />

      <lux-date-picker id="today" name="today" label="Today's Date" mode="single" :holidays="['2020-02-20','2020-02-21']" :defaultDate="new Date()" />
    </div>
```
