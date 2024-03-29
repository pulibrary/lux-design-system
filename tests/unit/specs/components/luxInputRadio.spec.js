import { createLocalVue, mount } from "@vue/test-utils"
import { nextTick } from "vue"
import LuxInputRadio from "@/components/LuxInputRadio.vue"

describe("LuxInputRadio.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxInputRadio, {
      slots: {
        default: "Apply Changes.",
      },
      propsData: {
        id: "foo",
        options: [
          {
            name: "opt 1",
            value: "one",
            id: "radio-opt1",
            checked: true,
          },
          {
            name: "opt 2",
            value: "two",
            id: "radio-opt2",
            checked: false,
          },
        ],
      },
    })
  })

  it("should emit a change event with the correct value when clicked", () => {
    wrapper.findAll("input").at(1).trigger("change")
    expect(wrapper.emitted().change[0]).toEqual(["two"])
  })

  it("should emit an inputblur event with the correct value when focus is blurred", () => {
    const radio = wrapper.findAll("input").at(1)
    radio.trigger("focus")
    radio.trigger("blur")
    const emitted = wrapper.emitted()
    expect(Object.prototype.hasOwnProperty.call(emitted, "inputblur")).toBe(true)
  })

  it("should have a label for the correct id", () => {
    const label = wrapper.findAll("label").at(1)
    expect(label.text()).toBe("two")
    expect(label.attributes().for).toBe("radio-opt2")
  })

  it("should stack if vertical is true", async () => {
    const radio = wrapper.findAll(".lux-radio").at(0)
    expect(radio.classes()).toContain("lux-inline")
    await wrapper.setProps({ vertical: true })
    expect(radio.classes()).not.toContain("lux-inline")
  })

  it("should display an errormessage with the proper role when passed in as a prop", async () => {
    expect(wrapper.find(".lux-error").exists()).toBe(false)
    await wrapper.setProps({ errormessage: "Something went wrong." })
    expect(wrapper.find(".lux-error").exists()).toBe(true)
    expect(wrapper.find(".lux-error").attributes().role).toBe("alert")
  })

  it("should display a legend if groupLabel is passed in as a prop", async () => {
    expect(wrapper.find("legend").exists()).toBe(false)
    await wrapper.setProps({ groupLabel: "Multiple choice:" })
    expect(wrapper.find("legend").exists()).toBe(true)
  })

  it("should have the id that is passed in as a prop", () => {
    const radio = wrapper.findAll("input").at(1)
    expect(radio.attributes().id).toBe("radio-opt2")
  })

  it("should have a fieldset wrapper if groupLabel is passed in as a prop", async () => {
    const fieldset = wrapper.find("fieldset")
    expect(fieldset.exists()).toBe(false)
    // can't setProps here because the component must be regenerated to change its wrapper
    const wrapper2 = mount(LuxInputRadio, {
      slots: {
        default: "Apply Changes.",
      },
      propsData: {
        id: "bar",
        groupLabel: "Multiple choice:",
        options: [
          {
            name: "opt 1",
            value: "one",
            id: "radio-opt1",
            checked: true,
          },
        ],
      },
    })
    const fieldset2 = wrapper2.find("fieldset")
    expect(fieldset2.exists()).toBe(true)
  })

  // checked and disabled are not showing up in snapshots
  // cannot seem to test
  //
  // it("should not be clickable if disabled", () => {
  //   wrapper.setProps({ options: [
  //     {
  //       name: "opt 1",
  //       value: "one",
  //       id: "radio-opt1",
  //       disabled: true,
  //       checked: false
  //     }
  //   ] })
  //   const radio = wrapper.findAll(".radio").at(0)
  //   radio.trigger("click")
  //   expect(radio.attributes().checked).toBe(false)
  // })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
