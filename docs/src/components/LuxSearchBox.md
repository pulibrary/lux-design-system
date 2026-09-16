# LuxSearchBox

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `type` | The html element name used for the container | `String` | `"div"` |
| `name` | The name of the input, which will be part of the URL after the search is submitted. | `String` | `"query"` |
| `corners` | Whether the corners should be rounded (default) or square. | `String` | `"rounded"` |

## Usage

```jsx
    <div>
    <lux-search-box corners="square">
        <lux-input-text id="foo" name="value" label="Search" :hide-label="true" placeholder="Find all the things" size="large"></lux-input-text>
        <lux-input-button type="button" variation="icon" size="medium" icon="search"></lux-input-button>
    </lux-search-box>
    </div>

    <div>
      <!-- rounded is the default -->
      <lux-search-box corners="rounded">
      </lux-search-box>
    </div>
```
