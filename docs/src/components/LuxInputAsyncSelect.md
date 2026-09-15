# LuxInputAsyncSelect

> This component can be utilized to provide asynchronous data to a LuxAutocompleteInput.

    This component only allows the user to choose one option from the list.
    When the user types into the search box asyncLoadItemsFunction is triggered to get the options shown to the user.

    - Utilize LuxInputSelect if you have a small number of static options for the user to scroll through.
      LuxInputSelect allows for a static list of options.
    - Utilize LuxAutocompleteInput if you want to allow the user to search a static list of options, not just scroll them.
      LuxAutocompleteInput allows for a static list of options.
    - Utilize LuxInputMultiselect if you want to allow the user to select multiple options.
      LuxInputMultiselect allows for both a static list or an asynchronous list of options.

## Props

| Prop name              | Description                                                                                                               | Type    | Values | Default |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| asyncLoadItemsFunction | A function to load items asynchronously on user input. It should return an item list in the format [{id: "", label: ""}]. | func    | -      |         |
| placeholder            | Placeholder text to display                                                                                               | string  | -      |         |
| label                  | The label of the form input field.                                                                                        | string  | -      |         |
| hideLabel              | Visually hides the label of the form input field.                                                                         | boolean | -      | false   |
| debounceTimeout        | The milliseconds to wait for more user input before sending the query                                                     | number  | -      | 500     |
| defaultValue           | The default value for the form input field.                                                                               | object  | -      |         |
| searchOnEmptyQuery     | Should we run a search when a user clicks into the component                                                              | boolean | -      | false   |

## Slots

| Name         | Description                                                                                                        | Bindings                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| hidden-input | hidden-input -- You can use this to pass the user's selected value back to the backend (e.g. Rails) on form submit | **selectedItem** `string` - an array of items (objects) that the user has selected |

---

```jsx
    <div>
      <lux-input-async-select
          placeholder="Please choose your query"
          label="Your query"
          :asyncLoadItemsFunction="query => [{id: 'abc', label: query}]"
          none-selected-label="No query selected" />
    </div>
```
