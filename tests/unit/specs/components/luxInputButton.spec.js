import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import LuxInputButton from "@/components/LuxInputButton.vue"

describe("LuxInputButton.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxInputButton, {
      slots: {
        default: "Apply Changes.",
      },
      propsData: {
        variation: "text",
        focused: true,
      },
    })
  })

  fit("should be focused when the focused property is set to true", () => {
    const button = wrapper.find("button").element
    expect(button).toBe(document.activeElement)
  })

  it("should emit the correct event when clicked", async () => {
    const button1 = wrapper.find("button")
    button1.trigger("click")
    const emitted1 = wrapper.emitted()
    expect(Object.prototype.hasOwnProperty.call(emitted1, "button-clicked")).toBe(true)
    expect(Object.prototype.hasOwnProperty.call(emitted1, "system-alert")).toBe(false)
    wrapper.setProps({
      customAlertEvent: { alertStatus: "success", alertMessage: "This is my message." },
    })
    await nextTick()
    const button2 = wrapper.find("button")
    button2.trigger("click")
    const emitted2 = wrapper.emitted()
    expect(Object.prototype.hasOwnProperty.call(emitted2, "system-alert")).toBe(true)
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
