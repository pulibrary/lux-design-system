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
    it("displays an icon", () => {
      wrapper = mount(LuxInputButton, {
        props: {
          variation: "icon",
          icon: "search",
        },
        global: {
          components: { LuxIconBase },
        },
      })
      expect(wrapper.get("button").classes()).toContain("icon")
      const icon = wrapper.find("lux-icon-search")
      expect(icon).toBe
    })
    it("does not display an icon", () => {
      wrapper = mount(LuxInputButton, {
        props: {
          variation: "solid",
        },
        global: {
          components: { LuxIconBase },
        },
      })
      expect(wrapper.get("button").classes()).not.toContain("icon")
    })
  })
})
