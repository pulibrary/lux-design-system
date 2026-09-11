# LuxBanner

> Banners are used to provide timely, general information to users of a website or app.

## Props

| Prop name   | Description                                                         | Type    | Values | Default |
| ----------- | ------------------------------------------------------------------- | ------- | ------ | ------- |
| fullscreen  | Allows the banner to act as an overlay, near the top of the screen. | boolean | -      | false   |
| dismissible | User can manually hide the notification.                            | boolean | -      | false   |

## Slots

| Name    | Description                  | Bindings |
| ------- | ---------------------------- | -------- |
| default | The content for your banner. |          |

---

```jsx
<div>
  <lux-banner dismissible>
    <h2>Fall Semester Announcements</h2>
    <p>
      We’re currently in beta for students and will be introducing faculty,
      advisor and staff functionality in the coming months.
    </p>
  </lux-banner>
</div>
```
