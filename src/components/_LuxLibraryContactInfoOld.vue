<template>
  <component :is="type" class="lux-library-contact">
    <div itemscope itemtype="http://schema.org/Organization">
      <h2 itemprop="name">Princeton University Library</h2>
      <div itemscope itemtype="http://schema.org/PostalAddress">
        <span itemprop="streetAddress">One Washington Road</span> <br />
        <span itemprop="addressLocality">Princeton</span>, <span itemprop="addressRegion">NJ</span>
        <span itemprop="postalCode">08544</span> <span itemprop="addressCountry">USA</span>
      </div>
      <span itemprop="telephone"><a href="tel:1-609-258-1470">(609) 258-1470</a></span>
    </div>
    <ul class="icons">
      <li>
        <a href="http://www.facebook.com/PULibrary"><lux-logo-facebook width="24" height="24" /></a>
      </li>
      <li>
        <a href="https://x.com/PULibrary"><lux-logo-x width="24" height="24" /></a>
      </li>
      <li>
        <a href="https://libguides.princeton.edu/usgovdocs"
          ><lux-logo-gov-docs width="24" height="24"
        /></a>
      </li>
      <li>
        <a href="https://fpul.princeton.edu/"><lux-logo-friends width="87" height="24" /></a>
      </li>
    </ul>
  </component>
</template>

<script>
/**
 * Used to show Library's contact information, including address and phone, is
 * clear and in the footer.
 */
import LuxLogoFacebook from "./logos/LuxLogoFacebook.vue"
import LuxLogoX from "./logos/LuxLogoX.vue"
import LuxLogoGovDocs from "./logos/LuxLogoGovDocs.vue"
import LuxLogoFriends from "./logos/LuxLogoFriends.vue"

export default {
  name: "LibraryContactInfoOld",
  status: "ready",
  release: "5.2.0",
  type: "Element",
  components: {
    LuxLogoFacebook,
    LuxLogoX,
    LuxLogoGovDocs,
    LuxLogoFriends,
  },
  props: {
    /**
     * The html element name used for the wrapper.
     */
    type: {
      type: String,
      default: "div",
    },
  },
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/mixins.scss" as *;
@use "/src/assets/styles/variables.css" as *;

.lux-library-contact {
  @include reset;
  @include stack-space(var(--space-x-small));
  font-family: var(--font-family-heading);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-rich-black);

  a {
    text-decoration: none;
    color: var(--color-rich-black);
  }

  h2 {
    color: var(--color-rich-black);
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
    <lux-library-contact-info-old type="div"></lux-library-contact-info-old>
  </div>
  ```
</docs>
