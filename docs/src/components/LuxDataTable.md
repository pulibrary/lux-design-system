# LuxDataTable

> Used to display data to end users.

## Props

| Prop name    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Type   | Values | Default |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ------ | ------- |
| caption      | caption provides context for the data that is helpful to users, particularly those who use screenreaders.<br/>`e.g. [name, title, age]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | string | -      |         |
| summaryLabel | summaryLabel provides context to the data values in tfoot element cells.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | string | -      |         |
| columns      | columns define the columns and order for which the data should be displayed.<br/>Columns entries can be simple strings, or they may be more complicated objects<br/>that can define `name`, `display_name`,`align`, `sortable`, and `checkbox` properties.<br/>Sorting on `numeric` or `currency` values requires a column to have<br/>a `datatype='number'` or `datatype='currency'` property.<br/>Sorting on `date` values requires a column to have<br/>a `datatype='date'` property.<br/>Use `checkbox=true` to create a checkbox whose value is the value for that<br/>column value for the row in the table.<br/>`e.g. ['name', 'email', 'age']` | array  | -      |         |
| jsonData     | jsonData is supplied via Array with an object representing each row.<br/>Applying links to data cell content can be achieved by supplying an object<br/>that contains a `value` and `link` property. Date sorting uses the JavaScript<br/>`datestring` parameter. Shorthand dates are supported in most browsers, but can be implementation-specific.<br/>(e.g., `{ value: 'content', link: 'https://url.com'}`)<br/>See above example for exact structure.                                                                                                                                                                                            | array  | -      |         |

---

```jsx
    <lux-data-table caption="Staff Emails" summary-label="Average"
      :columns="[
        { 'name': 'id', 'display_name': 'Select Items', 'align': 'center', 'checkbox': true },
        'name',
        { 'name': 'email', 'display_name': 'Email Address', 'align': 'center', 'sortable': true },
        { 'name': 'birthday', 'datatype': 'date', 'sortable': true },
        { 'name': 'age', 'datatype': 'number', 'summary_value': '33', 'sortable': true }
      ]"
      :json-data="[
        {'id': 1,'name': { value: 'foo', link: 'https://library.princeton.edu'},'email': 'foo@xxx.xxx', 'age': 30, 'birthday': 'March 4, 1989' },
        {'id': 2,'name': 'bar','email': 'bar@xxx.xxx', 'age': 44, 'birthday': 'October 4, 1975' },
        {'id': 3,'name': 'fez','email': 'fez@xxx.xxx', 'age': 19, 'birthday': 'May 14, 2000' },
        {'id': 4,'name': 'hey','email': 'hey@xxx.xxx', 'age': 19 , 'birthday': 'May 5, 2000'},
      ]"/>
```
