import { mount } from "@vue/test-utils"
import _LuxUniversityPrivacyNotice from "@/components/_LuxUniversityPrivacyNotice.vue"

describe("LuxUniversityPrivacyNotice component", () => {
  it("tells screen reader users that it opens in a new tab", () => {
    const wrapper = mount(_LuxUniversityPrivacyNotice)
    expect(wrapper.text()).toContain("opens in new tab")
  })
})
