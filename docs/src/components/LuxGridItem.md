# LuxGridItem

> Used to build the containers to layout a page. Grid items need to be nested inside a `GridContainer`
> component. Do not nest grid items inside other grid items.

## Props

| Prop name | Description                                                                                                                                                                                                                                                                                            | Type    | Values | Default |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------ | ------- |
| type      | The html element name used for the container.                                                                                                                                                                                                                                                          | string  | -      | "div"   |
| columns   | Sets the size of the column. Prefix with `sm-` or `lg-`. Based on a 12 column grid.<br/>The inclusion of `auto` will set that grid item to have a width based on the width and height of the content.<br/>The inclusion of `fill` will set the grid item to have a width based on the space available. | string  | -      | ""      |
| order     | Sets the order to lay out an item in a grid container.                                                                                                                                                                                                                                                 | string  | -      | ""      |
| offset    | Pushes grid items to the right side of the container.                                                                                                                                                                                                                                                  | boolean | -      | false   |
| vertical  | Sets the vertical alignment of the item. `start`, `center`, or `end`. For horizontal alignment, please look at the grid-container component.                                                                                                                                                           | string  | -      | ""      |

## Slots

| Name    | Description                    | Bindings |
| ------- | ------------------------------ | -------- |
| default | The content of your grid item. |          |

---

```jsx
    <div>
      <lux-grid-container>
        <lux-grid-item columns="lg-9 sm-6">Grid items can be used to layout a page using a 12 column grid.</lux-grid-item>
        <!-- passing "auto" as a value in columns will size the grid item based on width and height of the item with space between each grid item -->
        <lux-grid-item columns="lg-3 sm-6 auto" :offset="true">
          <lux-dropdown-menu type="links" button-label="Select Options" :menu-items="[
            {name: 'Vegetable', component: 'Vegetable', disabled: true},
            {name: 'Fruit', component: 'Fruit'},
            {name: 'Apple', component: 'Apple', parent: 'Fruit'},
            {name: 'Lettuce', component: 'Lettuce', parent: 'Vegetable'},
            {name: 'Carrot', component: 'Carrot', parent: 'Vegetable'},
            {name: 'Pear', component: 'Pear', parent: 'Fruit'},
          ]"></lux-dropdown-menu>
        </lux-grid-item>
      </lux-grid-container>

      <!-- inline styling for demonstration purposes only -->
      <lux-grid-container horizontal="center" style="height:200px;">
        <lux-grid-item columns="lg-3" vertical="start" style="border: 1px solid black; padding: 1rem;">Grid items can be used to layout a page using a 12 column grid.</lux-grid-item>
        <lux-grid-item columns="lg-3 auto" vertical="center" style="border: 1px solid black; padding: 1rem;" :offset="true">Grid items can be used to layout a page using a 12 column grid.</lux-grid-item>
        <lux-grid-item columns="lg-3" vertical="end" style="border: 1px solid black; padding: 1rem;">Grid items can be used to layout a page using a 12 column grid.</lux-grid-item>
      </lux-grid-container>

      <!-- inline styling for demonstration purposes only -->
      <lux-grid-container horizontal="center" style="height:200px;">
        <lux-grid-item columns="lg-3" order="order-sm-3 order-lg-1" vertical="start" style="border: 1px solid black; padding: 1rem;">First - Grid items can be used to layout a page using a 12 column grid.</lux-grid-item>
        <lux-grid-item columns="lg-3 auto" order="order-sm-2 order-lg-2" vertical="center" style="border: 1px solid black; padding: 1rem;" :offset="true">Second - Grid items can be used to layout a page using a 12 column grid.</lux-grid-item>
        <lux-grid-item columns="lg-3" order="order-sm-1 order-lg-3" vertical="end" style="border: 1px solid black; padding: 1rem;">Third - Grid items can be used to layout a page using a 12 column grid.</lux-grid-item>
      </lux-grid-container>
    </div>
```
