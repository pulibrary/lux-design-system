<template>
  <div class="lux-autocomplete">
    <label v-if="label" :class="{ 'lux-hidden': hideLabel }">{{ label }}</label>
    <div class="lux-autocomplete-input">
      <input
        id="displayInput"
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
        @keydown.enter="onEnter"
        @keydown.esc="onEscape"
        @keydown.tab="onEscape"
        @blur="onEscape"
        :required="required"
        :aria-activedescendant="ariaActiveDescendant"
        :placeholder="placeholder"
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
          :id="'lux-autocomplete-' + this.componentId + 'result-' + i"
        >
          {{ result }}
        </li>
      </ul>
      <input :name="name" :id="id" type="hidden" :value="inputValue" data-input-value />
    </div>
  </div>
</template>

<script>
import { useId } from "vue"

/**
 * InputAutocomplete is a cross between a text input and select input.
 * This component is used to offer users suggested values that
 * filter upon typing, while also allowing them to enter free-form text for the value.
 * The id and name supplied to this component are applied to a hidden input field, which
 * will contain the preferred value for submission based on the structure of the `items` prop.
 */
export default {
  name: "LuxAutocompleteInput",
  status: "prototype",
  release: "1.0.0",
  type: "Element",
  props: {
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
     * The id of the form input field.
     */
    id: {
      type: String,
      default: "",
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
  },
  emits: ["input", "selected"],
  data() {
    return {
      isOpen: false,
      results: [],
      search: "",
      inputValue: "",
      isLoading: false,
      arrowCounter: -1,
    }
  },
  methods: {
    onChange() {
      // Let's warn the parent that a change was made
      /**
       * Emitted on any input-like action that the user does: focusing the input, typing, etc.
       */
      this.$emit("input", this.search)

      // Is the data given by an outside ajax request?
      if (this.isAsync) {
        this.isLoading = true
      } else {
        // Data is sync, we can search our flat array
        this.filterResults()
        this.isOpen = true
      }
    },
    filterResults() {
      if (this.items.length && typeof this.items[0] === "object") {
        let preResults = this.items.filter(
          item => item.label.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
        this.results = preResults.map(x => x.label)
      } else {
        this.results = this.items.filter(
          item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      }
    },
    setResult(result, onSelectCallback = id => {}) {
      this.search = result
      this.inputValue = result
      this.isOpen = false

      if (this.items.length && typeof this.items[0] === "object") {
        // we need to search the input list for a matching label and return
        // an id if it's found
        let item = this.items.find(obj => {
          return obj.label === result
        })
        if (typeof item !== "undefined") {
          this.inputValue = item.id
          onSelectCallback(item.id)
        }
      }
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },
    onEnter() {
      this.setResult(this.results[this.arrowCounter], this.emitSelectedId)
      this.isOpen = false
      this.arrowCounter = -1
    },

    onEscape() {
      this.setResult(this.search)
      this.isOpen = false
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.setResult(this.search)
        this.isOpen = false
        this.arrowCounter = -1
      }
    },
    onClickResult(result) {
      this.setResult(result, this.emitSelectedId)
    },
    emitSelectedId(id) {
      /**
       * Emitted when the user selects an "official" value from the list of supplied terms
       */
      this.$emit("selected", id)
    },
  },
  watch: {
    // Once the items content changes, it means the parent component
    // provided the needed data
    items: function (value, oldValue) {
      // we want to make sure we only do this when it's an async request
      if (this.isAsync) {
        this.results = value
        this.isOpen = true
        this.isLoading = false
      }
    },
  },
  computed: {
    ariaActiveDescendant() {
      if (this.arrowCounter < 0) {
        return null
      } else {
        return `lux-autocomplete-${this.componentId}result-${this.arrowCounter}`
      }
    },
  },
  created() {
    this.setResult(this.defaultValue)
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside)
    let vm = this

    vm.$nextTick(function () {
      if (vm.focused) {
        this.$refs.autoComplete.focus()
      }
    })
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside)
  },
  setup() {
    // A unique id that identifies this specific instance of the component, so that DOM ids are unique
    // even if you have many autocompletes on a screen
    const componentId = useId()
    return { componentId }
  },
}
</script>

<style lang="scss">
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/variables.css" as *;
@use "/src/assets/styles/system.scss" as *;
// Design Tokens with local scope
$color-placeholder: tint($color-grayscale, 50%);

.lux-autocomplete {
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
    @include stack-space($space-x-small);

    &.lux-hidden {
      @include visually-hidden;
    }
  }

  input {
    @include inset-squish-space($space-small);
    @include stack-space($space-small);
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
    &:-ms-input-placeholder {
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
