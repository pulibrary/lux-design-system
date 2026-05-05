<template>
  <div class="lux-autocomplete" ref="root">
    <label v-if="label" :class="{ 'lux-hidden': hideLabel }" :for="displayInputDomId">{{
      label
    }}</label>
    <div class="lux-autocomplete-input">
      <input
        :id="displayInputDomId"
        role="combobox"
        autocomplete="off"
        ref="autoComplete"
        type="text"
        @input="onChange"
        @click="onChange"
        @focus="onChange"
        v-model="search"
        @keydown.down.prevent="onArrowDown"
        @keydown.up.prevent="onArrowUp"
        @keydown.enter.prevent="onEnter"
        @keydown.esc="onEscape"
        @keydown.tab="onEscape"
        @blur="onEscape"
        :required="required"
        :aria-activedescendant="ariaActiveDescendant"
        :placeholder="placeholder"
        class="displayInput"
      />
      <ul v-show="isOpen" class="lux-autocomplete-results">
        <li class="loading" v-if="isLoading">Loading results...</li>
        <li
          v-else
          v-for="(result, i) in results"
          :key="i"
          @mousedown="onClickResult(result)"
          class="lux-autocomplete-result"
          :class="{ 'is-active': i === arrowCounter }"
          :id="'lux-autocomplete-' + componentId + 'result-' + i"
        >
          {{ result }}
        </li>
      </ul>
      <input :name="name" :id="id" type="hidden" :value="inputValue" data-input-value />
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  defineEmits,
  defineExpose,
  defineOptions,
  ref,
  useId,
  useTemplateRef,
  watch,
  nextTick,
  onMounted,
  onUnmounted,
  toRef,
} from "vue"

/**
 * InputAutocomplete is a cross between a text input and select input.
 * This component is used to offer users suggested values that
 * filter upon typing, while also allowing them to enter free-form text for the value.
 * The id and name supplied to this component are applied to a hidden input field, which
 * will contain the preferred value for submission based on the structure of the `items` prop.
 */
defineOptions({
  name: "LuxAutocompleteInput",
  status: "prototype",
  release: "1.0.0",
  type: "Element",
})

const ariaActiveDescendant = computed(() => {
  if (arrowCounter.value < 0) {
    return null
  } else {
    return `lux-autocomplete-${componentId}result-${arrowCounter.value}`
  }
})

onMounted(() => document.addEventListener("click", handleClickOutside))
onUnmounted(() => document.removeEventListener("click", handleClickOutside))

const isOpen = ref(false)
const isLoading = ref(false)

const search = ref("")
const arrowCounter = ref(-1)
const results = ref([])

