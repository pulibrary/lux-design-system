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

  describe("when the alert is dismissible", () => {
    beforeEach(async () => {
      wrapper.setProps({ dismissible: true })
      await nextTick()
    })
    it("should be dismissible on click", async () => {
      expect(wrapper.findComponent({ name: "LuxAlert" })).toBeTruthy
      const button = wrapper.find("button")
      button.trigger("click")
      await nextTick()
      expect(wrapper.findComponent({ name: "LuxAlert" })).toBeFalsy
    })
    it("should emit dismissed event when clicked", async () => {
      const button = wrapper.find("button")
      button.trigger("click")
      await nextTick()
      expect(wrapper.emitted()["dismissed"].length).toEqual(1)
    })
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

  describe("when autoclear prop is true", () => {
    beforeEach(() => {
      jest.useFakeTimers()
      wrapper = mount(LuxAlert, {
        props: {
          autoclear: true,
        },
      })
    })
    afterEach(() => {
      jest.useRealTimers()
    })
    it("should still display after 1 second", () => {
      expect(wrapper.vm.show).toBe(true)

      // wait 1 second and confirm that it is still there
      jest.advanceTimersByTime(1000)
      expect(wrapper.vm.show).toBe(true)
    })
    it("should hide after 2 seconds", () => {
      expect(wrapper.vm.show).toBe(true)

      // wait 3 seconds and see if it's hidden
      jest.advanceTimersByTime(3000)
      expect(wrapper.vm.show).toBe(false)
    })
  })

  describe("when autoclear prop is true and autoclearSeconds is set to 10", () => {
    beforeEach(() => {
      jest.useFakeTimers()
      wrapper = mount(LuxAlert, {
        props: {
          autoclear: true,
          autoclearSeconds: 10,
        },
      })
    })
    afterEach(() => {
      jest.useRealTimers()
    })
    it("should still display after 3 seconds", () => {
      expect(wrapper.vm.show).toBe(true)
      jest.advanceTimersByTime(3000)
      expect(wrapper.vm.show).toBe(true)
    })
    it("should be hiddent after 11 seconds", () => {
      expect(wrapper.vm.show).toBe(true)
      jest.advanceTimersByTime(11_000)
      expect(wrapper.vm.show).toBe(false)
    })
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
