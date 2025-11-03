<template>
  <div class="lux-media-image" :class="[height, { 'lux-default-thumbnail': !source }]">
    <img
      v-if="source"
      @error="source = null"
      :src="source"
      :alt="alt"
      :class="[{ 'lux-cover': cover }, { 'lux-contain': contain }]"
    />
    <lux-icon-base
      v-else
      width="50"
      height="50"
      icon-name="file"
      icon-color="rgb(225,225,225)"
      icon-hide="true"
      ><lux-icon-file
    /></lux-icon-base>
  </div>
</template>

<script>
import LuxIconBase from "./icons/LuxIconBase.vue"
import LuxIconFile from "./icons/LuxIconFile.vue"

/**
 * Media-Image is a component that is used to display an image,
 * or an icon if the image can't be resolved.
 */
export default {
  name: "LuxMediaImage",
  status: "ready",
  release: "1.0.0",
  type: "Element",
  data: function () {
    return {
      source: this.src,
    }
  },
  props: {
    /**
     * The image displayed
     */
    src: {
      type: String,
      default: null,
    },
    /**
     * The alternative text describing the image. Do not include if image is decorative.
     */
    alt: {
      type: String,
      default: "",
    },
    /**
     * Manually define the height of the image for a card
     */
    height: {
      type: String,
      default: "",
    },
    /**
     * Whether the image fills the container maintaining aspect ratio and is cropped
     */
    cover: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether the full image is contained within the container maintaining aspect ratio. Note that this property is not recommened for use when the `height` prop is used as it will show the background of the container.
     */
    contain: {
      type: Boolean,
      default: false,
    },
    components: {
      LuxIconBase,
      LuxIconFile,
    },
  },
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/mixins.scss" as *;

.lux-media-image {
  @include reset;
  @include stack-space(var(--space-base));
  font-family: var(--font-family-text);
  line-height: var(--line-height-base);
  color: var(--color-rich-black);
  overflow: hidden;
  position: relative;
  height: auto;

  img {
    background-color: var(--color-grayscale-lighter);
    height: auto;
    max-width: 100%;
    vertical-align: middle;
  }

  .lux-cover {
    object-fit: cover;
  }

  .lux-contain {
    object-fit: contain;
  }

  .lux-icon {
    display: none;
  }

  &.lux-default-thumbnail {
    background: var(--color-grayscale);
    display: flex;
    align-items: center;

    .lux-icon {
      display: block;
    }
    .lux-svg-icon,
    svg {
      display: block;
      margin: auto;
    }
  }
}

.lux-small {
  height: 100px;
  width: 100%;

  img {
    height: 100px;
    max-width: 100%;
  }
}

.lux-medium {
  height: 200px;
  width: 100%;

  img {
    height: 200px;
    max-width: 100%;
  }
}

.lux-large {
  height: 300px;
  width: 100%;

  img {
    height: 300px;
    max-width: 100%;
  }
}
</style>

<docs>
  ```
  <div>
    <lux-media-image src="https://picsum.photos/400/300/?random" height="medium"></lux-media-image>
  </div>
  ```
</docs>
