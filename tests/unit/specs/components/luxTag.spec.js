import { mount } from "@vue/test-utils"
import LuxTag from "@/components/LuxTag.vue"
import { nextTick } from "vue"

describe("LuxTag.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxTag, {
      propsData: {
        tagItems: [
          { name: "Foo", href: "/example/" },
          { name: "Bar", href: "/example/" },
          { name: "Baz", href: "/example/" },
        ],
      },
    })
  })

  it("should render the correct type", async () => {
    wrapper.get("ul")
    expect(() => wrapper.get(".lux-tag.tag")).toBeTruthy
    wrapper.setProps({ type: "filter" })
    await nextTick()
    wrapper.get("ul")
    expect(() => wrapper.get(".lux-tag.filter")).toBeTruthy
  })
})
