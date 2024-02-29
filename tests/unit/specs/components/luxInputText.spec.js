import { mount } from "@vue/test-utils"
import LuxInputText from "@/components/LuxInputText.vue"
import { LuxIconAlert, LuxIconApproved, LuxIconBase, LuxIconDenied } from "@/components"

let wrapper
describe("LuxInputText.vue", () => {
  beforeEach(() => {
    wrapper = mount(LuxInputText, {
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
  })

  it("emits an event on focus", () => {
    wrapper.find("input").trigger("focus")
    expect(wrapper.emitted().inputfocus.length).toBe(1)
  })
  it("emits the value of the input on input", async () => {
    const input = wrapper.find("input")

    await input.setValue("I am writing in this input")

    expect(wrapper.emitted().inputvaluechange.length).toEqual(1)
    expect(wrapper.emitted().inputvaluechange[0]).toEqual(["I am writing in this input"])
  })
})
