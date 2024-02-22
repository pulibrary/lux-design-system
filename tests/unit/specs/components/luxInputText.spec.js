import { mount } from "@vue/test-utils"
import LuxInputText from "@/components/LuxInputText.vue"

describe("LuxInputText.vue", () => {
  it("emits an event on focus", () => {
    const wrapper = mount(LuxInputText)
    wrapper.find("input").trigger("focus")
    expect(wrapper.emitted().focus.length).toBe(1)
  })
})
