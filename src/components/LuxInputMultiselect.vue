<template>
  <div class="autocomplete-container">
    <lux-autocomplete-input
      :items="props.items"
      @selected="addSelected($event)"
      ref="autocomplete"
      :placeholder="placeholder"
      :label="label"
      :hide-label="hideLabel"
    />
    <lux-icon-base class="search-icon"><lux-icon-search></lux-icon-search></lux-icon-base>
  </div>
  <span v-if="selectedItemsLabel" class="selected-item">{{ selectedItemsLabel }}</span>
  <ul class="selected-items">
    <li v-if="selectedItems.length == 0" class="selected-item">{{ noneSelectedLabel }}</li>
    <li v-else v-for="item in selectedItems" :key="item" class="selected-item">
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
  @slot hiddenInput -- You can use this to pass all of the user's selected values back to the backend (e.g. Rails) on form submit
      @binding {array} selectedItems an array of items (objects) that the user has selected
  -->
  <slot name="hiddenInput" :selectedItems="selectedItems"></slot>
</template>
<script setup>
import LuxAutocompleteInput from "./LuxAutocompleteInput.vue"
import LuxIconBase from "./icons/LuxIconBase.vue"
import LuxIconSearch from "./icons/LuxIconSearch.vue"
import LuxInputButton from "./LuxInputButton.vue"
import { ref, useTemplateRef } from "vue"

const selectedItems = ref([])
const props = defineProps({
  /**
   * An array of items.  Each item should be an object with (at minimum) an id and label property.
   */
  items: Array,

  /**
   * Placeholder text to display
   */
  placeholder: String,

  /**
   * The label of the form input field.
   */
  label: {
    type: String,
    required: true,
  },

  /**
   * Visually hides the label of the form input field.
   */
  hideLabel: {
    type: Boolean,
    default: false,
  },

  /**
   * Text to display if the user hasn't selected anything yet
   */
  noneSelectedLabel: {
    type: String,
    default: "None selected",
  },

  /**
   * Label for the summary of items that the user has selected so far
   */
  selectedItemsLabel: String,
})
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
.autocomplete-container {
  position: relative;

  input {
    padding-right: var(--space-large);
  }
}
.search-icon {
  position: absolute;
  top: calc(100% - 36px);
  right: var(--space-x-small);
}
.selected-items {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-xx-small);
  list-style-type: none;
  padding-left: 0;
  width: 100%;

  .selected-item {
    display: flex;
    padding: var(--space-xx-small) 0.75rem;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.25rem;
    background: var(--color-gray-10);
    width: 100%;
  }

  .selected-items-label {
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-x-small);
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
        ]"
        placeholder="Please choose a fruit"
        label="Your first fruit"
        selected-items-label="Selected fruits"
        none-selected-label="No fruits selected" />
    <p style="margin-top: var(--space-large);">If you have a specific way you'd like to display the items, you can pass it as a template into the item slot:</p>
    <lux-input-multiselect :items="[
          { id: 1, label: 'Apple' },
          { id: 2, label: 'Banana' },
          { id: 3, label: 'Banana split' },
          { id: 4, label: 'Mango' },
        ]"
        label="Your second fruit"
        hide-label="true">
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
