import { mount } from "@vue/test-utils"
import LuxGridContainer from "@/components/LuxGridContainer.vue"

describe("GridItem.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxGridContainer, {
      props: {
        horizontal: "center",
      },
    })
  })

  it("can take the horizontal alignment from the props", () => {
    expect(wrapper.find("div").classes()).toContain("center")
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
