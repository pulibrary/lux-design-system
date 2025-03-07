<template>
  <table border="1px" :class="['lux-data-table']">
    <caption>
      {{
        caption
      }}
    </caption>
    <thead>
      <tr>
        <th v-for="(col, index) in parsedColumns" scope="col" v-bind:key="index" nowrap>
          <lux-input-button
            v-if="col.sortable"
            type="button"
            v-on:button-clicked="sortTable(col)"
            variation="text"
          >
            <lux-icon-base
              v-if="col.sortable"
              width="16"
              height="16"
              :icon-name="iconLabel(col.ascending)"
            >
              <lux-icon-ascending v-if="col.ascending"></lux-icon-ascending>
              <lux-icon-descending v-if="col.ascending === false"></lux-icon-descending>
              <lux-icon-unsorted v-if="col.ascending === null"></lux-icon-unsorted>
            </lux-icon-base>
            {{ displayName(col) }}</lux-input-button
          >
          <span v-else>{{ displayName(col) }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="row" v-for="(lineItem, rowIndex) in rows" v-bind:key="rowIndex">
        <td
          v-for="(col, columnIndex) in parsedColumns"
          v-bind:key="columnIndex"
          :class="[
            { 'lux-data-table-left': isLeft(col.align) },
            { 'lux-data-table-center': isCenter(col.align) },
            { 'lux-data-table-right': isRight(col.align) },
            { 'lux-data-table-number': isNum(col.datatype) },
            { 'lux-data-table-currency': isCurrency(col.datatype) },
          ]"
        >
          <input
            v-if="col.checkbox"
            :id="lineItem[col.name].value"
            type="checkbox"
            :aria-label="getAriaLabel(lineItem)"
            :name="col.name"
            :value="lineItem[col.name].value"
          />
          <lux-hyperlink v-else-if="lineItem[col.name].link" :href="lineItem[col.name].link">
            {{ lineItem[col.name].value }}
          </lux-hyperlink>
          <span v-else>
            {{ lineItem[col.name].value }}
          </span>
        </td>
      </tr>
    </tbody>
    <tfoot v-if="summaryLabel">
      <tr>
        <th scope="row">{{ summaryLabel }}</th>
        <td
          v-for="(col, index) in footerColumns"
          v-bind:key="index"
          :class="[
            { 'lux-data-table-left': isLeft(col.align) },
            { 'lux-data-table-center': isCenter(col.align) },
            { 'lux-data-table-right': isRight(col.align) },
            { 'lux-data-table-number': isNum(col.datatype) },
            { 'lux-data-table-currency': isCurrency(col.datatype) },
          ]"
        >
          <span>
            {{ col.summary_value }}
          </span>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
/**
 * Used to display data to end users.
 */
