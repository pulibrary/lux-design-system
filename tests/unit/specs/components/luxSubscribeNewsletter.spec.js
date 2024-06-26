import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import _LuxSubscribeNewsletter from "@/components/_LuxSubscribeNewsletter.vue"

describe("SubscribeNewsletter component", () => {
  test("it has an input field", () => {
    const wrapper = mount(_LuxSubscribeNewsletter)
    expect(wrapper.find("input").attributes("type")).toEqual("email")
  })
  test("it has a subscribe button", () => {
    const wrapper = mount(_LuxSubscribeNewsletter)
    expect(wrapper.find("button").text()).toEqual("Subscribe")
  })
})
