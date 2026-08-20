<template>
  <div class="lux-tab-panel" v-if="isActive">
    <slot />
  </div>
</template>

<script setup>
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
  padding: 1rem 1rem 1rem 1rem;
  border: 1px solid var(--color-grayscale-light);
}
</style>

<docs>
```jsx
    <div>
      <lux-tab :count="4" />
    </div>
```
</docs>