const props = defineProps({
  /**
   * The available items in the autocomplete. This can be a simple array of strings
   * or an array of objects with an id and a label, if id is needed.
   */
  items: {
    type: Array,
    required: false,
    default() {
      return [""]
    },
  },
  /**
   * The placeholder value for the form input field.
   */
  placeholder: {
    type: String,
    default: null,
  },
  /**
   * The default value for the form input field.
   */
  defaultValue: {
    type: String,
    default: "",
  },
  /**
   * The label of the form input field.
   */
  label: {
    type: String,
    default: "",
  },
  /**
   * Visually hides the label of the form input field.
   */
  hideLabel: {
    type: Boolean,
    default: false,
  },
  /**
   * The id of the hidden form input field (which will contain the selected value)
   */
  id: {
    type: String,
    default: "",
  },
  /**
   * The id of the visible form input field (where the user will enter their text)
   */
  displayId: {
    type: String,
  },
  /**
   * The name of the form input field.
   */
  name: {
    type: String,
    default: "",
  },
  /**
   * Is the data given by an outside ajax request?
   */
  isAsync: {
    type: Boolean,
    required: false,
    default: false,
  },
  /**
   * Whether the form input field is required or not.
   * `true, false`
   */
  required: {
    type: Boolean,
    default: false,
  },
  /**
   * Whether the input is focused or not
   * `true, false`
   */
  focused: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["input", "selected"])
function emitSelectedId(id) {
  /**
   * Emitted when the user selects an "official" value from the list of supplied terms
   */
  emit("selected", id)
}

function onChange() {
  // Let's warn the parent that a change was made
  /**
   * Emitted on any input-like action that the user does: focusing the input, typing, etc.
   */
  emit("input", search.value)

  // Is the data given by an outside ajax request?
  if (props.isAsync) {
    isLoading.value = true
  } else {
    // Data is sync, we can search our flat array
    filterResults()
  }
  isOpen.value = true
}
function filterResults() {
  if (props.items.length && typeof props.items[0] === "object") {
    const preResults = props.items.filter(
      item => item.label.toLowerCase().indexOf(search.value.toLowerCase()) > -1
    )
    results.value = preResults.map(x => x.label)
  } else {
    results.value = props.items.filter(
      item => item.toLowerCase().indexOf(search.value.toLowerCase()) > -1
    )
  }
}
const inputValue = ref("")
function setResult(result, onSelectCallback = id => {}) {
  search.value = result
  inputValue.value = result
  isOpen.value = false

  if (props.items.length && typeof props.items[0] === "object") {
    // we need to search the input list for a matching label and return
    // an id if it's found
    let item = props.items.find(obj => {
      return obj.label === result
    })
    if (typeof item !== "undefined") {
      inputValue.value = item.id
      onSelectCallback(item.id)
    }
  }
}
function onArrowDown() {
  if (arrowCounter.value < results.value.length - 1) {
    arrowCounter.value++
    scrollToActiveItem()
  }
}
function onArrowUp() {
  if (arrowCounter.value > 0) {
    arrowCounter.value--
    scrollToActiveItem()
  }
}
function onEnter() {
  setResult(results.value[arrowCounter.value], emitSelectedId)
  isOpen.value = false
  arrowCounter.value = -1
}

function onEscape() {
  setResult(search.value)
  isOpen.value = false
}
function onClickResult(result) {
  setResult(result, emitSelectedId)
}
function scrollToActiveItem() {
  const itemId = `lux-autocomplete-${componentId}result-${arrowCounter.value}`
  const item = document.getElementById(itemId)
  item.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
}

const componentRootRef = useTemplateRef("root")
function handleClickOutside(evt) {
  if (!componentRootRef.value.contains(evt.target)) {
    setResult(search.value)
    isOpen.value = false
    arrowCounter.value = -1
  }
}

watch(
  () => props.items,
  value => {
    // we want to make sure we only do this when it's an async request
    if (props.isAsync) {
      arrowCounter.value = -1
      if (value.length > 0) {
        results.value = value.map(result =>
          typeof result === "object" ? result.label : result.toString()
        )
        isLoading.value = false
      } else {
        results.value = []
        isOpen.value = false
        isLoading.value = false
      }
    }
  }
)

const autoCompleteRef = useTemplateRef("autoComplete")
nextTick(() => {
  if (props.focused) {
    autoCompleteRef.value.focus()
  }
})

// A unique id that identifies this specific instance of the component, so that DOM ids are unique
// even if you have many autocompletes on a screen
const componentId = useId()
const displayInputDomId = computed(() => {
  return props.displayId || `displayInput-${componentId}`
})

setResult(props.defaultValue)

defineExpose({ setResult })
</script>

<style lang="scss">
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/system.scss" as *;
// Design Tokens with local scope
$color-placeholder: tint($color-grayscale, 50%);

.lux-autocomplete {
  display: flex;
  flex-direction: column;
  gap: var(--space-x-small);
  @include stack-space($space-small);
  font-weight: var(--font-weight-regular);
  font-family: var(--font-family-text);
  font-size: var(--font-size-base);
  line-height: var(--line-height-heading);
  position: relative;
  width: auto;

  &.lux-input-expand {
    width: 100%;
  }

  label {
    display: block;
    font-size: var(--font-size-base);
    color: tint($color-rich-black, 20%);

    &.lux-hidden {
      @include visually-hidden;
    }
  }

  input {
    @include inset-squish-space($space-small);
    appearance: none;
    -webkit-appearance: none;
    background: var(--color-white);
    border-radius: var(--border-radius-default);
    border: 0;
    color: set-text-color($color-rich-black, $color-white);
    font-family: var(--font-family-text);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-heading);
    margin: 0;
    transition: all 0.2s ease;
    width: 100%;

    &::-webkit-input-placeholder {
      -webkit-font-smoothing: antialiased;
      color: $color-placeholder;
    }
    &::-moz-placeholder {
      color: $color-placeholder;
      -moz-osx-font-smoothing: grayscale;
      opacity: 1;
    }

    &:hover,
    &[hover] {
      box-shadow: 0 1px 5px 0 color-mix(in srgb, var(--color-rich-black) 7%, transparent),
        0 0 0 1px tint($color-rich-black, 60%);
    }
    &:focus,
    &[focus] {
      transition: box-shadow 0.2s ease;
      box-shadow: inset 0 0 0 1px var(--color-bleu-de-france), 0 0 0 1px var(--color-bleu-de-france);
      outline: 0;
    }
  }
}

.lux-autocomplete-input {
  @include reset;
  background: var(--color-white);
  border-radius: var(--border-radius-default);
  box-shadow: inset 0 1px 0 0 color-mix(in srgb, var(--color-rich-black) 7%, transparent),
    0 0 0 1px tint($color-rich-black, 80%);
}

.lux-autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid var(--color-gray-10);
  height: 120px;
  overflow: auto;
  color: set-text-color($color-rich-black, $color-white);
  font-family: var(--font-family-text);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-heading);
  position: absolute;
  background: white;
  width: 100%;
  z-index: 999;
}

.lux-autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.lux-autocomplete-result.is-active,
.lux-autocomplete-result:hover {
  background: var(--color-grayscale-light);
  color: var(--color-rich-black);
}
</style>

<docs>
  ```jsx
    <div>
    <lux-autocomplete-input label="Fruit" default-value="Banana" :items="[ 'Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Peach', 'Grape', 'Tangerine', 'Pineapple']" />
    <lux-autocomplete-input label="Fruit with IDs" default-value="Banana" :items="[ {id: 1, label: 'Apple'}, {id: 2, label: 'Banana'}, {id: 3, label: 'Mango'}, {id: 4, label: 'Pineapple'}]" />
    </div>
  ```
</docs>
