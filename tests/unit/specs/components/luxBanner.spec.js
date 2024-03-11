import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import LuxBanner from "@/components/LuxBanner.vue"

describe("LuxBanner.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxBanner, {
      slots: {
        default: "<p>Here's some info for you.</p>",
      },
      stubs: ["wrapper"],
    })
  })

  it("should have an alert message", () => {
    const el = wrapper.find(".lux-banner")
    expect(el.text()).toBe("Here's some info for you.")
  })

  it("should have a button when dismissible", async () => {
    wrapper.setProps({ dismissible: true })
    await nextTick()
    const button = wrapper.find("button")
    expect(wrapper.vm.dismissible).toBe(true)
    expect(button.exists()).toBe(true)
  })

  it("should be dismissible on click", async () => {
    wrapper.setProps({ dismissible: true })
    const slot_text = wrapper.find("p")
    expect(slot_text.exists()).toBe(true)
    await nextTick()
    const button = wrapper.find("button")
    button.trigger("click")
    await nextTick()
    const p = wrapper.find("p")
    expect(p.exists()).toBe(false)
  })

  it("should hide banner when hideBanner() is called", () => {
    wrapper.vm.show = true
    wrapper.vm.hideBanner()
    expect(wrapper.vm.show).toBe(false)
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
