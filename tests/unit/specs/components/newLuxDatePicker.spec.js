import NewLuxDatePicker from "@/components/NewLuxDatePicker.vue"
import { mount } from "@vue/test-utils"

describe("LuxDatePicker", () => {
  it("opens on button click", () => {
    const component = mount(NewLuxDatePicker, { attachTo: document.body })
    expect(component.find("table").isVisible()).toBe(false)
    component.find("button").trigger("click")
    expect(component.find("table").isVisible()).toBe(true)
  })
})
