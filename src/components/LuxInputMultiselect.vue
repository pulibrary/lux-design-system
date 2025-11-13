<template>
  <div class="autocomplete-container">
    <lux-autocomplete-input
      :items="unselectedItems"
      @selected="addSelected($event)"
      @input="findNewItems($event)"
      ref="autocomplete"
      :placeholder="placeholder"
      :label="label"
      :hide-label="hideLabel"
      :isAsync="isAsync"
    />
    <lux-icon-base class="search-icon"><lux-icon-search></lux-icon-search></lux-icon-base>
  </div>
  <div class="selected-items-frame">
    <span v-if="selectedItemsLabel" class="selected-items-label">{{ selectedItemsLabel }}</span>
    <ul class="selected-items">
      <li v-if="selectedItems.length == 0" class="selected-item">
        <div class="info">
          <div class="info-text">{{ noneSelectedLabel }}</div>
        </div>
      </li>
      <li v-else v-for="item in selectedItems" :key="item" class="selected-item">
        <!--
          @slot item -- used to adjust the style and format of the items you have selected
            @binding {object} itemProps an individual item that you would like to style
        -->
        <slot name="item" :itemProps="item">
          <div class="info">
            <lux-badge class="badge">
              <div class="badge-text">{{ item.id }}</div>
            </lux-badge>
            <div class="item-text">{{ item.label }}</div>
          </div>
        </slot>
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
  </div>
  <!--
  @slot hiddenInput -- You can use this to pass all of the user's selected values back to the backend (e.g. Rails) on form submit
      @binding {array} selectedItems an array of items (objects) that the user has selected
  -->
  <slot name="hiddenInput" :selectedItems="selectedItems"></slot>
</template>
<script setup>
import LuxAutocompleteInput from "./LuxAutocompleteInput.vue"
import LuxBadge from "./LuxBadge.vue"
import LuxIconBase from "./icons/LuxIconBase.vue"
import LuxIconSearch from "./icons/LuxIconSearch.vue"
import LuxInputButton from "./LuxInputButton.vue"
import { computed, ref, useTemplateRef } from "vue"

defineOptions({ name: "LuxInputMultiselect" })

const selectedItems = ref([])
const props = defineProps({
  /**
   * An array of items.  Each item should be an object with (at minimum) an id and label property.
   */
  items: {
    type: Array,
    default: () => [],
  },

  /**
   * A function to load items asynchronously on user input. It should return an item list in the format [{id: "", label: ""}].
   */
  asyncLoadItemsFunction: {
    type: Function,
    default: null,
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
const allCurrentItems = ref(props.items)
const unselectedItems = computed(() =>
  allCurrentItems.value.filter(item => !selectedItems.value.includes(item))
)
const isAsync = computed(
  () => !(props.asyncLoadItemsFunction === undefined) && !(props.asyncLoadItemsFunction === null)
)

function addSelected(id) {
  const fullItem = allCurrentItems.value.find(item => item.id === id)
  selectedItems.value.push(fullItem)
  autocompleteRef.value.setResult("")
  if (props.isAsync) allCurrentItems = []
}

function removeItem(item) {
  const indexToRemove = selectedItems.value.indexOf(item)
  if (indexToRemove > -1) {
    selectedItems.value.splice(indexToRemove, 1)
  }
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
.selected-items-frame {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;

  .selected-items-label {
    align-self: stretch;
    font-weight: var(--font-weight-semi-bold);
    font-size: var(--font-size-x-small);
  }
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
    .info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex: 1 0 0;

      .badge {
        display: flex;
        min-width: 3.125rem;
        padding: 0.125rem 0.5rem;
        justify-content: center;
        align-items: center;
        border-radius: 0.75rem;
        background: var(--color-white);

        .badge-text {
          color: var(--color-gray-100);
          text-align: center;
          font-size: var(--font-size-xx-small);
          line-height: 150%; /* 150% */
        }
      }

      .info-text {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        flex: 1 0 0;
        overflow: hidden;
        color: var(--color-gray-80);
        text-overflow: ellipsis;

        font-size: var(--font-size-small);
        line-height: 150%;
      }
    }

    .remove-item {
      background: var(--color-gray-10);
    }
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

    <p style="margin-top: var(--space-large);">If you have asynchronous data you can return it via a function:</p>
    <lux-input-multiselect
        placeholder="Please choose your query"
        label="Your query"
        selected-items-label="Selected Queries"
        :asyncLoadItemsFunction="query => {if (query === '') return []; else return [{id: 'abc', label: query}]}"
        none-selected-label="No query selected" />

    <p style="margin-top: var(--space-large);">If you have a specific way you'd like to display the items, you can pass it as a template into the item slot:</p>
    <lux-input-multiselect :items="[
          { id: 1, label: 'Apple' },
          { id: 2, label: 'Banana' },
          { id: 3, label: 'Banana split' },
          { id: 4, label: 'Mango' },
        ]"
        label="Your second fruit"
        :hide-label="true">
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
