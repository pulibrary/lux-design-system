# LuxMediaImage

> Media-Image is a component that is used to display an image,
> or an icon if the image can't be resolved.

## Props

| Prop name | Description                                                                                                                                                                                                          | Type    | Values | Default |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------- |
| src       | The image displayed                                                                                                                                                                                                  | string  | -      | null    |
| alt       | The alternative text describing the image. Do not include if image is decorative.                                                                                                                                    | string  | -      | ""      |
| height    | Manually define the height of the image for a card                                                                                                                                                                   | string  | -      | ""      |
| cover     | Whether the image fills the container maintaining aspect ratio and is cropped                                                                                                                                        | boolean | -      | false   |
| contain   | Whether the full image is contained within the container maintaining aspect ratio. Note that this property is not recommened for use when the `height` prop is used as it will show the background of the container. | boolean | -      | false   |

---

```
  <div>
    <lux-media-image src="https://picsum.photos/400/300/?random" height="medium"></lux-media-image>
  </div>
```
