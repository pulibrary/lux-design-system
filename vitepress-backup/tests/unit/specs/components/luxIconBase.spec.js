import { mount } from "@vue/test-utils"
import LuxIconBase from "@/components/icons/LuxIconBase.vue"

let wrapper

describe("LuxIconBase component", () => {
  beforeEach(() => {
    wrapper = mount(LuxIconBase, {
      props: {
        iconName: "(opens in new tab)",
      },
    })
  })
  describe("iconName prop", () => {
    it("creates a valid id for the title tag from the iconName prop", () => {
      expect(wrapper.get("title").attributes("id")).toEqual("opens-in-new-tab")
    })
    it("uses the samve value for the title's id and the svg's aria-labelledby", () => {
      const titleId = wrapper.get("title").attributes("id")
      expect(wrapper.get("svg").attributes("aria-labelledby")).toEqual(titleId)
    })
    it("uses the iconName prop as the title text", () => {
      expect(wrapper.get("title").text()).toEqual("(opens in new tab)")
    })
  })
})
