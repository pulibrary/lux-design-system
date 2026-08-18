<template>
  <div>
    <ul class="tabs__header">
      <li v-for="(title, idx) in tabs" :key="title" :class="{ active: idx === activeIndex }">
        <button @click="activeIndex = idx">
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

<style>
.tabs__header {
  display: flex;
  list-style-type: none;
  gap: 8px;
  margin: 12px;
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
