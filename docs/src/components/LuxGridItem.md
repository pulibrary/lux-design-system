# LuxGridItem

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `type` | The html element name used for the container. | `String` | `"div"` |
| `columns` | Sets the size of the column. Prefix with `sm-` or `lg-`. Based on a 12 column grid. The inclusion of `auto` will set that grid item to have a width based on the width and height of the content. The inclusion of `fill` will set the grid item to have a width based on the space available. | `String` | `""` |
| `order` | Sets the order to lay out an item in a grid container. | `String` | `""` |
| `offset` | Pushes grid items to the right side of the container. | `Boolean` | `false` |
| `vertical` | Sets the vertical alignment of the item. `start`, `center`, or `end`. For horizontal alignment, please look at the grid-container component. | `String` | `""` |

## Usage

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
