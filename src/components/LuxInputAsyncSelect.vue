<template>
  <div class="autocomplete-container">
    <lux-autocomplete-input
      :items="allCurrentItems"
      @selected="setSelected($event)"
      @input="findNewItems($event)"
      ref="autocomplete"
      :placeholder="placeholder"
      :label="label"
      :hide-label="hideLabel"
      :isAsync="isAsync"
    />
    <lux-icon-base class="search-icon"><lux-icon-search></lux-icon-search></lux-icon-base>
  </div>
  <!--
  @slot hiddenInput -- You can use this to pass the user's selected value back to the backend (e.g. Rails) on form submit
      @binding {string} selectedItem an array of items (objects) that the user has selected
  -->
  <slot name="hiddenInput" :selectedItem="selectedItem"></slot>
</template>
<script setup>
import LuxAutocompleteInput from "./LuxAutocompleteInput.vue"
import LuxIconBase from "./icons/LuxIconBase.vue"
import LuxIconSearch from "./icons/LuxIconSearch.vue"
import { computed, ref, useTemplateRef } from "vue"

defineOptions({ name: "LuxInputAsyncSelect" })

const selectedItem = ref(null)
const props = defineProps({
  /**
   * A function to load items asynchronously on user input. It should return an item list in the format [{id: "", label: ""}].
   */
  asyncLoadItemsFunction: {
    type: Function,
    required: true,
  },

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
})
const autocompleteRef = useTemplateRef("autocomplete")
const allCurrentItems = ref([])
const isAsync = computed(
  () => !(props.asyncLoadItemsFunction === undefined) && !(props.asyncLoadItemsFunction === null)
)

function setSelected(id) {
  const fullItem = allCurrentItems.value.find(item => item.id === id)
  selectedItem.value = fullItem.id
}

async function findNewItems(query) {
  if (!(props.asyncLoadItemsFunction === undefined) && !(props.asyncLoadItemsFunction === null)) {
    allCurrentItems.value = await props.asyncLoadItemsFunction(query)
  }
}
</script>
<style>
.autocomplete-container {
  position: relative;

  .lux-autocomplete-input {
    border: none;
    box-shadow: none;
  }

  input {
    padding-right: var(--space-large);
    border-radius: 8px;
    border: 1px solid var(--Neutral-Medium-Gray, #d0d0d0);
    background: var(--Neutral-White, #fff);
  }

  input::placeholder {
    color: var(--color-gray-80);
  }
}
.search-icon {
  position: absolute;
  top: calc(100% - 36px);
  right: var(--space-x-small);
}
</style>

<docs>
  ```jsx
    <div>
      <lux-input-async-select
          placeholder="Please choose your query"
          label="Your query"
          :asyncLoadItemsFunction="query => [{id: 'abc', label: query}]"
          none-selected-label="No query selected" />
    </div>
  ```
</docs>
