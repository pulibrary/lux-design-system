# LuxSearchBox

> The SearchBox is a wrapper for an input group consisting of an
> InputText and InputButton. It has a default look and feel,
> which you can override by placing your own input and button
> within the default slot.

The default searchbox implements `v-model`. If you override
the default searchbox, you will have to implement it yourself.

## Props

| Prop name | Description                                                                             | Type   | Values              | Default   |
| --------- | --------------------------------------------------------------------------------------- | ------ | ------------------- | --------- |
| type      | The html element name used for the container                                            | string | -                   | "div"     |
| name      | The name of the input, which will be part of<br/>the URL after the search is submitted. | string | -                   | "query"   |
| corners   | Whether the corners should be rounded (default)<br/>or square.                          | string | `rounded`, `square` | "rounded" |

## Slots

| Name    | Description               | Bindings |
| ------- | ------------------------- | -------- |
| default | The input and its button. |          |

---

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
