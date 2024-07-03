import { mount } from "@vue/test-utils"
import _LuxUniversityAccessibility from "@/components/_LuxUniversityAccessibility.vue"

describe("LuxUniversityAccessibility component", () => {
  it("tells screen reader users that it opens in a new tab", () => {
    const wrapper = mount(_LuxUniversityAccessibility)
    expect(wrapper.text()).toContain("opens in new tab")
  })
})
