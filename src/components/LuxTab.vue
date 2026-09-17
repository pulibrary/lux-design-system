<template>
  <div class="lux-tab-panel" v-if="isActive">
    <slot />
  </div>
</template>

<script setup>
/**
 * Tabs are used to organize content into separate views, allowing users to switch between them.
 *
 * Each LuxTab should be used as a child of LuxTabWrapper.
 */
defineOptions({
  name: "LuxTab",
  status: "ready",
  release: "7.10.0",
  type: "Element",
})

import { inject, computed } from "vue"

const props = defineProps({
  title: { type: String, required: true },
})

const registerTab = inject("registerTab", null)

const activeIndex = inject("activeIndex", null)
const myIndex = registerTab ? registerTab(props.title) : 0

const isActive = computed(() => myIndex === activeIndex?.value)
</script>

<style lang="scss">
@use "sass:color";
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/system.scss" as *;

.lux-tab-panel {
  padding: 1rem;
  border: 1px solid var(--color-grayscale-light);
}
</style>

/** * LuxTab should be used as a child of LuxTabWrapper. It will register itself with the parent and
* show/hide its content based on the active tab index. */
