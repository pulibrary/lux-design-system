import { mount } from "@vue/test-utils"
import LuxDisclosure from "@/components/LuxDisclosure.vue"
import { nextTick } from "vue"

describe("LuxDisclosure.vue", () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(LuxDisclosure, {
      props: {
        showLabel: "View Abstract",
        hideLabel: "Hide Abstract",
        contentId: "my-disclosure",
      },
      slots: {
        default: "Hello, how is it going? I hope you will read my article.",
      },
      attachTo: document.body,
    })
  })

  it("shows the showLabel text by default", () => {
    expect(wrapper.find("button").attributes()["aria-expanded"]).toEqual("false")
    expect(wrapper.text()).toContain("View Abstract")
    expect(wrapper.text()).not.toContain("Hide Abstract")
    expect(wrapper.text()).not.toContain("Hello, how is it going? I hope you will read my article.")
  })

  it("has no aria-describedby by default", () => {
    expect("aria-describedby" in wrapper.find("button").attributes()).toBe(false)
  })

  it("can create an aria-describedby from the descriptionId prop", async () => {
    wrapper.setProps({ descriptionId: "other-element-3" })
    await nextTick()

    expect(wrapper.find("button").attributes()["aria-describedby"]).toEqual("other-element-3")
  })

  it("can open when clicked", async () => {
    wrapper.find("button").trigger("click")
    await nextTick()
    expect(wrapper.find("button").attributes()["aria-expanded"]).toEqual("true")
    expect(wrapper.find("button").attributes()["aria-controls"]).toEqual("my-disclosure")
    expect(wrapper.text()).not.toContain("View Abstract")
    expect(wrapper.text()).toContain("Hide Abstract")
    expect(wrapper.find("#my-disclosure").text()).toContain(
      "Hello, how is it going? I hope you will read my article."
    )
  })

  it("sets focus on the content half a second after click", async () => {
    jest.useFakeTimers()
    wrapper.find("button").trigger("click")
    await nextTick()
    jest.advanceTimersByTime(500)
    const content = wrapper.find("#my-disclosure").element
    expect(content).toEqual(document.activeElement)
  })
})
