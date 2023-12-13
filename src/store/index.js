import { createStore } from "vuex"
// import { counterModule, galleryModule } from "./modules"
import { galleryModule } from "./modules"

export default createStore({
  state: { count: 10 },

  mutations: {
    increment(state) {
      // `state` is the local module state
      state.count++
    },
  },

  getters: {
    count: state => {
      return state.count
    },
  },
  modules: {
    // counter: counterModule,
    gallery: galleryModule,
  },
})
