import { galleryState, galleryMutations } from "./gallery/index"

export const galleryModule = {
  state: galleryState,
  mutations: galleryMutations,
}

let modules
export default modules = { galleryModule }
