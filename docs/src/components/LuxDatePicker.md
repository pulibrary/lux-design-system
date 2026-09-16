# LuxDatePicker

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `mode` | Allows for a single date or a date range to be selected. Possible values are: `single, range`. | `String` | `"single"` |
| `label` | The label of the form input field. | `String` | `""` |
| `id` | Unique identifier of the form input field. | `String` | `""` |
| `name` | The name attribute for the form input field. | `String` | `""` |
| `width` | The width of the form input field. `auto, expand` | `String` | `"auto"` |
| `size` | Sets the size of the input area `small, medium, large` | `String` | `"medium"` |
| `required` | Whether the form input field is required or not. `true, false` | `Boolean` | `false` |
| `placeholder` | Placeholder text to display | `String` | `""` |
| `defaultDate` | defaultDate offers a way to add data that may already exist for the field when `mode='single'`. It takes the form of a Javascript Date object. Example: `:defaultDate="new Date(2019, 05, 01)"` | `Date` | `null` |
| `defaultDates` | defaultDates offer a way to add data that may already exist for the field when `mode='range'`. It takes the form of an Object containing two properties (start and, optionally, end date) with values that are Javascript date objects. Example: `:defaultDates="{ start: new Date(2019, 05, 01), end: new Date(2019, 05, 02)}"` | `Object` | `null` |
| `disabledDates` | Disable dates using the date object or date range format. This example makes the month of June 2019 selectable, but nothing else: `[{ start: null, end: new Date(2019, 05, 01)}, { start: new Date(2019, 05, 30), end: null }]` Note: In Javascript, months start at zero, which is why 05 = June. | `Array` | `null` |
| `holidays` | Highlight PUL holidays using an array of strings in YYYY-MM-DD format. Example: ["2019-11-28","2019-11-29"] | `Array` | `null` |
| `helper` | The helper text a user should get. | `String` | `""` |
| `icon` | No description provided. | `String` | `""` |
| `components` | No description provided. | `any` | `-` |

## Usage

```jsx
    <div>
      <lux-date-picker id="dateRange" name="daterange" label="Date Range" helper="Please enter both start and end dates." mode="range" :disabled-dates="[{ start: null, end: new Date(2019, 05, 01)}, { start: new Date(), end: null }]"  placeholder="01/10/2020" />

      <lux-date-picker id="today" name="today" label="Today's Date" mode="single" :holidays="['2020-02-20','2020-02-21']" :defaultDate="new Date()" />
    </div>
  ```
