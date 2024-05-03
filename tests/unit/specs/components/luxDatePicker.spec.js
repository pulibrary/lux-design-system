import { mount } from "@vue/test-utils"
import LuxDatePicker from "@/components/LuxDatePicker.vue"
import ResizeObserver from "resize-observer-polyfill"
import { nextTick } from "vue"
import {
  LuxIconAlert,
  LuxIconApproved,
  LuxIconBase,
  LuxIconDenied,
  LuxInputText,
} from "@/components"

global.ResizeObserver = ResizeObserver

const transitionStub = () => ({
  render: function (h) {
    return this.$options._renderChildren
  },
})

describe("LuxDatePicker.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxDatePicker, {
      stubs: { wrapper: true, "input-text": true, transition: transitionStub() },
      propsData: {
        id: "startDate",
        label: "Start Date",
        name: "start",
      },
      global: {
        components: {
          "lux-icon-alert": LuxIconAlert,
          "lux-icon-approved": LuxIconApproved,
          "lux-icon-base": LuxIconBase,
          "lux-icon-denied": LuxIconDenied,
          "lux-input-text": LuxInputText,
        },
      },
    })
  })

  it("should make sure the date is valid", () => {
    expect(wrapper.vm.isValidFormat("1/1/2019")).toBe(true)
    expect(wrapper.vm.isValidFormat("foo")).toBe(false)
  })

  it("should update the date value when a new date or a blank/null is input", () => {
    expect(wrapper.vm.date).toBe(null)
    wrapper.vm.updateInput("01/01/2019")
    const nd = new Date("2019-01-01")
    expect(wrapper.vm.date).toEqual(nd)
    wrapper.vm.updateInput(" ")
    expect(wrapper.vm.date).toBe(null)
  })

  it("should not update the date value when the input is an invalid date", () => {
    expect(wrapper.vm.date).toBe(null)
    wrapper.vm.updateInput("foo")
    expect(wrapper.vm.date).toBe(null)
  })

  it("should update the date range value when a new date range is input", async () => {
    wrapper.setProps({ mode: "range" })
    await nextTick()
    expect(wrapper.vm.range).toBe(null)
    wrapper.get("input").setValue("01/01/2019 - 01/02/2019")
    // For some reason the first input doesn't stick - this is a bug we should
    // fix somehow, but I've failed so far.
    wrapper.get("input").setValue("01/01/2019 - 01/02/2019")
    const s = new Date(Date.UTC(2019, 0, 1, 0, 0, 0))
    const e = new Date(Date.UTC(2019, 0, 2, 0, 0, 0))
    expect(wrapper.vm.range.start).toEqual(s)
    expect(wrapper.vm.range.end).toEqual(e)
  })

  it("should not update the date range value when the input is an invalid date range", () => {
    wrapper.setProps({ mode: "range" })
    expect(wrapper.vm.range).toBe(null)
    wrapper.vm.updateRangeInput("foo")
    expect(wrapper.vm.range).toBe(null)
  })

  it("should not update the date range value when the input is a partial date range", async () => {
    wrapper.setProps({ mode: "range" })
    await nextTick()
    expect(wrapper.vm.range).toBe(null)

    wrapper.get("input").setValue("10/22/202 - ")

    await nextTick()
    expect(wrapper.vm.range).toBe(null)
    expect(wrapper.get("input").element.value).toEqual("10/22/202 - ")
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
