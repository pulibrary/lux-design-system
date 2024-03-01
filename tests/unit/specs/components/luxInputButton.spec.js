import { mount } from "@vue/test-utils"
import LuxInputButton from "@/components/LuxInputButton.vue"
import LuxIconBase from "@/components/icons/LuxIconBase.vue"

describe("LuxInputButton.vue", () => {
  let wrapper

  describe("ButtonSize", () => {
    it("should render different sizes", () => {
      wrapper = mount(LuxInputButton, {
        props: {
          size: "small",
          variation: "outline",
        },
        global: {
          components: { LuxIconBase },
        },
      })
      expect(wrapper.get("button").classes()).toContain("small")
    })

    it("should have a default size", () => {
      wrapper = mount(LuxInputButton, {
        props: {
          variation: "outline",
        },
        global: {
          components: { LuxIconBase },
        },
      })
      expect(wrapper.get("button").classes()).toContain("medium")
    })
  })

  describe("Icon", () => {
    // Note: We need to add an icon prop to this - it does not actually show an icon
    // Also need to add a better assertion that indicates that a user actually sees an icon on the screen
    it("displays an icon", () => {
      wrapper = mount(LuxInputButton, {
        props: {
          variation: "icon",
        },
        global: {
          components: { LuxIconBase },
        },
      })
      expect(wrapper.get("button").classes()).toContain("icon")
    })
    it.todo("does not display an icon")
  })
})
