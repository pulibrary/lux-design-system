<template>
  <component :is="type" :class="['lux-subscribe-newsletter', theme]">
    <form
      id="mc-embedded-subscribe-form"
      action="https://princeton.us4.list-manage.com/subscribe/post?u=f1159e2c2a8bc35d62147f282&amp;id=6c19fe9a37"
      method="post"
      name="mc-embedded-subscribe-form"
      class="validate"
      target="_blank"
      novalidate
    >
      <div id="mc_embed_signup_scroll" class="newsletter-signup">
        <lux-input-text
          id="mce-EMAIL"
          type="email"
          name="EMAIL"
          aria-required="true"
          aria-label="Subscribed"
        />
        <lux-input-button
          id="mc-embedded-subscribe"
          type="submit"
          name="subscribe"
          class="lux-subscribe-newsletter"
          variation="outline"
          :size="size"
          aria-describedby="describe-mailchimp-form"
          >{{ buttonLabel }}</lux-input-button
        >
        <div id="describe-mailchimp-form">Opens the form in a new tab</div>
        <!-- The following input is only to catch bots. User will not see the field -->
        <div style="position: absolute; left: -5000px" aria-hidden="true">
          <input type="text" name="b_f1159e2c2a8bc35d62147f282_6c19fe9a37" tabindex="-1" value="" />
        </div>
      </div>
    </form>
  </component>
</template>

<script>
import LuxInputButton from "./LuxInputButton.vue"
import LuxInputText from "./LuxInputText.vue"

/**
 * Used to add a Subscribe Newsletter input.
 */
export default {
  name: "LuxSubscribeNewsletter",
  status: "ready",
  release: "5.2.0",
  type: "Element",
  props: {
    /**
     * The html element name used for the wrapper.
     */
    type: {
      type: String,
      default: "div",
    },
    buttonLabel: {
      type: String,
      default: "Subscribe",
    },
  },
  components: {
    LuxInputButton,
    LuxInputText,
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.css";
@import "../assets/styles/mixins.scss";

.lux-subscribe-newsletter {
  #mc_embed_signup_scroll {
    display: flex;
  }
  input {
    height: 3rem;
    width: 18rem;
  }
  .lux-button {
    color: inherit;
    background-color: var(--black);
    border-color: inherit;
    border-radius: 0;
    min-height: 3rem;
    min-width: 8rem;
    height: 3rem;
    margin: 0rem 0.2rem 0rem 0rem;
  }
  .lux-button:hover {
    color: var(--black);
    background-color: var(--orange-50);
  }
  :deep(.lux-input .lux-input-field) {
    box-shadow: none;
    height: 3rem;
    border: 1px solid black;
    border-radius: 0;
    &:hover {
      box-shadow: none;
    }
  }
}

#describe-mailchimp-form {
  @include visually-hidden;
}
</style>
<docs>
  ```jsx
  <div>
    <lux-subscribe-newsletter theme="light" type="div"></lux-subscribe-newsletter>
  </div>
  ```
</docs>
