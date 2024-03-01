import { mount } from "@vue/test-utils"
import LuxInputSelect from "@/components/LuxInputSelect.vue"
import { nextTick } from "vue"

describe("LuxInputSelect.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxInputSelect, {
      propsData: {
        id: "foo",
        name: "foo",
        value: "two",
        options: [
          {
            name: "opt 1",
            value: "one",
            id: "select-opt1",
          },
          {
            name: "opt 2",
            value: "two",
            id: "select-opt2",
          },
        ],
      },
      attachTo: document.body,
    })
  })

  it("should emit a change event with the correct value when changed", () => {
    const select = wrapper.find("select")
    select.trigger("change")
    const emitted = wrapper.emitted()
    expect(emitted.change.length).toBe(1)
    expect(emitted.change[0]).toEqual(["two"])
  })

  it("should emit an inputblur event with the correct value when focus is blurred", () => {
    const select = wrapper.find("select")
    select.trigger("focus")
    select.trigger("blur")
    const emitted = wrapper.emitted()
    expect(Object.prototype.hasOwnProperty.call(emitted, "inputblur")).toBe(true)
  })

  it("should have a label if passed in", async () => {
    expect(wrapper.find("label").exists()).toBe(false)
    wrapper.setProps({ label: "Multiple choice:" })
    await nextTick()
    expect(wrapper.find("label").exists()).toBe(true)
    expect(wrapper.find("label").text()).toBe("Multiple choice:")
  })

  it("should display an errormessage with the proper role when passed in as a prop", async () => {
    expect(wrapper.find(".lux-error").exists()).toBe(false)
    wrapper.setProps({ errormessage: "Something went wrong." })
    await nextTick()
    expect(wrapper.find(".lux-error").exists()).toBe(true)
    expect(wrapper.find(".lux-error").attributes().role).toBe("alert")
  })

  it("should have the value that is passed in as a prop", () => {
    const select = wrapper.findAll("option").at(1)
    expect(select.attributes().value).toBe("two")
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  describe("focusSelect()", () => {
    it("focuses the select", async () => {
      const select = wrapper.find("select").element
      expect(select).not.toBe(document.activeElement)

      wrapper.vm.focusSelect()
      await nextTick()

      expect(select).toBe(document.activeElement)
    })
  })
})
