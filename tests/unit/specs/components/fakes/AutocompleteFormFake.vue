<template>
  <form @submit="$emit('submitted')">
    <lux-autocomplete-input
      label="Animals"
      default-value="crocodile"
      :items="['aardvark', 'bear', 'crocodile']"
    >
    </lux-autocomplete-input>
  </form>
</template>
<script setup>
import LuxAutocompleteInput from "@/components/LuxAutocompleteInput.vue"
const emit = defineEmits(["submitted"])
</script>
