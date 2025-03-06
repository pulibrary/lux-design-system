<template>
  <component :is="type" :class="['lux-special-collections-footer']">
    <lux-wrapper class="lux-footer-content" :maxWidth="maxWidth">
      <div class="lux-library-links">
        <nav role="navigation" aria-label="About Archival Collections">
          <h2><a href="/research_help">About Archival Collections</a></h2>
          <ul>
            <li><a href="/research_account">Creating a Research Account</a></li>
            <li><a href="/requesting_materials">Requesting Materials</a></li>
            <li><a href="/search_tips">Search Tips</a></li>
            <li><a href="/av_materials">Statement on Audio Visual Materials</a></li>
            <li><a href="/faq">Frequently Asked Questions (FAQs)</a></li>
          </ul>
        </nav>
      </div>
      <div class="lux-library-links">
        <nav role="navigation" aria-label="Library Services">
          <h2><a href="https://library.princeton.edu/services">Library Services</a></h2>
          <ul>
            <li>
              <a
                href="https://library.princeton.edu/services/article-express"
                title="Use our Interlibrary Loan and Article Express Services"
                >Article Express</a
              >
            </li>
            <li><a href="https://library.princeton.edu/services/borrowdirect">Borrow Direct</a></li>
            <li>
              <a href="https://library.princeton.edu/services/access/circulation-policies"
                >Circulation</a
              >
            </li>
            <li><a href="https://library.princeton.edu/services/reserves">Course Reserves</a></li>
            <li>
              <a
                href="https://library.princeton.edu/services/interlibrary-services"
                title="Interlibrary Loan Services, Article Express"
                >Interlibrary Loan (ILL)</a
              >
            </li>
            <li><a href="https://library.princeton.edu/services/access">Library Access</a></li>
            <li>
              <a href="https://library.princeton.edu/services/study-spaces"
                >Study Spaces and Lockers</a
              >
            </li>
            <li><a href="https://library.princeton.edu/accounts">Your Accounts</a></li>
          </ul>
        </nav>
      </div>
      <div class="lux-library-links">
        <nav role="navigation" aria-label="About the Library">
          <h2><a href="https://library.princeton.edu/about">About the Library</a></h2>
          <ul>
            <li>
              <a href="https://library.princeton.edu/collections-and-collection-development"
                >Collections and Collecting</a
              >
            </li>
            <li><a href="https://rbsc.princeton.edu/exhibitions">Exhibitions</a></li>
            <li><a href="https://library.princeton.edu/about/locations">Library Locations</a></li>
            <li><a href="https://library.princeton.edu/alumni">For Alumni</a></li>
            <li><a href="https://library.princeton.edu/staff">For Library Staff</a></li>
            <li><a href="https://library.princeton.edu/staff/directory">Staff Directory</a></li>
            <li>
              <a href="https://library.princeton.edu/about/friends">Friends of the Library</a>
            </li>
            <li>
              <a href="https://library.princeton.edu/services/technology/off-campus-access"
                >Using the Library Off-Campus</a
              >
            </li>
          </ul>
        </nav>
      </div>
      <div class="lux-library-links">
        <lux-library-contact-info-old />
        <lux-logo-university width="142" height="40" />
        <lux-university-copyright-old type="div" />
        <lux-university-accessibility-old type="span" />
      </div>
    </lux-wrapper>
  </component>
</template>

<script>
import LuxLibraryContactInfoOld from "./_LuxLibraryContactInfoOld.vue"
import LuxUniversityCopyright from "./_LuxUniversityCopyright.vue"
import LuxUniversityAccessibilityOld from "./_LuxUniversityAccessibilityOld.vue"
import LuxUniversityCopyrightOld from "./_LuxUniversityCopyrightOld.vue"
/**
 * LibraryFooter is the preferred Footer styling/behavior for PUL websites.
 * Don't forget to create a fallback for this component by providing the HTML
 * rendering in _<noscript></noscript>_ tags.
 */
export default {
  name: "LuxSpecialCollectionsFooter",
  status: "ready",
  release: "1.0.0",
  type: "Pattern",
  components: {
    LuxLibraryContactInfoOld,
    LuxUniversityCopyright,
    LuxUniversityAccessibilityOld,
  },
  props: {
    /**
     * The html element name used for the container
     */
    type: {
      type: String,
      default: "div",
    },
    /**
     * The maximum width of the wrapper. Default is set to 1170.
     */
    maxWidth: {
      type: Number,
      default: 1170,
    },
  },
}
</script>

<style lang="scss" scoped>
@use "/src/assets/styles/spacing.scss" as *;
@use "/src/assets/styles/mixins.scss" as *;
@use "/src/assets/styles/variables.css" as *;

.lux-special-collections-footer {
  @include reset;
  @include stack-space(var(--space-base));
  font-family: var(--font-family-heading);
  line-height: var(--line-height-heading);
  color: var(--color-rich-black);
  background: var(--color-grayscale-lighter);
  padding-bottom: 1em;
}

.lux-footer-content {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  align-items: flex-start;
  padding: 1em;

  @media (min-width: 900px) {
    flex-direction: row;
    max-width: 1170px;
  }
}

.lux-library-links {
  order: 0;
  align-self: auto;
  @media (min-width: 900px) {
    flex: 1;
  }

  h2 {
    font-family: var(--font-family-heading);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
  }

  a {
    text-decoration: none;
    color: var(--color-rich-black);

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      line-height: var(--line-height-base);
      font-size: var(--font-size-small);
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <lux-special-collections-footer></lux-special-collections-footer>
  </div>
  ```
</docs>
