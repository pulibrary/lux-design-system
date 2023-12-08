import { createStore } from "vuex"
import { galleryModule } from "./modules"

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    gallery: galleryModule,
  },
})
