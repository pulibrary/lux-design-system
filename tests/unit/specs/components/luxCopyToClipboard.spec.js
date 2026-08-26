import { nextTick } from "vue"
import { mount } from "@vue/test-utils"
import LuxCopyToClipboard from "@/components/LuxCopyToClipboard.vue"

describe("luxCopyToClipboard.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxCopyToClipboard, {
      props: {
        clipboardValue: "Here's some info for you.",
      },
    })
  })

  it("should have a clipboard icon", () => {
    const el = wrapper.find(".frames")
    expect(el.exists()).toBe(true)
  })

  it("should have a check icon on click", async () => {
    expect(wrapper.findComponent({ name: "LuxIconCopy" })).toBeTruthy
    expect(wrapper.findComponent({ name: "LuxIconCheck" })).toBeFalsy
    const button = wrapper.find("button")
    button.trigger("click")
    await nextTick()
    expect(wrapper.findComponent({ name: "LuxIconCopy" })).toBeFalsy
    expect(wrapper.findComponent({ name: "LuxIconCheck" })).toBeTruthy
  })
})
