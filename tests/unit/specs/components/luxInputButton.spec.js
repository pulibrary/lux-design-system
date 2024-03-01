import { mount } from "@vue/test-utils"
import LuxInputButton from "@/components/LuxInputButton.vue"

describe("LuxInputButton.vue", () => {
  let wrapper

  describe("ButtonSize", () => {
    it("should render different sizes", () => {
      wrapper = mount(LuxInputButton, {
        props: {
          size: "small",
        },
      })
      expect(wrapper.get("button").classes()).toContain("small")
    })

    it("should have a default size", () => {
      wrapper = mount(LuxInputButton, {})
      expect(wrapper.get("button").classes()).toContain("medium")
    })
  })
})
