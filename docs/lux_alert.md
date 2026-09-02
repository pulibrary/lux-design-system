<script setup>
  import LuxAlert from "../src/components/LuxAlert.vue"
</script>
<!-- If .vitepress/theme/index.js works and imports the compoenent then we dont need the import
in the script tag -->
# LuxAlert

> Alerts are used to provide timely information to a user in response to some event.

## Props

| Prop name        | Description                                                                                                                                                                                                        | Type    | Values | Default     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------ | ----------- |
| type             | The intent of the message. Valid options: `alert, indicator`. Alerts are full page and indicators are “inline”.                                                                                                    | string  | -      | "indicator" |
| status           | Severity of the message. Valid options: `info, warning, success, error`                                                                                                                                            | string  | -      | "info"      |
| autoclear        | Automatically hides the notification after 2 seconds.                                                                                                                                                              | boolean | -      | false       |
| autoclearSeconds | The number of seconds to wait before autoclearing the<br/>notification. This prop has no effect if autoclear<br/>is not true.                                                                                      | number  | -      | 2           |
| dismissible      | User can manually hide the notification. This emits a dismissed<br/>event that you can bind to if needed (for example, if you want to<br/>record that the user hid the notification in a database or localStorage) | boolean | -      | false       |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| dismissed  |            |

## Slots

| Name    | Description    | Bindings |
| ------- | -------------- | -------- |
| default | the alert text |          |

---


<div>
  <lux-alert status="warning" autoclear>
    How to disappear completely...
  </lux-alert>
  <lux-alert status="error"></lux-alert>
  <lux-alert status="success">Like a boss!</lux-alert>
  <lux-alert status="info" dismissible>
    Here's some dismissible info for you.
  </lux-alert>
</div>

