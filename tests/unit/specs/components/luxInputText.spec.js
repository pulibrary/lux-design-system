import { mount } from "@vue/test-utils"
import LuxInputText from "@/components/LuxInputText.vue"
import { LuxIconAlert, LuxIconApproved, LuxIconBase, LuxIconDenied } from "@/components"

describe("LuxInputText.vue", () => {
  it("emits an event on focus", () => {
    const wrapper = mount(LuxInputText, {
      global: {
        components: {
          "lux-icon-alert": LuxIconAlert,
          "lux-icon-approved": LuxIconApproved,
          "lux-icon-base": LuxIconBase,
          "lux-icon-denied": LuxIconDenied,
        },
      },
      props: {
        id: "my-id",
        name: "my name",
      },
    })
    wrapper.find("input").trigger("focus")
    expect(wrapper.emitted().inputfocus.length).toBe(1)
  })
})
