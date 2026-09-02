# LuxDropdownMenu

> Dropdowns allows a user to select a value from a series of options. Note that a simple,
> two-level hierarchy (not recursive) is possible by adding a `children` property
> to the item and supplying sub-items using the same syntax as the top level items.

## Props

| Prop name   | Description                                                                                                                         | Type   | Values | Default    |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ---------- |
| element     |                                                                                                                                     | string | -      | "div"      |
| buttonLabel | The menu items in the dropdown                                                                                                      | string | -      | "Dropdown" |
| type        | Whether the dropdown includes links or buttons as menu items<br/>`links, buttons`                                                   | string | -      | "buttons"  |
| menuItems   | An array of item (and sub-item) options for the DropdownMenu. Properties<br/>for menuItems are described in the LuxMenuBar pattern. | array  | -      | ["div"]    |
| align       | Alignment of menu items (not currently working)<br/>`left, right`                                                                   | string | -      | "left"     |
| size        | Sets the size of the dropdown menu area `small, medium, large`                                                                      | string | -      | "medium"   |

## Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| button-clicked    |            |
| menu-item-clicked |            |

---

```jsx
    <lux-dropdown-menu type="links" button-label="Select Options" :menu-items="[
      {name: 'Vegetable'},
      {name: 'Fruit', children: [
        {name: 'Apple'},
        {name: 'Pear'},
      ]},
    ]">
    </lux-dropdown-menu>
```
