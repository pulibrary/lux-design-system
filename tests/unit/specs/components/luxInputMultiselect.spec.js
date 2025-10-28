import { mount } from "@vue/test-utils"
import LuxInputMultiselect from "@/components/LuxInputMultiselect.vue"
import { nextTick } from "vue"

describe("MultiSelect.vue", () => {
  it("adds selected items to the selected area", async () => {
    const wrapper = mount(LuxInputMultiselect)
    const input = wrapper.find("#displayInput")
    input.trigger("focus")
    // Enter the first few letters of mango
    input.setValue("mang")
    // Wait for Vue to re-render the DOM
    await nextTick()

    const mangoItem = wrapper.find(".lux-autocomplete-result")
    expect(mangoItem.text()).toEqual("Mango")
    mangoItem.trigger("mousedown")

    await nextTick()

    expect(wrapper.find("#selected").text()).toContain("Mango")
  })
})
