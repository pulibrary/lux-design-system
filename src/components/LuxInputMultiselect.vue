<template>
  <div>hello!</div>
  <lux-autocomplete-input
    label="Fruit"
    default-value="Banana"
    :items="items"
    @selected="addSelected($event)"
  />
  <ul id="selected">
    <li v-for="item in selectedItems" :key="item">
      {{ item }}
    </li>
  </ul>
</template>
<script setup>
import LuxAutocompleteInput from "./LuxAutocompleteInput.vue"
import { ref } from "vue"

const selectedItems = ref([])
const items = [
  { id: 1, label: "Apple" },
  { id: 2, label: "Banana" },
  { id: 3, label: "Banana split" },
  { id: 4, label: "Mango" },
]

function addSelected(id) {
  const fullItem = items.find(item => item.id === id)
  selectedItems.value.push(fullItem.label)
}
</script>

<docs>
  ```jsx
    <div>
    Here is our new example:
    <lux-multi-select />
    </div>
  ```
</docs>
