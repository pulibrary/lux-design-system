import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import LuxInputText from "@/components/LuxInputText.vue"
import { LuxIconAlert, LuxIconApproved, LuxIconBase, LuxIconDenied } from "@/components"

let wrapper
describe("LuxInputText.vue", () => {
  beforeEach(() => {
    wrapper = mount(LuxInputText, {
      attachTo: document.body,
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
        type: "text",
      },
    })
  })

  it("emits an event on focus", () => {
    wrapper.find("input").trigger("focus")
    expect(wrapper.emitted().inputfocus.length).toBe(1)
  })
  it("doesn't focus if the prop isn't set", async () => {
    // Wait for mount-based focusing.
    await nextTick()
    const input = wrapper.find("input").element
    expect(input).not.toBe(document.activeElement)
  })
  it("focuses if the prop is set", async () => {
    wrapper = mount(LuxInputText, {
      attachTo: document.body,
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
        type: "text",
        focused: true,
      },
    })

    await nextTick()
    const input = wrapper.find("input").element
    expect(input).toBe(document.activeElement)
  })
  it("emits the value of the input on input", async () => {
    const input = wrapper.find("input")

    await input.setValue("I am writing in this input")

    expect(wrapper.emitted()["update:value"].length).toEqual(1)
    expect(wrapper.emitted()["update:value"][0]).toEqual(["I am writing in this input"])
  })
})
