<template>
  <div>
    <button @click="increment()">increment</button>
    <p>{{ count }}</p>
  </div>
</template>

<script>
import store from "../store"
// import { mapState, mapGetters } from "vuex"
/*
 * Gallery is a grid of images with captions.
 */
export default {
  name: "LuxCounter",
  status: "ready",
  release: "1.0.0",
  type: "Pattern",
  // data() {
  //   return {
  //     count: this.num,
  //   }
  // },
  // props: {
  //   /**
  //    * Sets the id to reference this card with.
  //    */
  //   num: {
  //     type: Number,
  //     default: 0,
  //   },
  // },
  methods: {
    increment() {
      store.commit("increment")
      // this.count++
    },
  },
  computed: {
    count() {
      return store.state.count
    },
  },
}
</script>
<style lang="scss"></style>
<docs>
  ```jsx
  <div>
    <lux-counter></lux-counter>
  </div>
  ```
</docs>
