import { mount } from "@vue/test-utils"
import _LuxCreativeCommonsStatement from "@/components/_LuxCreativeCommonsStatement.vue"

describe("LuxCreativeCommonStatement component", () => {
  it("tells screen reader users that it opens in a new tab", () => {
    const wrapper = mount(_LuxCreativeCommonsStatement)
    expect(wrapper.text()).toContain("opens in new tab")
  })
})
