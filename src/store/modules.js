import { galleryState, galleryMutations } from "./gallery/index"
import { counterState, counterMutations, counterGetters } from "./counter/index"

export const galleryModule = {
  state: galleryState,
  mutations: galleryMutations,
}

export const counterModule = {
  state: counterState,
  mutations: counterMutations,
  getters: counterGetters,
}

let modules
export default modules = { counterModule, galleryModule }
