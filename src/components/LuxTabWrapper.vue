<template>
  <div>
    <ul class="tabs__header">
      <li v-for="tab in tabs" :key="tab">{{ tab }}</li>
    </ul>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { provide } from "vue"

const registerTab = tabTitle => {
  console.log("registeredTab", tabTitle)
  tabs.value.push(tabTitle)
}
const selectedTab = ref()
const tabs = ref([])

provide("registerTab", registerTab)
</script>
<docs>
  ```jsx
    <lux-tab-wrapper>
      <lux-tab title="Dog">Aspen is a cute dog!</lux-tab>
      <lux-tab title="Tree">Aspen is a majestic tree!</lux-tab>
    </lux-tab-wrapper>
  ```
</docs>
