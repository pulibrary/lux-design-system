---
type: concept
title: LuxBadge
source: /src/components/LuxBadge/
path: /src/components/LuxBadge/
updated: 2026-09-15
okf:
  generated_by: "@docmd/plugin-okf"
  generated_at: "2026-09-15T18:47:02.922Z"
---
# LuxBadge

> Badge is a basic informational component with various color options.

## Props

| Prop name | Description                   | Type   | Values | Default |
| --------- | ----------------------------- | ------ | ------ | ------- |
| color     | Sets the color for the badge. | string | -      | "green" |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

```jsx
<div>
  <lux-badge>A Green Badge</lux-badge>
  <lux-badge color="yellow">A Yellow Badge</lux-badge>
  <lux-badge color="blue">A Blue Badge</lux-badge>
  <lux-badge color="gray">A Gray Badge</lux-badge>
  <lux-badge color="red">A Red Badge</lux-badge>
  <lux-badge color="purple">A Purple Badge</lux-badge>
</div>
```
