# LuxDataTable

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `caption` | caption provides context for the data that is helpful to users, particularly those who use screenreaders. `e.g. [name, title, age]` | `String` | `-` |
| `summaryLabel` | summaryLabel provides context to the data values in tfoot element cells. | `String` | `-` |
| `columns` | columns define the columns and order for which the data should be displayed. Columns entries can be simple strings, or they may be more complicated objects that can define `name`, `display_name`,`align`, `sortable`, and `checkbox` properties. Sorting on `numeric` or `currency` values requires a column to have a `datatype='number'` or `datatype='currency'` property. Sorting on `date` values requires a column to have a `datatype='date'` property. Use `checkbox=true` to create a checkbox whose value is the value for that column value for the row in the table. `e.g. ['name', 'email', 'age']` | `Array` | `-` |
| `jsonData` | jsonData is supplied via Array with an object representing each row. Applying links to data cell content can be achieved by supplying an object that contains a `value` and `link` property. Date sorting uses the JavaScript `datestring` parameter. Shorthand dates are supported in most browsers, but can be implementation-specific. (e.g., `{ value: 'content', link: 'https://url.com'}`) See above example for exact structure. | `Array` | `-` |

## Usage

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
