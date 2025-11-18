<template>
  <div class="autocomplete-container">
    <lux-autocomplete-input
      :items="allCurrentItems"
      @selected="setSelected($event)"
      @input="debounceFindNew($event)"
      ref="autocomplete"
      :placeholder="placeholder"
      :label="label"
      :hide-label="hideLabel"
      :isAsync="isAsync"
      :defaultValue="defaultValue?.label"
    />
    <lux-icon-base class="search-icon"><lux-icon-search></lux-icon-search></lux-icon-base>
  </div>
  <!--
  @slot hidden_input -- You can use this to pass the user's selected value back to the backend (e.g. Rails) on form submit
      @binding {string} selectedItem an array of items (objects) that the user has selected
  -->
  <slot name="hidden_input" :selectedItem="selectedItem"></slot>
</template>
<script setup>
import LuxAutocompleteInput from "./LuxAutocompleteInput.vue"
import LuxIconBase from "./icons/LuxIconBase.vue"
import LuxIconSearch from "./icons/LuxIconSearch.vue"
import { computed, ref, useTemplateRef } from "vue"

/** 
    This component can be utilized to provide asynchronous data to a LuxAutocompleteInput.
    This component only allows the user to choose one option from the list.
    When the user types into the search box asyncLoadItemsFunction is triggered to get the options shown to the user.

    - Utilize LuxInputSelect if you have a small number of static options for the user to scroll through.
      LuxInputSelect allows for a static list of options.
    - Utilize LuxAutocompleteInput if you want to allow the user to search a static list of options, not just scroll them.
      LuxAutocompleteInput allows for a static list of options.
    - Utilize LuxInputMultiselect if you want to allow the user to select multiple options.
      LuxInputMultiselect allows for both a static list or an asynchronous list of options.

  */
defineOptions({ name: "LuxInputAsyncSelect" })

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

  /**
   * The milliseconds to wait for more user input before sending the query
   */
  debounceTimeout: {
    type: Number,
    default: 500,
  },

  /**
   * The default value for the form input field.
   */
  defaultValue: {
    type: Object,
  },
})
const autocompleteRef = useTemplateRef("autocomplete")
const allCurrentItems = ref([props.defaultValue])
const isAsync = computed(() => true)
const selectedItem = ref(props.defaultValue)

function setSelected(id) {
  console.log("id: ", id)
  const fullItem = allCurrentItems.value.find(item => item.id === id)
  selectedItem.value = fullItem
}

async function findNewItems(query) {
  allCurrentItems.value = await props.asyncLoadItemsFunction(query)
}

const debounceFindNew = debounce(findNewItems, props.debounceTimeout)

// Debounce function
function debounce(func, delay) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, delay)
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
