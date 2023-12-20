<template>
  <div>
    <button @click="increment()">increment</button>
    <p>{{ count }}</p>
  </div>
</template>

<script>
import store from "../store"
// import { mapState } from "vuex"
/*
 * Counter is a proof-of-concept example component for working vuex modules.
 */
export default {
  name: "LuxCounter",
  status: "ready",
  release: "1.0.0",
  type: "Pattern",
  methods: {
    increment() {
      store.commit("increment")
    },
  },
  computed: {
    // mapState does not seem to work
    // ...mapState({
    //   counter: state => store.counter.state,
    // }),
    count() {
      return store.state.counter.count
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
