import { mount } from "@vue/test-utils"
import LuxTextStyle from "@/components/LuxTextStyle.vue"

describe("LuxTextStyle.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxTextStyle, {
      slots: {
        default: "foo",
      },
    })
  })

  it("should be of the element type that is passed in as a prop", async () => {
    expect(wrapper.find("p").exists()).toBe(true)
    expect(wrapper.find("span").exists()).toBe(false)
    // can't setProps here because the component must be regenerated to change its wrapper
    const wrapper2 = mount(LuxTextStyle, {
      slots: {
        default: "foo",
      },
      props: {
        type: "span",
      },
    })
    expect(wrapper2.find("p").exists()).toBe(false)
    expect(wrapper2.find("span").exists()).toBe(true)
  })

  it("should render slotted text", () => {
    const text = wrapper.find("p")
    expect(text.text()).toBe("foo")
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
