<!-- FormFake.vue -->
<script setup>
import { ref } from "vue"
import LuxAutocompleteInput from "@/components/LuxAutocompleteInput.vue"

const form = ref({
  email: "",
  description: "",
  city: "",
  subscribe: false,
  interval: "",
  animals: "",
})
const emit = defineEmits(["submit"])

const submit = () => {
  emit("submit", { ...form.value })
}
</script>

<template>
  <form @submit="submit">
    <lux-autocomplete-input
      id="animals"
      label="Animals"
      default-value="crocodile"
      :items="[
        { id: 1, label: 'aardvark' },
        { id: 2, label: 'bear' },
        { id: 3, label: 'crocodile' },
      ]"
      @selected="item => (form.animals = item)"
    >
    </lux-autocomplete-input>

    <input type="email" v-model="form.email" />

    <textarea v-model="form.description" />

    <select v-model="form.city">
      <option value="new-york">New York</option>
      <option value="moscow">Moscow</option>
    </select>

    <input type="checkbox" v-model="form.subscribe" />

    <input type="radio" value="weekly" v-model="form.interval" />
    <input type="radio" value="monthly" v-model="form.interval" />

    <button type="submit">Submit</button>
  </form>
</template>
