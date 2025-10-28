<template>
  <div>hello!</div>
  <lux-autocomplete-input
    label="Fruit"
    default-value="Banana"
    :items="[
      'Apple',
      'Banana',
      'Banana split',
      'Orange',
      'Mango',
      'Pear',
      'Peach',
      'Grape',
      'Tangerine',
      'Pineapple',
    ]"
    @selected="addSelected(id)"
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

function addSelected(id) {
  selectedItems.value.push(id)
}
</script>
