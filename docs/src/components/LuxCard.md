# LuxCard

## Props

| Prop Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `id` | Sets the id to reference this card with. | `String` | `""` |
| `cardUrl` | Sets the URL linking to the card content -- this does not seem to be used | `String` | `""` |
| `cardPixelWidth` | Sets arbitrary card width. It's recommended to use size over this setting. | `any` | `""` |
| `size` | Sets the size of the card `small, medium, large, full-width` | `String` | `"medium"` |
| `selected` | Indicates whether the card is selected. | `Boolean` | `false` |
| `edited` | Indicates whether the object a card represents has been altered from its persisted form. | `Boolean` | `false` |
| `disabled` | Indicates the user cannot interact with the card. | `Boolean` | `false` |
| `cardTitle` | The title of the card -- this prop is not used | `String` | `""` |

## Usage

```
    <div>
      <!-- Card without sections -->
      <lux-card id="a">
        <lux-media-image src="https://picsum.photos/600/300/?random" height="medium" cover></lux-media-image>
        <lux-heading level="h2">Title</lux-heading>
        <lux-text-style variation="default">Design isn't just about the look and feel. Design is how it works.</lux-text-style>
      </lux-card>

      <!-- Card with sections -->
      <lux-card id="b" size="full-width">
        <lux-card-media>
          <lux-icon-base width="50" height="50" icon-hide="true">
            <lux-icon-globe></lux-icon-globe>
          </lux-icon-base>
        </lux-card-media>
        <lux-card-header>
          <!-- Hyperlink is the text screen readers would read, we don't want to wrap the entire card -->
          <lux-heading level="h2" size="h3"><lux-hyperlink href="#">Code4Lib - Trip ID 1234</lux-hyperlink></lux-heading>
          <lux-text-style>Jan 9, 2019 to Jan 16, 2019</lux-text-style>
        </lux-card-header>
        <lux-card-content>
          <lux-tag type="tag" :tag-items="[
            {name: 'Pending', color: 'yellow', style: 'pill'}
            ]"
            horizontal="end"
            size="small"/>
          <lux-text-style type="span" variation="small">Last Updated on Dec 15, 2018</lux-text-style>
        </lux-card-content>
      </lux-card>
    </div>
  ```
