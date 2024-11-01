<template>
  <div class="lux-disclosure" :style="{ width: width }">
    <button
      @click="toggleTheDisclosure()"
      :aria-controls="contentId"
      :aria-expanded="open.toString()"
      :class="{ 'lux-disclosure-open-button': open }"
      :style="{ fontSize: fontSize }"
    >
      <span>{{ open ? hideLabel : showLabel }}</span>
      <lux-icon-base width="12" height="12" iconHide="true">
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
      :style="{ fontSize: fontSize }"
    >
      <!-- @slot The full content that should be shown when the user opens the disclosure. -->
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
  fontSize: {
    type: String,
    default: "var(--font-size-base)",
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
      contentContainer.value.focus({ preventScroll: true })
    }, 500)
  }
}
</script>
<style>
.lux-disclosure button {
  font-family: var(--font-family-text);
  background-color: transparent;
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: var(--space-xx-small);
  border: 0;
  padding: 0;
}

.lux-disclosure button .lux-icon {
  border: 2px solid black;
  padding: var(--space-xx-small);
  border-radius: var(--border-radius-default);
}

.lux-disclosure button:hover .lux-icon,
.lux-disclosure button:focus .lux-icon {
  background-color: var(--color-princeton-orange-50);
}

.lux-disclosure-content {
  font-family: var(--font-family-text);
  padding: var(--space-small);
  border-bottom: 2px solid var(--color-princeton-orange-on-white);
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
