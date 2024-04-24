<template>
  <div class="lux-disclosure" :style="{ width: width }">
    <button
      @click="toggleTheDisclosure()"
      :aria-controls="contentId"
      :aria-expanded="open.toString()"
      :class="{ 'lux-disclosure-open-button': open }"
    >
      {{ open ? hideLabel : showLabel }}
      <lux-icon-base width="12" height="12">
        <lux-icon-arrow-up v-if="open"></lux-icon-arrow-up>
        <lux-icon-arrow-down v-else></lux-icon-arrow-down>
      </lux-icon-base>
    </button>
    <div
      v-if="open"
      :id="contentId"
      ref="contentContainer"
      class="lux-disclosure-content"
      tabindex="-1"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import LuxIconArrowDown from "./icons/LuxIconArrowDown.vue"
import LuxIconArrowUp from "./icons/LuxIconArrowUp.vue"
import LuxIconBase from "./icons/LuxIconBase.vue"
import { ref } from "vue"
const props = defineProps({
  showLabel: {
    type: String,
    required: true,
  },
  hideLabel: {
    type: String,
    required: true,
  },
  contentId: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: "var(--card-width-medium)",
  },
})
const open = ref(false)
const contentContainer = ref()

function toggleTheDisclosure() {
  open.value = !open.value

  if (open.value === true) {
    // Wait for any screen reader's virtual buffer
    // to load the content into memory, then
    // set focus on the new content
    setTimeout(() => {
      console.log(contentContainer.value, "is my content container")
      contentContainer.value.focus()
    }, 500)
  }
}
</script>
<style>
.lux-disclosure {
  font-family: var(--font-family-text);
  background-color: var(--color-princeton-orange-10);
  border-radius: var(--border-radius-default);
}

.lux-disclosure button {
  background-color: transparent;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 0px;
  padding: var(--space-x-small);
}

.lux-disclosure button.lux-disclosure-open-button {
  border-bottom: 2px solid var(--color-princeton-orange-on-white);
}

.lux-disclosure-content {
  padding: var(--space-small);
}
</style>
<docs>
  ```jsx
    <lux-disclosure showLabel="Show Abstract" hideLabel="Hide Abstract" contentId="disclosure1">
      This article is really interesting, please read it!
    </lux-disclosure>

    <br>

    <lux-disclosure showLabel="A wider disclosure" hideLabel="I am done with this content" width="100%" contentId="disclosure2">
      <p>As you can see, you can configure the disclosure to be a different width.</p>
    </lux-disclosure>
  ```
Accessibility considerations:
<ul>
  <li>Once the disclosure is opened, this component waits for a short amount of time for a screen reader's virtual buffer to update, then sets focus on the expanded content.</li>
  <li>This component implements the <code>aria-controls</code> and <code>aria-expanded</code> properties.</li>
  <li>Please supply a <code>contentId</code> prop, which is used for setting focus and aria-controls.</li>
</ul>
</docs>
