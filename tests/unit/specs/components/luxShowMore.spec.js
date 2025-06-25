import { mount } from "@vue/test-utils"
import LuxShowMore from "@/components/LuxShowMore.vue"
import { nextTick } from "vue"

describe("LuxShowMore.vue", () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(LuxShowMore, {
      props: {
        showLabel: "View Abstract",
        hideLabel: "Hide Abstract",
        contentId: "my-disclosure",
        characterLimit: 25,
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
  })

  it("shows the truncated text by default", () => {
    expect(wrapper.text()).toContain("Hello, how is it going?")
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

  it("does not truncate if the characterLimit is the exact length of the text", async () => {
    wrapper.setProps({ characterLimit: 56 })
    await nextTick()

    expect(wrapper.text()).toContain("Hello, how is it going? I hope you will read my article.")
  })

  it("does not truncate if the characterLimit is longer than the text", async () => {
    wrapper.setProps({ characterLimit: 100 })
    await nextTick()

    expect(wrapper.text()).toContain("Hello, how is it going? I hope you will read my article.")
  })

  it("does not show the expand if whitespace was the only thing truncated", async () => {
    wrapper = mount(LuxShowMore, {
      props: {
        showLabel: "View Abstract",
        hideLabel: "Hide Abstract",
        contentId: "my-disclosure",
        characterLimit: 5,
      },
      slots: {
        default: "Hello                  ",
      },
      attachTo: document.body,
    })

    expect(wrapper.find("button").exists()).toBe(false)
  })
})
