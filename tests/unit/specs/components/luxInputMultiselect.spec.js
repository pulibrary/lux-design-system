import { flushPromises, mount } from "@vue/test-utils"
import LuxInputMultiselect from "@/components/LuxInputMultiselect.vue"
import { nextTick } from "vue"

async function addMangoItemByMouse(wrapper) {
  const input = wrapper.find("input.displayInput")
  input.trigger("focus")
  // Enter the first few letters of mango
  input.setValue("mang")
  // Wait for Vue to re-render the DOM
  await nextTick()

  const mangoItem = wrapper.find(".lux-autocomplete-result")
  expect(mangoItem.text()).toEqual("Mango")
  mangoItem.trigger("mousedown")
  await nextTick()
}

const fruits = [
  { id: 1, label: "Apple" },
  { id: 2, label: "Banana" },
  { id: 3, label: "Banana split" },
  { id: 4, label: "Mango" },
]

let wrapper

describe("MultiSelect.vue", () => {
  beforeEach(() => {
    wrapper = mount(LuxInputMultiselect, {
      props: {
        items: fruits,
        label: "Fruits",
      },
    })
  })

  it("adds selected items to the selected area", async () => {
    await addMangoItemByMouse(wrapper)
    expect(wrapper.find(".selected-items").text()).toContain("Mango")
  })

  it("accepts a slot for display of the selected item", async () => {
    wrapper = mount(LuxInputMultiselect, {
      props: {
        items: fruits,
        label: "Fruits",
      },
      slots: {
        item: `<template #item="{itemProps}">My fruit {{itemProps.label}} has an id {{itemProps.id}}</template>`,
      },
    })
    await addMangoItemByMouse(wrapper)

    expect(wrapper.find(".selected-items").text()).toContain("My fruit Mango has an id 4")
  })

  it("clears the input after selecting an item", async () => {
    await addMangoItemByMouse(wrapper)
    expect(wrapper.find("input").element.value).toEqual("")
  })

  it("can remove items from the selected area", async () => {
    await addMangoItemByMouse(wrapper)
    wrapper.find(".remove-item").trigger("click")
    await nextTick()

    expect(wrapper.find(".selected-items").text()).not.toContain("Mango")
  })

  it("does not let the user select the same item twice", async () => {
    await addMangoItemByMouse(wrapper)

    // Re-open the dropdown
    wrapper.find("input.displayInput").trigger("focus")
    await nextTick()

    const itemsInDropdown = wrapper.findAll(".lux-autocomplete-result").map(item => item.text())
    expect(itemsInDropdown).toContain("Apple", "Banana", "Banana split")
    // The selected item is not available to add again
    expect(itemsInDropdown).not.toContain("Mango")
  })

  it("can create a hidden input for use in an HTML form", async () => {
    wrapper = mount(LuxInputMultiselect, {
      props: {
        items: fruits,
        label: "Fruits",
      },
      slots: {
        hidden_input: `<template #hidden_input="{selectedItems}"><input name="selectedFruit[]" type="hidden" :value="selectedItems[0]?.id" /></template>`,
      },
    })
    await addMangoItemByMouse(wrapper)

    expect(wrapper.find("input[type='hidden']").attributes("name")).toEqual("selectedFruit[]")
    expect(wrapper.find("input[type='hidden']").attributes("value")).toEqual("4")
  })

  it("requires an accessible name to be passed in", () => {
    expect(LuxInputMultiselect.props.label.required).toBe(true)
  })

  it("uses the label prop to label the input", () => {
    wrapper = mount(LuxInputMultiselect, {
      props: {
        items: fruits,
        label: "Your preferred fruits",
      },
    })

    const inputId = wrapper.find("input").attributes("id")
    const label = wrapper.find(`label[for=${inputId}]`)
    expect(label.text()).toEqual("Your preferred fruits")
  })

  it("can use an async function to provide the entries", async () => {
    wrapper = mount(LuxInputMultiselect, {
      props: {
        label: "Your preferred fruits",
        asyncLoadItemsFunction: async query => [
          { label: `${query} #1`, id: 1 },
          { label: `${query} #2`, id: 2 },
        ],
      },
    })

    const input = wrapper.find("input.displayInput")
    input.trigger("focus")
    input.setValue("my query")
    await flushPromises()

    const items = wrapper.findAll(".lux-autocomplete-result")
    expect(items[0].text()).toEqual("my query #1")
    expect(items[1].text()).toEqual("my query #2")
  })
})
