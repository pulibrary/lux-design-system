# LuxAutocompleteInput

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `items` | The available items in the autocomplete. This can be a simple array of strings or an array of objects with an id and a label, if id is needed. | `Array` | `-` |
| `placeholder` | The placeholder value for the form input field. | `String` | `null` |
| `defaultValue` | The default value for the form input field. | `String` | `""` |
| `label` | The label of the form input field. | `String` | `""` |
| `hideLabel` | Visually hides the label of the form input field. | `Boolean` | `false` |
| `id` | The id of the hidden form input field (which will contain the selected value) | `String` | `""` |
| `displayId` | The id of the visible form input field (where the user will enter their text) | `String` | `-` |
| `name` | The name of the form input field. | `String` | `""` |
| `isAsync` | Is the data given by an outside ajax request? | `Boolean` | `false` |
| `required` | Whether the form input field is required or not. `true, false` | `Boolean` | `false` |
| `focused` | Whether the input is focused or not `true, false` | `Boolean` | `false` |

## Usage

```jsx
    <div>
    <lux-autocomplete-input label="Fruit" default-value="Banana" :items="[ 'Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Peach', 'Grape', 'Tangerine', 'Pineapple']" />
    <lux-autocomplete-input label="Fruit with IDs" default-value="Banana" :items="[ {id: 1, label: 'Apple'}, {id: 2, label: 'Banana'}, {id: 3, label: 'Mango'}, {id: 4, label: 'Pineapple'}]" />
    </div>
  ```
