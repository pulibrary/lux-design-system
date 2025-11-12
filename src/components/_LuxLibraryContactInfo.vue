<template>
  <component :is="type" :class="['lux-library-contact', theme]">
    <div itemscope itemtype="http://schema.org/Organization">
      <div itemscope itemtype="http://schema.org/PostalAddress">
        <span itemprop="streetAddress">One Washington Road</span> <br />
        <span itemprop="addressLocality">Princeton</span>, <span itemprop="addressRegion">NJ</span>
        <span itemprop="postalCode"> 08544-2098</span> <span itemprop="addressCountry">USA</span>
      </div>
      <div class="phone">
        <span itemprop="telephone"><a href="tel:1-609-258-1470">(609) 258-1470</a></span>
      </div>
    </div>
  </component>
</template>

<script>
/**
 * Used to show Library's contact information, including address and phone, is
 * clear and in the footer.
 */

export default {
  name: "LuxLibraryContactInfo",
  status: "ready",
  release: "1.0.0",
  type: "Element",

  props: {
    /**
     * The html element name used for the wrapper.
     */
    type: {
      type: String,
      default: "div",
    },
    theme: {
      type: String,
      default: "dark",
    },
  },
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/mixins.scss" as *;
@use "/src/assets/styles/focus.scss" as *;

.lux-library-contact {
  @include reset;
  margin-right: 2rem;
  font-family: var(--font-family-heading);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);

  @media (max-width: 899px) {
    margin-left: 0.5rem;
  }

  &.dark {
    color: var(--color-white);
    background-color: var(--color-gray-100);
    a {
      color: var(--color-white);
      @include princeton-focus(dark);
    }

    h2 {
      color: var(--color-white);
    }

    .phone {
      margin-top: 1.5rem;
    }
  }

  &.shade {
    color: var(--color-white);
    background-color: var(--color-grayscale-darker);
    a {
      color: var(--color-white);
      @include princeton-focus(dark);
    }

    h2 {
      color: var(--color-white);
    }
  }

  &.light {
    color: var(--color-rich-black);
    background-color: var(--color-white);
    a {
      color: var(--color-rich-black);
      @include princeton-focus(light);
    }

    h2 {
      color: var(--color-rich-black);
    }
  }

  a {
    text-decoration: none;
  }

  h2 {
    font-family: var(--font-family-heading);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-heading);
  }
}

.icons {
  list-style-type: none;
  margin: 8px 0 0;
  padding: 0;

  li {
    display: inline;
    padding-right: 5px;
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-library-contact-info type="div" theme="light"></lux-library-contact-info>
  </div>
  ```
</docs>
