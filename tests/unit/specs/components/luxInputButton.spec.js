import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import LuxInputButton from "@/components/LuxInputButton.vue"

describe("LuxInputButton.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxInputButton)
  })

  describe("ButtonSize", () => {
    it("should render different sizes", async () => {
      wrapper.setProps({ size: "small" })
      await nextTick()
      expect(wrapper.get("button").classes()).toContain("small")
    })

    it("should have a default size", () => {
      expect(wrapper.get("button").classes()).toContain("medium")
    })
  })
  describe("Icon", () => {
    it("displays an icon when prop is set", async () => {
      wrapper.setProps({ variation: "icon", icon: "search" })
      await nextTick()
      expect(wrapper.get("button").classes()).toContain("icon")
      const icon = wrapper.find("lux-icon-search")
      expect(icon).toBe
    })
    it("includes the svg for the icon when prop is set", async () => {
      wrapper.setProps({ variation: "icon", icon: "search" })
      await nextTick()
      expect(wrapper.find("button svg path").exists()).toBe(true)
    })
    it("does not display an icon when prop is not set", () => {
      expect(wrapper.get("button").classes()).not.toContain("icon")
    })
  })
  describe("Variation", () => {
    it("defaults to solid", () => {
      expect(wrapper.get("button").classes()).toContain("solid")
    })
    it("can be assigned a different variation", async () => {
      wrapper.setProps({ variation: "outline" })
      await nextTick()
      expect(wrapper.get("button").classes()).toContain("outline")
    })
  })
  describe("Type", () => {
    it("defaults to being a button", () => {
      expect(wrapper.vm.type).toBe("button")
    })
    it("can be a submit button", async () => {
      wrapper.setProps({ type: "submit" })
      await nextTick()
      expect(wrapper.vm.type).toBe("submit")
    })
  })
  describe("System alerts", () => {
    it("should not emit an alert when there is no alert", () => {
      const button1 = wrapper.find("button")
      button1.trigger("click")
      const emitted1 = wrapper.emitted()
      expect(Object.prototype.hasOwnProperty.call(emitted1, "button-clicked")).toBe(true)
      expect(Object.prototype.hasOwnProperty.call(emitted1, "system-alert")).toBe(false)
    })
    it("emits an alert when there is an alert", async () => {
      wrapper.setProps({
        customAlertEvent: {
          alertStatus: "success",
          alertMessage: "This is my message.",
        },
      })
      await nextTick()
      const button2 = wrapper.find("button")
      button2.trigger("click")
      const emitted2 = wrapper.emitted()
      expect(Object.prototype.hasOwnProperty.call(emitted2, "system-alert")).toBe(true)
    })
  })
  describe("Button click", () => {
    it("emits a button-clicked event when the user presses the button", async () => {
      await wrapper.find(".lux-button").trigger("click")
      expect(wrapper.emitted()["button-clicked"].length).toEqual(1)
    })
  })
  it("can focus via prop", async () => {
    wrapper = mount(LuxInputButton, { attachTo: document.body })

    wrapper.setProps({ focused: true })
    await nextTick()

    expect(document.activeElement).toEqual(wrapper.find("button").element)
  })
})
