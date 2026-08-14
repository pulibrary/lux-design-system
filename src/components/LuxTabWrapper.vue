<template>
  <div>
    <ul class="tabs__header">
      <li v-for="tab in tabs" :key="tab.title">{{ tab.title }}</li>
    </ul>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { provide } from "vue"

const registerTab = tabTitle => {
  console.log("registeredTab", tabTitle)
}
const selectedTab = ref()

provide("registerTab", registerTab)
</script>
