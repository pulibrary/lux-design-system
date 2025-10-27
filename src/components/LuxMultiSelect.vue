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
  />
</template>
<script setup>
import LuxAutocompleteInput from "./LuxAutocompleteInput.vue"
</script>