export default {
  name: "LuxDataTable",
  status: "ready",
  release: "3.1.4",
  type: "Element",
  data() {
    return {
      rows: this.jsonData,
      parsedColumns: [],
    }
  },
  props: {
    /**
     * caption provides context for the data that is helpful to users, particularly those who use screenreaders.
     * `e.g. [name, title, age]`
     */
    caption: {
      required: true,
      type: String,
    },
    /**
     * summaryLabel provides context to the data values in tfoot element cells.
     */
    summaryLabel: {
      required: false,
      type: String,
    },
    /**
     * columns define the columns and order for which the data should be displayed.
     * Columns entries can be simple strings, or they may be more complicated objects
     * that can define `name`, `display_name`,`align`, `sortable`, and `checkbox` properties.
     * Sorting on `numeric` or `currency` values requires a column to have
     * a `datatype='number'` or `datatype='currency'` property.
     * Sorting on `date` values requires a column to have
     * a `datatype='date'` property.
     * Use `checkbox=true` to create a checkbox whose value is the value for that
     * column value for the row in the table.
     * `e.g. ['name', 'email', 'age']`
     */
    columns: {
      required: true,
      type: Array,
    },
    /**
     * jsonData is supplied via Array with an object representing each row.
     * Applying links to data cell content can be achieved by supplying an object
     * that contains a `value` and `link` property. Date sorting uses the JavaScript
     * `datestring` parameter. Shorthand dates are supported in most browsers, but can be implementation-specific.
     * (e.g., `{ value: 'content', link: 'https://url.com'}`)
     * See above example for exact structure.
     */
    jsonData: {
      required: true,
      type: Array,
    },
  },
  created: function () {
    // Normalize the column data by converting any simple string field
    // names into objects with a name property
    let pCols = this.columns.map(col => {
      if (!this.isObject(col)) {
        return { name: col.toLowerCase(), ascending: null }
      } else {
        col.name = col.name.toLowerCase()
        if (col.sortable && typeof col.ascending === "undefined") {
          col.ascending = null
        }
        return col
      }
    })
    this.parsedColumns = pCols

    // Normalize the row data by converting any simple values into
    // objects with the link properties
    let rowNum = this.jsonData.length
    for (let i = 0; i < rowNum; i++) {
      // console.log(this.jsonData[i].name)
      for (let key in this.jsonData[i]) {
        if (this.jsonData[i].hasOwnProperty(key)) {
          if (!this.isObject(this.jsonData[i][key])) {
            // eslint-disable-next-line vue/no-mutating-props
            this.jsonData[i][key] = { value: this.jsonData[i][key], link: null }
          }
        }
      }
    }
    this.rows = this.jsonData
  },
  computed: {
    footerColumns() {
      let fCols = this.columns
      fCols.shift()
      return fCols
    },
  },
  methods: {
    getAriaLabel(lineItems) {
      let lines = []
      for (const [key, item] of Object.entries(lineItems)) {
        lines.push(`${key}: ${item.value}`)
      }
      return lines.join(", ")
    },
    iconLabel(value) {
      if (value === true) {
        return "ascending"
      } else if (value === false) {
        return "descending"
      } else if (value === null) {
        return "unsorted"
      }
    },
    displayName(col) {
      if (col.hasOwnProperty("display_name")) {
        return col.display_name
      } else {
        return col.name
      }
    },
    sortTable(col) {
      if (!col.ascending) {
        if (col.datatype === "number" || col.datatype === "currency") {
          this.rows.sort((a, b) => a[col.name].value - b[col.name].value)
        } else if (col.datatype === "date") {
          this.rows.sort((a, b) => new Date(a[col.name].value) - new Date(b[col.name].value))
        } else {
          this.rows.sort(function (a, b) {
            let textA = a[col.name.toLowerCase()].value.toString().toLowerCase()
            let textB = b[col.name.toLowerCase()].value.toString().toLowerCase()
            return textA < textB ? -1 : textA > textB ? 1 : 0
          })
        }
      } else {
        if (col.datatype === "number" || col.datatype === "currency") {
          this.rows.sort((a, b) => b[col.name].value - a[col.name].value)
        } else if (col.datatype === "date") {
          this.rows.sort((a, b) => new Date(b[col.name].value) - new Date(a[col.name].value))
        } else {
          this.rows.sort(function (a, b) {
            let textA = a[col.name.toLowerCase()].value.toString().toLowerCase()
            let textB = b[col.name.toLowerCase()].value.toString().toLowerCase()
            return textA < textB ? 1 : textA > textB ? -1 : 0
          })
        }
      }
      col.ascending = !col.ascending

      // reset other columns ascending prop to null (aka, "unsorted")
      this.parsedColumns = this.parsedColumns.map(function (column) {
        if (col.name != column.name) {
          column.ascending = null
        }
        return column
      })
    },
    isObject(value) {
      return value && typeof value === "object" && value.constructor === Object
    },
    isCurrency(value) {
      return value === "currency" ? true : false
    },
    isNum(value) {
      return value === "number" ? true : false
    },
    isLeft(value) {
      return value === "left" ? true : false
    },
    isCenter(value) {
      return value === "center" ? true : false
    },
    isRight(value) {
      return value === "right" ? true : false
    },
  },
}
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "/src/assets/styles/system.scss" as *;
@use "/src/assets/styles/variables.css" as *;
@use "/src/assets/styles/spacing.scss" as *;

