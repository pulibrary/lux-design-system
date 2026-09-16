# LuxMediaImage

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `src` | The image displayed | `String` | `null` |
| `alt` | The alternative text describing the image. Do not include if image is decorative. | `String` | `""` |
| `height` | Manually define the height of the image for a card | `String` | `""` |
| `cover` | Whether the image fills the container maintaining aspect ratio and is cropped | `Boolean` | `false` |
| `contain` | Whether the full image is contained within the container maintaining aspect ratio. Note that this property is not recommened for use when the `height` prop is used as it will show the background of the container. | `Boolean` | `false` |

## Usage

```
  <div>
    <lux-media-image src="https://picsum.photos/400/300/?random" height="medium"></lux-media-image>
  </div>
  ```
