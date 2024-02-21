import { nextTick } from "vue"
import { mount } from "@vue/test-utils"
import LuxAlert from "@/components/LuxAlert.vue"

const transitionStub = () => ({
  render: function (h) {
    return this.$options._renderChildren
  },
})

describe("LuxAlert.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxAlert, {
      slots: {
        default: "Here's some info for you.",
      },
      stubs: {
        transition: transitionStub(),
      },
    })
  })

  it("should have an alert message", () => {
    const el = wrapper.find(".lux-alert")
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
    await nextTick()
    expect(wrapper.findComponent({ name: "LuxAlert" })).toBeTruthy
    const button = wrapper.find("button")
    button.trigger("click")
    await nextTick()
    expect(wrapper.findComponent({ name: "LuxAlert" })).toBeFalsy
  })

  it("should be accessible", () => {
    const el = wrapper.find(".lux-alert")
    expect(el.attributes().role).toBe("alert")
  })

  it("should default to info type", () => {
    expect(wrapper.vm.isInfo).toBe(true)
  })

  it("should hide alert when hideAlert() is called", () => {
    expect(wrapper.vm.show).toBe(true)
    wrapper.vm.hideAlert()
    expect(wrapper.vm.show).toBe(false)
  })

  it("should hide after 2 seconds when autoclear is true", async () => {
    wrapper.setProps({ autoclear: true })
    await nextTick()
    const el = wrapper.find(".lux-alert")
    expect(wrapper.vm.show).toBe(true)
    // wait 3 seconds and see if it's hidden
    setTimeout(() => {
      expect(wrapper.vm.show).toBe(false)
    }, 3000)
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
