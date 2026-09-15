import { mount } from "@vue/test-utils"
import LuxSearchBox from "@/components/LuxSearchBox.vue"

describe("LuxSearchBox", () => {
  it("has a submit button", () => {
    const wrapper = mount(LuxSearchBox)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })
  it("has an input named query", () => {
    const wrapper = mount(LuxSearchBox)
    expect(wrapper.find('input[name="query"]').exists()).toBe(true)
  })
  it("can change the name of the input", () => {
    const wrapper = mount(LuxSearchBox, { props: { name: "q" } })
    expect(wrapper.find('input[name="query"]').exists()).toBe(false)
    expect(wrapper.find('input[name="q"]').exists()).toBe(true)
  })
  it("implements v-model", async () => {
    const wrapper = mount(LuxSearchBox, {
      props: {
        modelValue: "squid",
        "onUpdate:modelValue": e => wrapper.setProps({ modelValue: e }),
      },
    })

    expect(wrapper.props("modelValue")).toBe("squid")
    await wrapper.find("input").setValue("nautilus")
    expect(wrapper.props("modelValue")).toBe("nautilus")
  })
})