.lux-data-table {
  border-collapse: collapse;
  border-spacing: 0;
  border-left: none;
  border-right: none;
  border-bottom: none;

  caption {
    @include stack-space(var(--space-base));
    display: table-caption;
    text-align: left;
    font-weight: var(--font-weight-bold);
    font-family: var(--font-family-text);
    line-height: var(--line-height-heading);
    @include responsive-font(
      2vw,
      $font-size-x-large-min,
      $font-size-x-large-max,
      $font-size-x-large
    );
  }

  thead {
    display: table-header-group;
    vertical-align: middle;
  }

  thead tr {
    background-color: var(--color-grayscale-lighter);
    color: var(--color-rich-black);
  }

  th {
    line-height: 22px;
    padding: 20px;
    font-weight: var(--font-weight-semi-bold);
    font-family: var(--font-family-text);
    font-size: var(--font-size-x-small);
    line-height: var(--line-height-heading);
    text-align: left;
    text-transform: uppercase;
    color: var(--color-grayscale-darker);
    letter-spacing: 0.5px;
  }

  th,
  td {
    border-bottom: none;
    border-left: none;
    border-right: none;
    border-top: 1px solid color.adjust($color-grayscale-lighter, $lightness: -10%);
    @include inset-space($space-base);
    overflow: hidden;
  }

  th button {
    padding: 0px;
    font-weight: var(--font-weight-semi-bold);
    font-family: var(--font-family-text);
    font-size: var(--font-size-x-small);
    line-height: var(--line-height-heading);
    text-align: left;
    text-transform: uppercase;
    color: var(--color-grayscale-darker);
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    margin: 0;

    :deep(.lux-icon) {
      display: initial;
    }
  }

  tbody tr {
    display: table-row;
    vertical-align: inherit;
    background-color: var(--color-white);
    color: var(--color-grayscale-darker);

    &:hover {
      background: var(--color-grayscale-warm-lighter);

      input {
        background: var(--color-grayscale-warm-lighter);
      }
    }
  }

  tbody {
    background-color: #fff;
  }

  td {
    color: var(--color-rich-black);
    font-weight: var(--font-weight-regular);
    font-family: var(--font-family-text);
    font-size: var(--font-size-base);
    line-height: 1.2;
    text-align: left;

    input {
      position: relative;
      width: auto;
      cursor: pointer;

      &:hover,
      &:focus,
      &:checked {
        box-shadow: none;
        border: 0;
      }
    }

    input::before,
    input::after {
      position: absolute;
      content: "";

      /*Needed for the line-height to take effect*/
      display: inline-block;
    }

    /*Outer box of the fake checkbox*/
    input::before {
      height: 16px;
      width: 16px;
      background-color: var(--color-white);
      border: 0;
      border-radius: $border-radius-default;
      box-shadow: inset 0 1px 0 0 color-mix(in srgb, var(--color-rich-black) 7%, transparent),
        0 0 0 1px tint($color-rich-black, 80%);
    }

    /* On mouse-over, add a grey background color */
    input:not([disabled]):hover::before {
      box-shadow: 0 1px 5px 0 color-mix(in srgb, var(--color-rich-black) 7%, transparent),
        0 0 0 1px tint($color-rich-black, 60%);
    }

    input:checked::before {
      transition: box-shadow 0.2s ease;
      background-color: var(--color-bleu-de-france);
      box-shadow: inset 0 0 0 1px var(--color-bleu-de-france), 0 0 0 1px $color-bleu-de-france;
      outline: 0;
    }

    /*Checkmark of the fake checkbox*/
    input::after {
      height: 5px;
      width: 10px;
      border-left: 2px solid var(--color-white);
      border-bottom: 2px solid var(--color-white);

      transform: rotate(-45deg);

      left: 2px;
      top: 3px;
    }

    /*Hide the checkmark by default*/
    input[type="checkbox"]::after {
      content: none;
    }

    /*Unhide on the checked state*/
    input[type="checkbox"]:checked::after {
      content: "";
    }

    /*Adding focus styles on the outer-box of the fake checkbox*/
    input[type="checkbox"]:focus::before {
      transition: box-shadow $duration-quickly ease;
      box-shadow: inset 0 0 0 1px $color-bleu-de-france, 0 0 0 1px $color-bleu-de-france;
    }
  }

  .lux-data-table-currency {
    text-align: right;
  }

  .lux-data-table-currency > span::before {
    content: "$";
  }

  .lux-data-table-number {
    text-align: right;
  }

  .lux-data-table-left {
    text-align: left;
  }

  .lux-data-table-center {
    text-align: center;
  }

  .lux-data-table-right {
    text-align: right;
  }
}
</style>

<docs>
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
</docs>
