<template>
  <lux-autocomplete-input
    :items="props.items"
    @selected="addSelected($event)"
    ref="autocomplete"
    :placeholder="placeholder"
  />
  <ul class="selected-items">
    <li v-for="item in selectedItems" :key="item" class="selected-item">
      <!--
        @slot item -- used to adjust the style and format of the items you have selected
          @binding {object} itemProps an individual item that you would like to style
      -->
      <slot name="item" :itemProps="item">{{ item.label }}</slot>
      <lux-input-button
        @button-clicked="removeItem(item)"
        type="button"
        variation="icon"
        icon="close"
        size="small"
        class="remove-item"
      >
      </lux-input-button>
    </li>
  </ul>
  <!--
  @slot hiddenInput -- useful for embedding this component into an HTML form
      @binding {array} selectedItems an array of items (objects) that the user has selected
  -->
  <slot name="hiddenInput" :selectedItems="selectedItems"></slot>
</template>
<script setup>
import LuxAutocompleteInput from "./LuxAutocompleteInput.vue"
import LuxInputButton from "./LuxInputButton.vue"
import { ref, useTemplateRef } from "vue"

const selectedItems = ref([])
const props = defineProps(["items", "placeholder"])
const autocompleteRef = useTemplateRef("autocomplete")

function addSelected(id) {
  const fullItem = props.items.find(item => item.id === id)
  selectedItems.value.push(fullItem)
  autocompleteRef.value.setResult("")
}

function removeItem(item) {
  const indexToRemove = selectedItems.value.indexOf(item)
  if (indexToRemove > -1) {
    selectedItems.value.splice(indexToRemove, 1)
  }
}
</script>
<style>
.selected-items {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  list-style-type: none;
  padding-left: 0;
  width: 100%;

  .selected-item {
    display: flex;
    padding: 0.25rem 0.75rem;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.25rem;
    background: var(--color-gray-10);
    width: 100%;
  }
}
</style>

<docs>
  ```jsx
    <div>
    <lux-input-multiselect :items="[
          { id: 1, label: 'Apple' },
          { id: 2, label: 'Banana' },
          { id: 3, label: 'Banana split' },
          { id: 4, label: 'Mango' },
        ]" placeholder="Please choose a fruit" />
    <p>If you have a specific way you'd like to display the items, you can pass it as a template into the item slot:</p>
    <lux-input-multiselect :items="[
          { id: 1, label: 'Apple' },
          { id: 2, label: 'Banana' },
          { id: 3, label: 'Banana split' },
          { id: 4, label: 'Mango' },
        ]">
      <template #item="{itemProps}">
        <lux-text-style style="display: flex">
          <lux-badge>{{itemProps.id}}</lux-badge>
          <span style="background-color:red;color:white;" v-if="itemProps.id === 1">Apples are delicious!  Good choice!</span>
          <span v-else>{{itemProps.label}}</span>
        </lux-text-style>
      </template>
    </lux-input-multiselect>
    </div>
  ```
</docs>
