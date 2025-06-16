import { mount } from "@vue/test-utils"
import LuxSearchBox from "@/components/LuxSearchBox.vue"

describe("LuxSearchBox", () => {
  it("has a submit button", () => {
    const wrapper = mount(LuxSearchBox)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })
})
