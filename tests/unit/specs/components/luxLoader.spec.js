import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import LuxLoader from "@/components/LuxLoader.vue"

describe("LuxCard.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxLoader, {})
  })

  it("should be full screen when fullscreen prop is true", async () => {
    const overlay = wrapper.find(".lux-overlay")
    expect(overlay.classes()).not.toContain("lux-fullscreen")
    wrapper.setProps({ fullscreen: true })
    await nextTick()
    const fs_overlay = wrapper.find(".lux-overlay")
    expect(fs_overlay.classes()).toContain("lux-fullscreen")
  })

  it("should default to medium size", () => {
    const loader = wrapper.find(".lux-loader")
    expect(loader.attributes().size).toBe("medium")
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
