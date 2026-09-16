# LuxInputAsyncSelect

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `asyncLoadItemsFunction` | A function to load items asynchronously on user input. It should return an item list in the format [{id: "", label: ""}]. | `Function` | `-` |
| `placeholder` | Placeholder text to display | `String` | `-` |
| `label` | The label of the form input field. | `String` | `-` |
| `hideLabel` | Visually hides the label of the form input field. | `Boolean` | `false` |
| `debounceTimeout` | The milliseconds to wait for more user input before sending the query | `Number` | `500` |
| `defaultValue` | The default value for the form input field. | `Object` | `-` |
| `searchOnEmptyQuery` | Should we run a search when a user clicks into the component | `Boolean` | `false` |

## Usage

```jsx
    <div>
      <lux-input-async-select
          placeholder="Please choose your query"
          label="Your query"
          :asyncLoadItemsFunction="query => [{id: 'abc', label: query}]"
          none-selected-label="No query selected" />
    </div>
  ```
