# LuxAutocompleteInput

> InputAutocomplete is a cross between a text input and select input.
> This component is used to offer users suggested values that
> filter upon typing, while also allowing them to enter free-form text for the value.
> The id and name supplied to this component are applied to a hidden input field, which
> will contain the preferred value for submission based on the structure of the `items` prop.

## Props

| Prop name    | Description                                                                                                                                        | Type    | Values | Default |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| items        | The available items in the autocomplete. This can be a simple array of strings<br/>or an array of objects with an id and a label, if id is needed. | array   | -      | [""]    |
| placeholder  | The placeholder value for the form input field.                                                                                                    | string  | -      | null    |
| defaultValue | The default value for the form input field.                                                                                                        | string  | -      | ""      |
| label        | The label of the form input field.                                                                                                                 | string  | -      | ""      |
| hideLabel    | Visually hides the label of the form input field.                                                                                                  | boolean | -      | false   |
| id           | The id of the hidden form input field (which will contain the selected value)                                                                      | string  | -      | ""      |
| displayId    | The id of the visible form input field (where the user will enter their text)                                                                      | string  | -      |         |
| name         | The name of the form input field.                                                                                                                  | string  | -      | ""      |
| isAsync      | Is the data given by an outside ajax request?                                                                                                      | boolean | -      | false   |
| required     | Whether the form input field is required or not.<br/>`true, false`                                                                                 | boolean | -      | false   |
| focused      | Whether the input is focused or not<br/>`true, false`                                                                                              | boolean | -      | false   |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| input      |            |
| selected   |            |

## Expose

### setResult

>

---

```jsx
    <div>
    <lux-autocomplete-input label="Fruit" default-value="Banana" :items="[ 'Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Peach', 'Grape', 'Tangerine', 'Pineapple']" />
    <lux-autocomplete-input label="Fruit with IDs" default-value="Banana" :items="[ {id: 1, label: 'Apple'}, {id: 2, label: 'Banana'}, {id: 3, label: 'Mango'}, {id: 4, label: 'Pineapple'}]" />
    </div>
```
