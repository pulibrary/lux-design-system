import { mount } from "@vue/test-utils"
import LuxHyperlink from "@/components/LuxHyperlink.vue"
import { nextTick } from "vue"

describe("Hyperlink.vue", () => {
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

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
