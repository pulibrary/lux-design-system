import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import LuxBanner from "@/components/LuxBanner.vue"

describe("LuxBanner.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxBanner, {
      slots: {
        default: "Here's some info for you.",
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
    expect(button.is("button")).toBe(true)
  })

  it("should be dismissible on click", async () => {
    wrapper.setProps({ dismissible: true })
    await nextTick()
    const button = wrapper.find("button")
    button.trigger("click")
    await nextTick()
    expect(wrapper.isEmpty()).toBe(true)
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
