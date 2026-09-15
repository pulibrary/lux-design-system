# LuxCopyToClipboard

## Props

| Prop name      | Description                                                              | Type   | Values | Default |
| -------------- | ------------------------------------------------------------------------ | ------ | ------ | ------- |
| clipboardValue | the value to be copied to the clipboard. It can be a string or a number. | string | -      |         |

---

```
    <div>
      <!-- Copy to clipboard -->
      <div style="display: flex; align-items: center; gap: 0.5rem;">
      <div>example to be copied</div>
      <lux-copy-to-clipboard id="example-clip" clipboard-value="example to be copied"> </lux-copy-to-clipboard>
      </div>
    </div>
```
