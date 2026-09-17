# LuxInputMultiselect

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `items` | An array of items.  Each item should be an object with (at minimum) an id and label property. | `Array` | `() => []` |
| `asyncLoadItemsFunction` | A function to load items asynchronously on user input. It should return an item list in the format [{id: "", label: ""}]. | `Function` | `null` |
| `placeholder` | Placeholder text to display | `String` | `-` |
| `label` | The label of the form input field. | `String` | `-` |
| `hideLabel` | Visually hides the label of the form input field. | `Boolean` | `false` |
| `noneSelectedLabel` | Text to display if the user hasn't selected anything yet | `String` | `"None selected"` |
| `selectedItemsLabel` | Label for the summary of items that the user has selected so far | `String` | `-` |
| `debounceTimeout` | The milliseconds to wait for more user input before sending the query | `Number` | `500` |
| `defaultValues` | The default selected items. It should be an array in the format [{id: "", label: ""}] | `Array` | `() => []` |
| `searchOnEmptyQuery` | Should we run a search when a user clicks into the component | `Boolean` | `false` |

## Usage

<div>
<lux-input-multiselect :items="[
      { id: 1, label: 'Apple' },
      { id: 2, label: 'Banana' },
      { id: 3, label: 'Banana split' },
      { id: 4, label: 'Mango' },
    ]"
    placeholder="Please choose a fruit"
    label="Your first fruit"
    selected-items-label="Selected fruits"
    none-selected-label="No fruits selected" />

<p style="margin-top: var(--space-large);">If you have asynchronous data you can return it via a function:</p>
<lux-input-multiselect
    placeholder="Please choose your query"
    label="Your query"
    selected-items-label="Selected Queries"
    :asyncLoadItemsFunction="query => {if (query === '') return []; else return [{id: 'abc', label: query}]}"
    none-selected-label="No query selected" />

<p style="margin-top: var(--space-large);">If you have a specific way you'd like to display the items, you can pass it as a template into the item slot:</p>
<lux-input-multiselect :items="[
      { id: 1, label: 'Apple' },
      { id: 2, label: 'Banana' },
      { id: 3, label: 'Banana split' },
      { id: 4, label: 'Mango' },
    ]"
    label="Your second fruit"
    :hide-label="true">
  <template #item="{itemProps}">
    <lux-text-style style="display: flex">
      <lux-badge>{{itemProps.id}}</lux-badge>
      <span style="background-color:red;color:white;" v-if="itemProps.id === 1">Apples are delicious!  Good choice!</span>
      <span v-else>{{itemProps.label}}</span>
    </lux-text-style>
  </template>
</lux-input-multiselect>
</div>
