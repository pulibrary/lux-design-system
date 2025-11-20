import { mount } from "@vue/test-utils"
import LuxAutocompleteInput from "@/components/LuxAutocompleteInput.vue"
import { nextTick } from "vue"

describe("InputAutocomplete.vue", () => {
  let wrapper

  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn()
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
          { id: 5, label: "Passion Fruit" },
          { id: 6, label: "Star Fruit" },
        ],
        focused: true,
      },
      attachTo: document.body,
    })
  })

  it("should be focused when the focused property is set to true", () => {
    const input = wrapper.find("input.displayInput").element
    expect(input).toBe(document.activeElement)
  })

  it("should populate the inputValue with an id when defaultValue is passed and found in items", () => {
    expect(wrapper.vm.inputValue).toBe(2)
  })

  it("keyboard navigation works", async () => {
    const input = wrapper.find("input.displayInput")

    input.trigger("focus")
    input.setValue("")
    await nextTick()
    expect(wrapper.vm.arrowCounter).toBe(-1)
    input.trigger("keydown.down")
    expect(wrapper.vm.arrowCounter).toBe(0)
    input.trigger("keydown.down")
    expect(wrapper.vm.arrowCounter).toBe(1)
    input.trigger("keydown.up")
    expect(wrapper.vm.arrowCounter).toBe(0)
    input.trigger("keydown.down")
    expect(wrapper.vm.arrowCounter).toBe(1)
    input.trigger("keydown.down")
    expect(wrapper.vm.arrowCounter).toBe(2)
    input.trigger("keydown.down")
    expect(wrapper.vm.arrowCounter).toBe(3)
    input.trigger("keydown.down")
    expect(wrapper.vm.arrowCounter).toBe(4)
    await nextTick()
    expect(Element.prototype.scrollIntoView.mock.calls).toHaveLength(7)
  })

  it("can announce the currently selected item via aria-activedescendant", async () => {
    const input = wrapper.find("input.displayInput")
    input.trigger("focus")
    // Enter the first few letters of pineapple
    input.setValue("pin")
    // Select pineapple
    input.trigger("keydown.down")
    await nextTick()

    const pineappleItem = wrapper.find(".lux-autocomplete-result")
    expect(pineappleItem.text()).toEqual("Pineapple")
    expect(input.attributes("aria-activedescendant")).toEqual(pineappleItem.attributes("id"))
  })

  it("emits a selected event when the user selects an item via keyboard", () => {
    const input = wrapper.find("input.displayInput")
    input.trigger("focus")
    // Enter the first few letters of mango
    input.setValue("mang")
    // Select mango
    input.trigger("keydown.down")
    input.trigger("keydown.enter")

    expect(wrapper.emitted().selected.length).toEqual(1)
    expect(wrapper.emitted().selected[0]).toEqual([3]) // The ID of Mango
  })

  it("emits a selected event when the user selects an item via mouse click", async () => {
    const input = wrapper.find("input.displayInput")
    input.trigger("focus")
    // Enter the first few letters of mango
    input.setValue("mang")
    // Wait for Vue to re-render the DOM
    await nextTick()

    const mangoItem = wrapper.find(".lux-autocomplete-result")
    expect(mangoItem.text()).toEqual("Mango")
    mangoItem.trigger("mousedown")

    expect(wrapper.emitted().selected.length).toEqual(1)
    expect(wrapper.emitted().selected[0]).toEqual([3]) // The ID of Mango
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
    wrapper.find("input.displayInput").setValue("Code4lib 2025")
    expect(wrapper.emitted().input.length).toEqual(2)
    expect(wrapper.emitted().input[1]).toEqual(["Code4lib 2025"])
  })

  describe("placeholder", () => {
    it("displays no placeholder by default", () => {
      expect(wrapper.find("input").attributes("placeholder")).toBeFalsy()
    })

    it("displays the provided placeholder if supplied as a prop", async () => {
      wrapper.setProps({ placeholder: "Please choose your favorite one!" })
      await nextTick()
      expect(wrapper.find("input").attributes("placeholder")).toEqual(
        "Please choose your favorite one!"
      )
    })
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

  describe("asynchronous usage", () => {
    beforeEach(() => wrapper.setProps({ isAsync: true }))

    it("lets the user know that things are loading", async () => {
      wrapper.find("input").trigger("click")
      await nextTick()
      expect(wrapper.text()).toContain("Loading")
    })

    it("updates options according to the newly loaded items", async () => {
      wrapper.find("input").trigger("click")
      wrapper.setProps({
        items: [
          { label: "Tea", id: 1 },
          { label: "Coffee", id: 2 },
          { label: "Hot Chocolate", id: 3 },
        ],
      })
      await nextTick()

      expect(wrapper.text()).not.toContain("Loading")
      expect(wrapper.text()).toContain("Hot Chocolate")
    })

    it("can handle newly loaded strings", async () => {
      wrapper.find("input").trigger("click")
      wrapper.setProps({ items: ["Omura whale", "Bowhead whale", "North Pacific right whale"] })
      await nextTick()

      expect(wrapper.text()).not.toContain("Loading")
      expect(wrapper.text()).toContain("Omura whale")
    })

    it("resets the arrow location when new items are passed", async () => {
      const input = wrapper.find("input.displayInput")
      wrapper.find("input").trigger("click")
      wrapper.setProps({
        items: [
          { label: "Tea", id: 1 },
          { label: "Coffee", id: 2 },
          { label: "Hot Chocolate", id: 3 },
        ],
      })
      input.trigger("focus")
      input.setValue("")
      await nextTick()
      expect(wrapper.vm.arrowCounter).toBe(-1)
      input.trigger("keydown.down")
      expect(wrapper.vm.arrowCounter).toBe(0)
      input.trigger("keydown.down")
      expect(wrapper.vm.arrowCounter).toBe(1)
      input.trigger("keydown.down")
      expect(wrapper.vm.arrowCounter).toBe(2)

      wrapper.setProps({ items: ["Omura whale", "Bowhead whale", "North Pacific right whale"] })
      await nextTick()

      expect(wrapper.text()).not.toContain("Loading")
      expect(wrapper.text()).toContain("Omura whale")
      expect(wrapper.vm.arrowCounter).toBe(-1)
    })
  })
})
