import { mount } from "@vue/test-utils"
import LuxWrapper from "@/components/LuxWrapper.vue"
import { nextTick } from "vue"

describe("LuxWrapper.vue", () => {
  let wrapper

  it("can accept an arbitrary number of pixels in the maxWidth prop", () => {
    wrapper = mount(LuxWrapper, {
      props: {
        maxWidth: 123,
      },
    })
    expect(wrapper.find("div").attributes("style")).toEqual("max-width: 123px;")
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
