import { mount } from "@vue/test-utils"
import LuxGridItem from "@/components/LuxGridItem.vue"
import { nextTick } from "vue"

describe("GridItem.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxGridItem, {
      props: {
        columns: "lg-9 sm-6",
      },
    })
  })

  it("should have the appropriate class to define the columns", async () => {
    wrapper.setProps({ columns: "lg-9 sm-6" })
    await nextTick()
    const gridItem = wrapper.find(".lux-col")
    expect(gridItem.classes()).toContain("lg-9")
    expect(gridItem.classes()).toContain("sm-6")
  })

  it("should have the appropriate class to define the vertical alignment", async () => {
    wrapper.setProps({ vertical: "start" })
    await nextTick()
    const gridItem = wrapper.find(".lux-col")
    expect(gridItem.classes()).toContain("start")
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
