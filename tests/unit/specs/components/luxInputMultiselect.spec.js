import { createLocalVue, mount } from "@vue/test-utils"
import LuxInputMultiselect from "@/components/LuxInputMultiselect.vue"

describe("LuxInputMultiselect.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxInputMultiselect, {
      stubs: ["wrapper", "input-text"],
      propsData: {
        id: "test_id",
        options: [
          { name: "Vue.js", code: "vu" },
          { name: "Javascript", code: "js" },
          { name: "Open Source", code: "os" },
        ],
        value: [{ name: "Javascript", code: "js" }],
      },
    })
  })

  it("should accept an optional label", async () => {
    expect(wrapper.find("label").exists()).toBe(false)
    await wrapper.setProps({ inputLabel: "Multiple choice:" })
    expect(wrapper.find("label").exists()).toBe(true)
    expect(wrapper.find("label").text()).toBe("Multiple choice:")
  })

  it("should connect the label to the field using the id", async () => {
    await wrapper.setProps({ inputLabel: "Multiple choice:" })
    expect(wrapper.find("label").attributes("for")).toBe("test_id")
    expect(wrapper.find("input").attributes("id")).toBe("test_id")
  })

  it("should have a list of options", () => {
    const allOptions = wrapper.findAll("li")

    expect(allOptions.at(0).text()).toBe("Vue.js")
    expect(allOptions.at(1).text()).toBe("Javascript")
    expect(allOptions.at(2).text()).toBe("Open Source")
  })

  it("should have selected options", () => {
    const selected = wrapper.findAll(".multiselect__tag")
    expect(selected.length).toBe(1)
    expect(selected.at(0).text()).toBe("Javascript")
  })

  it("should have values associated with the names", () => {
    const selected_hash = wrapper.find("code")
    expect(selected_hash.text().includes('code": "js"')).toBe(true)
  })

  it("should have an optional placeholder with a default", async () => {
    var placeholder = wrapper.find("input").attributes("placeholder")

    expect(placeholder).toBe("Search or add a tag")
    await wrapper.setProps({ placeholder: "Search or add an accessibility need" })
    var placeholder = wrapper.find("input").attributes("placeholder")
    expect(placeholder).toBe("Search or add an accessibility need")
  })
})
