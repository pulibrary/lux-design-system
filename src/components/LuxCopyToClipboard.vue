<template>
  <div v-if="isSupported" class="copy-box">
    <button
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
      @click="copy(copiedValue)"
      class="sizer"
      aria-label="copy"
    >
      <!-- `copied` will be reset in 3s -->
      <lux-icon-base v-if="!copied" width="20" height="20" class="frames"
        ><lux-icon-copy></lux-icon-copy
      ></lux-icon-base>
      <lux-icon-base v-else width="24" height="24" class="check"
        ><lux-icon-check></lux-icon-check
      ></lux-icon-base>
    </button>
  </div>
  <p v-else>Your browser does not support Clipboard API</p>
  <div v-if="isSupported" class="copy-paste-tooltip">
    <span v-if="!copied" class="tooltip-text" v-show="isHover">Copy</span>
    <span v-else class="tooltip-text" v-show="isHover">Copied</span>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useClipboard } from "@vueuse/core"
import LuxIconBase from "./icons/LuxIconBase.vue"
import LuxIconCheck from "./icons/LuxIconCheck.vue"
import LuxIconCopy from "./icons/LuxIconCopy.vue"

defineOptions({ name: "LuxCopyToClipboard" })
const props = defineProps({
  /**
   * the value to be copied to the clipboard. It can be a string or a number.
   */
  clipboardValue: {
    type: String,
    required: true,
  },
})

const copiedValue = ref(props.clipboardValue)
watch(
  () => props.clipboardValue,
  newValue => {
    copiedValue.value = newValue
  }
)

const isSupported = navigator.clipboard
const copied = ref(false)
const copy = async text => {
  await navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => copied.value = false, 3000)
}
const isHover = ref(false)
</script>

<style>
.frames {
  flex-basis: 1.25rem;
  flex-grow: 0;
  flex-shrink: 0;
}
.check {
  flex-basis: 1.25rem;
  flex-grow: 0;
  flex-shrink: 0;
}
.sizer {
  border: none;
  background: #fff;
  align-self: center;
}

.copy-paste-tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  aspect-ratio: 1/1;
  font-weight: normal;

  .tooltip-text {
    background-color: #333;
    color: #fff;
    font-size: var(--font-size-x-small);
    padding: 8px 12px;
    border-radius: 4px;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: absolute;
    top: -25%;
    z-index: 1; /* Ensure tooltip is displayed above content */

    &::after {
      content: " ";
      position: absolute;
      top: 50%;
      right: 100%; /* To the left of the tooltip */
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent #333 transparent transparent;
    }
  }
}
</style>
<docs>
  ```
    <div>
      <!-- Copy to clipboard -->
      <div style="display: flex; align-items: center; gap: 0.5rem;">
      <div>example to be copied</div>
      <lux-copy-to-clipboard id="example-clip" clipboard-value="example to be copied"> </lux-copy-to-clipboard>
      </div>
    </div>
  ```
</docs>
