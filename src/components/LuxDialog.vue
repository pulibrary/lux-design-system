<template>
  <div class="lux-dialog-container">
    <dialog
      ref="dialog"
      :class="{ 'lux-dialog': true, 'lux-dialog-inline': props.position == 'inline' }"
      :id="id"
    >
      <div class="dialog-content" tabindex="-1" ref="dialogContent">
        <div class="dialog-title">
          <LuxHeading level="h2" size="h4" v-if="$slots.title"
            ><slot name="title"></slot
          ></LuxHeading>
          <LuxInputButton
            type="button"
            variation="text"
            currentColor="black"
            @buttonClicked="close()"
          >
            <LuxIconBase height="14" width="14" iconName="close">
              <LuxIconClose></LuxIconClose>
            </LuxIconBase>
          </LuxInputButton>
        </div>
        <slot></slot>
        <slot name="footer">
          <LuxInputButton @buttonClicked="close()">Close</LuxInputButton>
        </slot>
      </div>
    </dialog>
  </div>
</template>
<script setup>
import { useTemplateRef } from "vue"
import LuxInputButton from "./LuxInputButton.vue"
import LuxHeading from "./LuxHeading.vue"
import LuxIconBase from "./icons/LuxIconBase.vue"
import LuxIconClose from "./icons/LuxIconClose.vue"

const props = defineProps({
  /**
   * Where on the screen should the dialog appear? Options are centered or inline.
   */
  position: {
    type: String,
    default: "centered",
    validator(value, _props) {
      return ["centered", "inline"].includes(value)
    },
  },
  /**
   * The id for this element in the DOM
   */
  id: String,
})

const dialog = useTemplateRef("dialog")
const dialogContent = useTemplateRef("dialogContent")
function open() {
  if (props.position == "inline") {
    dialog.value.show()
  } else {
    dialog.value.showModal()
  }
  setTimeout(() => dialogContent.value.focus())
}

function close() {
  dialog.value.close()
}

function isOpen() {
  return dialog.value?.open
}

defineExpose({ open, close, isOpen })
</script>
<style>
dialog.lux-dialog {
  border: 1px solid var(--color-grayscale-lighter);
  border-radius: var(--border-radius-default);
  filter: drop-shadow(0 2px var(--color-grayscale-lighter));
  width: min(calc(var(--card-width-large) * 1.5), 90vw);
  font-family: var(--font-family-text);
  padding: 0;

  .dialog-title {
    display: flex;
    justify-content: space-between;
  }

  .dialog-content {
    margin: 0 var(--space-base);
  }

  .dialog-content:focus {
    /* Don't display a focus indicator on :focus, only on :focus-visible */
    outline: none !important;
  }

  .dialog-content:focus-visible {
    outline-offset: -6px !important;
    outline: 0.25rem solid var(--color-princeton-orange-on-white) !important;
  }
}

.lux-dialog-container {
  position: relative;
}

.lux-dialog-inline {
  position: absolute;
  margin-inline-start: var(--space-x-small);
  margin-block-start: var(--space-x-small);
  z-index: var(--z-index-modal);
}
</style>
<docs>
You can use it in a vue component:
  ```vue
    <template>
      <div>
        <lux-input-button @buttonClicked="myDialogRef.open()">Open</lux-input-button>
        <lux-input-button @buttonClicked="myDialogRef.close()">Close</lux-input-button>

        <lux-dialog ref="dialog" :position="position">
          Welcome to my dialog!
        </lux-dialog>

                <lux-input-radio @change="updatePosition($event)"
            id="position"
            vertical groupLabel="Modal position"
            :options="[
                {name: 'position', value: 'centered', id: 'position-centered', checked: true},
                {name: 'position', value: 'inline', id: 'position-inline'}
            ]">
            </lux-input-radio>
      </div>
    </template>
    <script setup>
      import { ref, useTemplateRef } from "vue"
      const myDialogRef = useTemplateRef("dialog")
      const position = ref("centered")
      function updatePosition(newValue) {
        position.value = newValue
      }
    </script>
  ```
You can also activate it using vanilla js:
  ```text
  // To display centered
  document.querySelector(".lux-dialog").showModal()

  // To display inline
  document.querySelector(".lux-dialog").show()
  ```
</docs>
