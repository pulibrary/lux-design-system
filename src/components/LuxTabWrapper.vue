<template>
  <div>
    <ul class="tabs-header">
      <li v-for="(title, idx) in tabs" :key="title">
        <button
          type="button"
          role="tab"
          :aria-selected="activeIndex === idx"
          @click="activeIndex = idx"
        >
          {{ title }}
        </button>
      </li>
    </ul>

    <div class="tabs-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
/**
 * LuxTabWrapper should be used as a parent of LuxTab. Each LuxTab will register itself with the parent and show/hide its content based on the active tab index.
 *
 */
defineOptions({
  name: "LuxTabWrapper",
  status: "ready",
  release: "7.10.0",
  type: "Element",
})

import { ref, provide } from "vue"

const tabs = ref([])
const activeIndexRef = ref(0)

// Provide activeIndex so each LuxTab can show/hide
provide("activeIndex", activeIndexRef)

// Each LuxTab calls registerTab(title) and receives its index
function registerTab(title) {
  const idx = tabs.value.length
  tabs.value.push(title)
  return idx
}
provide("registerTab", registerTab)

// Keep a simple number for template comparisons
const activeIndex = activeIndexRef
</script>

<style lang="scss">
.tabs-header {
  display: flex;
  list-style-type: none;
  gap: 10px;
  border-bottom: 1px solid var(--color-grayscale-light);
}

.tabs-header button {
  background: none;
  border: none;
  padding: var(--space-x-small) var(--space-small);
  cursor: pointer;
  border-radius: 0.375rem;
}

.tabs-header button[aria-selected="true"] {
  border-bottom: 2px solid var(--color-princeton-orange-on-white);
  border-color: var(--color-princeton-orange-on-white);
  font-weight: bold;
  border-radius: 0px;
}

.tabs-header button:focus,
.tabs-header button:focus-visible,
.tabs-header button:hover {
  outline: 0.25rem solid var(--color-princeton-orange-on-white) !important;
  border-radius: 10px;
  background-color: var(--color-grayscale-lighter);
  border-bottom: 2px solid transparent;
}

.tabs-body {
  padding-top: 1rem;
}
</style>

<docs>
  ```jsx
    <lux-tab-wrapper>
      <lux-tab title="Dog">Aspen is a cute dog!</lux-tab>
      <lux-tab title="Tree">Aspen is a majestic tree!</lux-tab>
    </lux-tab-wrapper>
  ```
</docs>
