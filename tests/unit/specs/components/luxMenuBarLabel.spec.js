import { mount } from "@vue/test-utils"
import _LuxMenuBarLabel from "@/components/_LuxMenuBarLabel.vue"

describe("_LuxMenuBarLabel", () => {
  let wrapper
  describe("when item prop has a name", () => {
    beforeEach(() => {
      wrapper = mount(_LuxMenuBarLabel, {
        props: {
          item: { name: "Hello!" },
        },
      })
    })
    it("displays the name", () => {
      expect(wrapper.text()).toEqual("Hello!")
    })
  })
  describe("when item prop name contains HTML", () => {
    beforeEach(() => {
      wrapper = mount(_LuxMenuBarLabel, {
        props: {
          item: { name: '<script>alert("Bad!")</script>' },
        },
      })
    })
    it("escapes the HTML, so that it displays as text rather than being potentially unsafe", () => {
      expect(wrapper.text()).toEqual('<script>alert("Bad!")</script>')
      expect(wrapper.find("script").exists()).toBe(false)
    })
  })
  describe("when item prop has an unsafe_name", () => {
    beforeEach(() => {
      wrapper = mount(_LuxMenuBarLabel, {
        props: {
          item: { unsafe_name: "<span>Hello!</span>" },
        },
      })
    })
    it("does not escape the HTML", () => {
      expect(wrapper.text()).toEqual("Hello!")
      expect(wrapper.find("span").exists()).toBe(true)
    })
  })
  describe("when item prop has both a name and an unsafe_name", () => {
    beforeEach(() => {
      wrapper = mount(_LuxMenuBarLabel, {
        props: {
          item: {
            name: "Goodbye",
            unsafe_name: "<span>Hello!</span>",
          },
        },
      })
    })
    it("uses the unsafe name", () => {
      expect(wrapper.text()).toEqual("Hello!")
      expect(wrapper.find("span").exists()).toBe(true)
    })
  })
})
