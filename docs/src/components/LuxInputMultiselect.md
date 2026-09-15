# LuxInputMultiselect

## Props

| Prop name              | Description                                                                                                               | Type    | Values | Default         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | --------------- |
| items                  | An array of items. Each item should be an object with (at minimum) an id and label property.                              | array   | -      | []              |
| asyncLoadItemsFunction | A function to load items asynchronously on user input. It should return an item list in the format [{id: "", label: ""}]. | func    | -      | null            |
| placeholder            | Placeholder text to display                                                                                               | string  | -      |                 |
| label                  | The label of the form input field.                                                                                        | string  | -      |                 |
| hideLabel              | Visually hides the label of the form input field.                                                                         | boolean | -      | false           |
| noneSelectedLabel      | Text to display if the user hasn't selected anything yet                                                                  | string  | -      | "None selected" |
| selectedItemsLabel     | Label for the summary of items that the user has selected so far                                                          | string  | -      |                 |
| debounceTimeout        | The milliseconds to wait for more user input before sending the query                                                     | number  | -      | 500             |
| defaultValues          | The default selected items. It should be an array in the format [{id: "", label: ""}]                                     | array   | -      | []              |
| searchOnEmptyQuery     | Should we run a search when a user clicks into the component                                                              | boolean | -      | false           |

## Slots

| Name         | Description                                                                                                                | Bindings                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| item         | item -- used to adjust the style and format of the items you have selected                                                 | **itemProps** `object` - an individual item that you would like to style           |
| hidden-input | hidden-input -- You can use this to pass all of the user's selected values back to the backend (e.g. Rails) on form submit | **selectedItems** `array` - an array of items (objects) that the user has selected |

---

```jsx
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
```
