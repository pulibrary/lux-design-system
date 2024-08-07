<template>
  <span v-if="item.unsafe_name" v-html="item.unsafe_name"></span
  ><template v-else>{{ item.name }}</template>
</template>
<script setup>
defineProps({
  item: Object,
})
</script>
<docs>
  ```jsx
    <ul>
    <li><lux-menu-bar-label :item="
    {name: 'Logout', href: '/logout'}
    "/></li>
    <li><lux-menu-bar-label :item="
    {unsafe_name: 'Bookmarks <strong>(1 / 3)</strong>', href: '/logout'}
    "/></li>
  ```
  Security considerations:
  <ul>
    <li>You can add any arbitrary HTML to the <code>unsafe_name</code> property,
      and it will be rendered for the user.  If you don't need to add arbitrary
      HTML, use the <code>name</code> property instead.  Don't bind the
      <code>unsafe_name</code> property to any user-provided value, since it does
      not have Cross-Site Scripting protections (<code>name</code> does have these
      protections).
    </li>
  </ul> 
</docs>
