---
type: concept
title: LuxTabWrapper
source: /src/components/LuxTabWrapper/
path: /src/components/LuxTabWrapper/
updated: 2026-09-15
okf:
  generated_by: "@docmd/plugin-okf"
  generated_at: "2026-09-15T18:47:02.929Z"
---
# LuxTabWrapper

> LuxTabWrapper should be used as a parent of LuxTab. Each LuxTab will register itself with the parent and show/hide its content based on the active tab index.

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---

```jsx
<lux-tab-wrapper>
  <lux-tab title="Dog">Aspen is a cute dog!</lux-tab>
  <lux-tab title="Tree">Aspen is a majestic tree!</lux-tab>
</lux-tab-wrapper>
```
