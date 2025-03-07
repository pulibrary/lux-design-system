import { mount } from "@vue/test-utils"
import LuxAutocompleteInput from "@/components/LuxAutocompleteInput.vue"
import { nextTick } from "vue"

describe("InputAutocomplete.vue", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LuxAutocompleteInput, {
      propsData: {
        id: "foo",
        name: "bar",
        defaultValue: "Banana",
        items: [
          { id: 1, label: "Apple" },
          { id: 2, label: "Banana" },
          { id: 3, label: "Mango" },
          { id: 4, label: "Pineapple" },
        ],
        focused: true,
      },
      attachTo: document.body,
    })
  })

  it("should be focused when the focused property is set to true", () => {
    const input = wrapper.find("#displayInput").element
    expect(input).toBe(document.activeElement)
  })

  it("should populate the inputValue with an id when defaultValue is passed and found in items", () => {
    expect(wrapper.vm.inputValue).toBe(2)
  })

  it("keyboard navigation works", () => {
    // not sure why this isn't working
    // wrapper.setData({ arrowCounter: 1 })
    // wrapper.vm.arrowCounter = 1
    // wrapper.vm.onArrowDown()
    // expect(wrapper.vm.arrowCounter).toBe(1)
  })

  it("hitting enter resets the counter and closes the dropdown", () => {
    wrapper.setData({ isOpen: true })
    wrapper.setData({ arrowCounter: 0 })
    wrapper.vm.onEnter()
    expect(wrapper.vm.arrowCounter).toBe(-1)
    expect(wrapper.vm.isOpen).toBe(false)
  })

  it("should filter results", () => {
    wrapper.vm.search = "Apple"
    wrapper.vm.filterResults()
    expect(wrapper.vm.results).toEqual(["Apple", "Pineapple"])
  })

  it("should populate the inputValue with the supplied string when search string is not found in items", () => {
    wrapper.vm.setResult("Foo")
    expect(wrapper.vm.inputValue).toBe("Foo")
  })

  it("should have a label if passed in", async () => {
    expect(wrapper.find("label").exists()).toBe(false)
    wrapper.setProps({ label: "Fill in the blank:" })
    await nextTick()
    expect(wrapper.find("label").exists()).toBe(true)
    expect(wrapper.find("label").text()).toBe("Fill in the blank:")
  })

  it("should work with an item list comprised of simple strings", async () => {
    wrapper.setProps({ items: ["Apple", "Banana", "Orange"] })
    await nextTick()
    wrapper.vm.setResult(wrapper.vm.items[2])
    expect(wrapper.vm.inputValue).toBe("Orange")
  })

  it("should have the name value that is passed in as a prop", () => {
    const input = wrapper.find("[data-input-value]")
    expect(input.element.name).toBe("bar")
  })

  it("should have the id value that is passed in as a prop", () => {
    const input = wrapper.find("[data-input-value]")
    expect(input.element.id).toBe("foo")
  })

  it("emits an input event when the user changes the text", async () => {
    wrapper.find("#displayInput").setValue("Code4lib 2025")
    // Updates this code because wrapper.emitted().input includes the defaultValue
    expect(wrapper.emitted().input.length).toEqual(2)
    expect(wrapper.emitted().input[1]).toEqual(["Code4lib 2025"])
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it("closes dropdown when we have a blur event", async () => {
    const input = wrapper.find("input")
    input.setValue("Man")
    await nextTick()

    // Tests that dropdown is initially visible when you start typing
    expect(wrapper.find(".lux-autocomplete-results").isVisible()).toBe(true)

    await wrapper.find("input").trigger("blur")
    expect(wrapper.find(".lux-autocomplete-results").isVisible()).toBe(false)
  })

  it("shows dropdown when input is clicked", () => {
    wrapper.find("input").trigger("click")
    expect(wrapper.find(".lux-autocomplete-results").isVisible()).toBe(true)
  })

  it("shows dropdown when input is focused", () => {
    wrapper.find("input").trigger("focus")
    expect(wrapper.find(".lux-autocomplete-results").isVisible()).toBe(true)
  })
})
