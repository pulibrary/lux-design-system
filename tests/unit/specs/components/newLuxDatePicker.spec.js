import NewLuxDatePicker from "@/components/NewLuxDatePicker.vue"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"

describe("LuxDatePicker", () => {
  it("opens on button click", () => {
    const component = mount(NewLuxDatePicker, { attachTo: document.body })
    expect(component.find("table").isVisible()).toBe(false)
    component.find("button").trigger("click")
    expect(component.find("table").isVisible()).toBe(true)
  })
  it("closes on button click", () => {
    const component = mount(NewLuxDatePicker, { attachTo: document.body })

    component.find("button").trigger("click")
    expect(component.find("table").isVisible()).toBe(true)

    component.find("button").trigger("click")
    expect(component.find("table").isVisible()).toBe(false)
  })
  it("has an aria-controls relationship between the button and the dialog", () => {
    const component = mount(NewLuxDatePicker)
    const dialogId = component.find("dialog").attributes("id")
    expect(dialogId).toBeTruthy()
    expect(component.find("button").attributes("aria-controls")).toEqual(dialogId)
  })
  it("maintains aria-expanded correctly for the button", async () => {
    const component = mount(NewLuxDatePicker)
    const button = component.find("button")
    expect(button.attributes("aria-expanded")).toEqual("false")

    button.trigger("click")
    await nextTick()
    expect(button.attributes("aria-expanded")).toEqual("true")

    button.trigger("click")
    await nextTick()
    expect(button.attributes("aria-expanded")).toEqual("true")
  })
})
