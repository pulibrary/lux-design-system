import { mount } from "@vue/test-utils"
import LuxHyperlink from "@/components/LuxHyperlink.vue"
import { nextTick } from "vue"

describe("LuxHyperlink.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxHyperlink, {
      props: {
        href: "https://library.princeton.edu",
      },
      slots: {
        default: "I'll take you places",
      },
    })
  })

  it("should render the appropriate level heading", () => {
    wrapper.setProps({ href: "https://library.princeton.edu" })
    const link = wrapper.find("a")
    expect(link.text()).toBe("I'll take you places")
  })

  it("should render the appropriate class name", async () => {
    wrapper.setProps({ href: "https://library.princeton.edu", variation: "button" })
    await nextTick()
    const link = wrapper.find("a")
    expect(link.classes()).toContain("button")
  })

  it("does not have a target attribute by default", () => {
    expect(wrapper.find("a").attributes("target")).toBeUndefined()
  })

  it("does not have an icon by default", () => {
    expect(wrapper.find("a").find("svg").exists()).toBe(false)
  })

  describe("with the newTab prop", () => {
    beforeEach(async () => {
      wrapper.setProps({ newTab: true })
      await nextTick()
    })

    it("adds target _blank", () => {
      expect(wrapper.find("a").attributes("target")).toEqual("_blank")
    })

    it("adds an icon", () => {
      const link = wrapper.find("a")
      expect(link.find("svg").exists()).toBe(true)
    })

    it("tells screen readers that the link opens in a new tab", () => {
      expect(wrapper.find("a").text()).toContain("opens in new tab")
    })
  })

  describe("with the underline prop", () => {
    beforeEach(async () => {
      wrapper.setProps({ underline: true })
      await nextTick()
    })

    it("adds an underline class", () => {
      expect(wrapper.find("a").classes()).toContain("lux-link-underline")
    })
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
