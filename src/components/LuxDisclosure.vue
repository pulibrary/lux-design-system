<template>
  <div class="lux-disclosure" :style="{ width: width }">
    <button
      @click="toggleTheDisclosure()"
      :aria-controls="contentId"
      :aria-expanded="open.toString()"
      :aria-describedby="descriptionId"
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

/**
 * Disclosures are used for elements that are useful for some users, but
 * disruptive for others.  For example, some users find it helpful to have
 * lengthy journal article abstracts available on a search results page,
 * while for others the abstracts are unhelpful and cause substantial
 * unnecessary scrolling.
 */
defineOptions({ name: "LuxDisclosure" })

const props = defineProps({
  /**
   * A description of the action of showing the full content.
   */
  showLabel: {
    type: String,
    required: true,
  },
  /**
   * A description of the action of hiding the full content.
   */
  hideLabel: {
    type: String,
    required: true,
  },
  /**
   * Used for setting focus and aria-controls.  It must be unique in your page.
   */
  contentId: {
    type: String,
    required: true,
  },
  /**
   * The ID of an element in the DOM that provides further description of the full content.
   *
   * Use this prop if you have multiple disclosures in your page with the same `showLabel` or `hideLabel`.
   */
  descriptionId: {
    type: String,
  },
  /**
   * How wide should the disclosure be?  You can use any value accepted by the CSS width property.
   */
  width: {
    type: String,
    default: "var(--card-width-medium)",
  },
  /**
   * What size should the font be?  You can use any value accepted by the CSS font-size property.
   */
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
    if (contentContainer.value !== null) {
      setTimeout(() => {
        contentContainer.value.focus({ preventScroll: true })
      }, 500)
    }
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
### How to use a disclosure

* Supply a `contentId` prop, which is used for setting focus and aria-controls.  It must be unique in your page.
* Supply clear text for the `showLabel` and `hideLabel` props that orients the user to what the content
is.  The `hideLabel` text should provide a concise re-orientation to what the content is and how to dismiss it in the
event that a user gets disoriented or distracted by the full content.
* If you use this component multiple times on the same page, make it clear to the user what each instance does, and
how it might differ from other instances of the component.  For example, please don't use this component 10 times in a page
and use "Show more" as the label for each one.  You can do this in one of two ways:
    * Use distinct `showLabel` and `hideLabel` props for each instance
    * Provide a `descriptionId` prop.

### Accessibility considerations

* Once the disclosure is opened, this component waits for a short amount of time for a screen reader's virtual buffer to update, then sets focus on the expanded content.
* This component implements the `aria-controls` and `aria-expanded` properties.
* If you use this component multiple times in the same page, try navigating your page via buttons on a screen reader (<kbd>Control+Option+Command+J</kbd> on Voice Over).
  Make sure that each instance has a specific and unique label.
* This component was tested in 2024 by third party testers using NVDA, Screen magnification, and a QuadStick.  This component was tested in 2025 by a third party tester with VoiceOver.  All their feedback has been incorporated.

</docs>
