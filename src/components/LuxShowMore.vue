<template>
  <div class="lux-show-more">
    <div
      v-show="open"
      :id="contentId"
      ref="contentContainer"
      class="lux-show-more-content"
      tabindex="-1"
    >
      <!-- @slot The full content that should be shown when the user presses the Show More button. -->
      <slot></slot>
    </div>
    <div v-if="!open" class="lux-show-more-content">{{ truncatedText }}</div>
    <lux-input-button
      type="button"
      variation="text"
      @click="toggleTheDisclosure()"
      :aria-expanded="open.toString()"
      :aria-controls="contentId"
      :aria-describedby="descriptionId"
      v-if="shouldTruncate"
      >{{ open ? hideLabel : showLabel }}</lux-input-button
    >
  </div>
</template>
<script setup>
import LuxInputButton from "./LuxInputButton.vue"
import { computed, ref, useTemplateRef } from "vue"

/**
 * LuxShowMore is used for long texts that are useful for some users, but
 * disruptive for others.  For example, some users find it helpful to have
 * lengthy journal article abstracts available on a search results page,
 * while for others the abstracts are unhelpful and cause substantial
 * unnecessary scrolling.
 */
defineOptions({ name: "LuxShowMore" })

const slots = defineSlots()

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
   * How many characters to allow
   */
  characterLimit: {
    type: Number,
    required: true,
  },
})
const open = ref(false)
const contentContainer = useTemplateRef("contentContainer")

function truncationPoint(text, characterLimit) {
  if (!characterLimit) {
    // don't truncate anything
    return text.length
  }
  if (characterLimit >= text.length) {
    return text.length
  }
  const finalDelimiter = text.lastIndexOf(" ", characterLimit)
  // If there are no delimiters (i.e. it is a single very long word), return the whole word
  return finalDelimiter < 1 ? text.length : finalDelimiter
}

const fullText = computed(() => {
  return contentContainer.value?.textContent || ""
})

const shouldTruncate = computed(() => {
  return truncationPoint(fullText.value, props.characterLimit) < fullText.value.length
})

const truncatedText = computed(() => {
  if (shouldTruncate.value) {
    return fullText.value.slice(0, truncationPoint(fullText.value, props.characterLimit)) + "…"
  } else {
    return fullText.value
  }
})

function toggleTheDisclosure() {
  open.value = !open.value

  if (open.value === true) {
    // Wait for any screen reader's virtual buffer
    // to load the content into memory, then
    // set focus on the new content
    if (contentContainer.value !== null) {
      setTimeout(() => {
        contentContainer.value.focus({ preventScroll: true })
      }, 350)
    }
  }
}
</script>
<style>
.lux-show-more button {
  font-family: var(--font-family-text);
  background-color: transparent;
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: var(--space-xx-small);
  border: 0;
  padding: 0 !important;
  margin-left: 0 !important;
}

.lux-show-more button.lux-button {
  text-decoration: underline;
  text-decoration-color: var(--color-gray-100);
  text-decoration-thickness: 1px;
}

.lux-show-more button.lux-button.text:hover {
  text-underline-offset: auto;
  text-decoration-thickness: 0.15rem;
}

.lux-show-more button.lux-button.text:focus-visible {
  text-decoration-color: var(--color-princeton-orange-on-white);
  text-decoration-thickness: 0.15rem;
}

.lux-show-more {
  font-family: var(--font-family-text);
  font-size: var(--font-size-base);
  line-height: var(--line-height-small);
}

.lux-show-more-content:focus-visible {
  outline: var(--color-princeton-orange-on-white) solid 0.25rem;
}
</style>
<docs>
  ```jsx
    <lux-heading level="h3" size="h4">Example 1</lux-heading>
    <!-- It shows a snippet of the provided text when collapsed -->
    <lux-show-more showLabel="More text" hideLabel="Less text" contentId="moby" character-limit="20">
      Call me Ishmael. Some years ago- never mind how long precisely- having little or no money in my purse,
      and nothing particular to interest me on shore, I thought I would sail about a little and see the watery
      part of the world. It is a way I have of driving off the spleen and regulating the circulation.
    </lux-show-more>


    <lux-heading level="h3" size="h4">Example 2</lux-heading>
    <!-- The content can contain HTML, but it will be stripped out of the snippet view -->
    <lux-show-more showLabel="Show full proem" hideLabel="Hide full proem" contentId="illiad" character-limit="80">
      μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος<br />
      οὐλομένην, ἣ μυρί’ Ἀχαιοῖς ἄλγε’ ἔθηκε,<br />
      πολλὰς δ’ ἰφθίμους ψυχὰς Ἄϊδι προΐαψεν<br />
      ἡρώων, αὐτοὺς δὲ ἑλώρια τεῦχε κύνεσσιν<br />
      οἰωνοῖσί τε δαῖτα, Διὸς δ’ ἐτελείετο βουλή,<br />
      ἐξ οὗ δὴ τὰ πρῶτα διαστήτην ἐρίσαντε<br />
      Ἀτρεΐδης τε ἄναξ ἀνδρῶν καὶ δῖος Ἀχιλλεύς.<br />
    </lux-show-more>

    <lux-heading level="h3" size="h4">Example 3</lux-heading>
    <!-- The content can even contain components -->
    <lux-show-more showLabel="Show full table" hideLabel="Hide full table" contentId="table" character-limit="20">
      There are three entries:
      <lux-data-table
        :columns="[
          'name',
          { 'name': 'email', 'display_name': 'Email Address', 'align': 'center', 'sortable': true },
        ]"
        :json-data="[
          {'id': 1,'name': { value: 'foo', link: 'https://library.princeton.edu'},'email': 'foo@xxx.xxx',},
          {'id': 2,'name': 'bar','email': 'bar@xxx.xxx' },
          {'id': 3,'name': 'fez','email': 'fez@xxx.xxx' },
        ]"/>
    </lux-show-more>
  ```
### How to use LuxShowMore

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
</docs>
