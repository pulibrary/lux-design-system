# LuxAlert

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `type` | The intent of the message. Valid options: `alert, indicator`. Alerts are full page and indicators are “inline”. | `String` | `"indicator"` |
| `status` | Severity of the message. Valid options: `info, warning, success, error` | `String` | `"info"` |
| `autoclear` | Automatically hides the notification after 2 seconds. | `Boolean` | `false` |
| `autoclearSeconds` | The number of seconds to wait before autoclearing the notification.  This prop has no effect if autoclear is not true. | `Number` | `2` |
| `dismissible` | User can manually hide the notification.  This emits a dismissed event that you can bind to if needed (for example, if you want to record that the user hid the notification in a database or localStorage) | `Boolean` | `false` |

## Usage

<div>
  <lux-alert status="warning" autoclear>How to disappear completely...</lux-alert>
  <lux-alert status="error"></lux-alert>
  <lux-alert status="success">Like a boss!</lux-alert>
  <lux-alert status="info" dismissible>Here's some dismissible info for you.</lux-alert>
</div>
