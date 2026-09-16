# LuxMenuBar

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `type` | The html element types used for the nav bar. Passing 'href' in menuItems will only work if type = "links". `links, buttons` | `String` | `"links"` |
| `active` | State which tab is active when initiated (using name of the component). | `String` | `-` |
| `menuItems` | Menu items are options to be displayed to the user.  They have several possible properties: <dl><dt><code>name</code></dt><dd>The text that is displayed for this menu item</dd> <dt><code>href</code></dt><dd>If the type is links or main-menu, the url that the menu item links to.</dd> <dt><code>target</code></dt><dd>If the type is links or main-menu, where to display the linked URL (for example, <code>_blank</code> for a new tab).</dd> <dt><code>children</code></dt><dd>An array of items that should display below the current item hierarchically.</dd> <dt><code>disabled</code></dt><dd>If the type is buttons, whether or not the button should be disabled.</dd> <dt><code>component</code></dt><dd>Optional. An identifier you can use in conjunction with the <code>active</code> prop.</dd> <dt><code>unsafe_name</code></dt><dd>Optional. If you need to include some arbitrary HTML in the menu item text, you can here and it will override the label provided in <code>name</code>.  Don't bind the <code>unsafe_name</code> property to any user-provided value, since it does not have Cross-Site Scripting protections (<code>name</code> does have these protections).</dd> <dt><code>method</code></dt><dd>Optional. For use in conjunction with Rails applications that use UJS to link to non-GET HTTP methods, like POST or DELETE.  To mimic a Rails link_to helper for an item, pass the HTTP method with a `method` property.</dd> </dl> | `Array` | `-` |
| `theme` | Whether the header is dark, shade, or light. Default is set to dark. | `String` | `"dark"` |

## Usage

```jsx
    <lux-menu-bar type="main-menu" active="Dashboard" :menu-items="[
      {name: 'Dashboard', component: 'Dashboard', href: '/example/'},
      {name: 'Posts', component: 'Posts', href: '/example/'},
      {name: 'Requests', component: 'Requests', href: '/example/', children: [
        {name: 'New Travel Request', component: 'New Travel Request', href: '/example/'},
        {name: 'New Leave Request', component: 'New Leave Request', href: '/example/'}
      ]},
      {name: 'Users', component: 'Users', href: '/example/', children: [
        {name: 'External Site', component: 'External Site', href: 'http://princeton.edu', target: '_blank'},
        {name: 'Settings', component: 'Settings', href: '/example/'},
        {name: 'Logout', component: 'Logout', href: '/example/'}
      ]}
    ]"/>

    <lux-menu-bar type="links" active="Dashboard" :menu-items="[
      {name: 'Logout', component: 'Logout', href: '/logout'}]" theme="light"/>
  ```
