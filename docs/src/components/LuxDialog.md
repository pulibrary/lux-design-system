# LuxDialog

## Props

| Prop name | Description                                                                   | Type   | Values               | Default    |
| --------- | ----------------------------------------------------------------------------- | ------ | -------------------- | ---------- |
| position  | Where on the screen should the dialog appear? Options are centered or inline. | string | `centered`, `inline` | "centered" |
| id        | The id for this element in the DOM                                            | string | -                    |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| title   |             |          |
| default |             |          |
| footer  |             |          |

## Expose

### open

>

### close

>

### isOpen

>

---

You can use it in a vue component:

```vue
<template>
  <div>
    <lux-input-button @buttonClicked="myDialogRef.open()"
      >Open</lux-input-button
    >
    <lux-input-button @buttonClicked="myDialogRef.close()"
      >Close</lux-input-button
    >

    <lux-dialog ref="dialog" :position="position">
      Welcome to my dialog!
    </lux-dialog>

    <lux-input-radio
      @change="updatePosition($event)"
      id="position"
      vertical
      groupLabel="Modal position"
      :options="[
        {
          name: 'position',
          value: 'centered',
          id: 'position-centered',
          checked: true,
        },
        { name: 'position', value: 'inline', id: 'position-inline' },
      ]"
    >
    </lux-input-radio>
  </div>
</template>
<script setup>
import { ref, useTemplateRef } from "vue";
const myDialogRef = useTemplateRef("dialog");
const position = ref("centered");
function updatePosition(newValue) {
  position.value = newValue;
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
