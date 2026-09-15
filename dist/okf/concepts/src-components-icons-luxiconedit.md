---
type: concept
title: LuxIconEdit
source: /src/components/icons/LuxIconEdit/
path: /src/components/icons/LuxIconEdit/
updated: 2026-09-15
okf:
  generated_by: "@docmd/plugin-okf"
  generated_at: "2026-09-15T18:47:02.935Z"
---
# LuxIconEdit

> Icons are used to visually communicate core parts of the product and
> available actions. Please be aware that all elements must have closing tags (not "self-closing").
> To add additional icons, please consult [the instructions](/#/Adding%20Icons).

---

```jsx
    <div>
      <!-- you can pass in a smaller `width` and `height` as props -->
      <lux-icon-base width="12" height="12" icon-name="Edit Item">
        <lux-icon-edit></lux-icon-edit>
      </lux-icon-base>

      <!-- or you can use the default, which is 18 -->
      <lux-icon-base icon-name="Edit Item">
        <lux-icon-edit></lux-icon-edit>
      </lux-icon-base>

      <!-- or make it a little bigger too, with colors :) -->
      <lux-icon-base width="30" height="30" icon-name="Edit Item" icon-color="red">
        <lux-icon-edit></lux-icon-edit>
      </lux-icon-base>
    </div>
```
