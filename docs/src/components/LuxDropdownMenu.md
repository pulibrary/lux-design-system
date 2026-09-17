# LuxDropdownMenu

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `element` | No description provided. | `String` | `"div"` |
| `buttonLabel` | The menu items in the dropdown | `String` | `"Dropdown"` |
| `type` | Whether the dropdown includes links or buttons as menu items `links, buttons` | `String` | `"buttons"` |
| `menuItems` | An array of item (and sub-item) options for the DropdownMenu. Properties for menuItems are described in the LuxMenuBar pattern. | `Array` | `-` |
| `align` | Alignment of menu items (not currently working) `left, right` | `String` | `"left"` |
| `size` | Sets the size of the dropdown menu area `small, medium, large` | `String` | `"medium"` |

## Usage

<lux-dropdown-menu type="links" button-label="Select Options" :menu-items="[
  {name: 'Vegetable'},
  {name: 'Fruit', children: [
    {name: 'Apple'},
    {name: 'Pear'},
  ]},
]">
</lux-dropdown-menu>
