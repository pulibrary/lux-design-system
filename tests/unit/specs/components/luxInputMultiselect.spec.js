import { mount } from "@vue/test-utils"
import LuxInputMultiselect from "@/components/LuxInputMultiselect.vue"
import { nextTick } from "vue"

async function addMangoItemByMouse(wrapper) {
  const input = wrapper.find("#displayInput")
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

  it("can create a hidden input for use in an HTML form", async () => {
    wrapper = mount(LuxInputMultiselect, {
      props: {
        items: fruits,
      },
      slots: {
        hiddenInput: `<template #hiddenInput="{selectedItems}"><input name="selectedFruit[]" type="hidden" :value="selectedItems[0]?.id" /></template>`,
      },
    })
    await addMangoItemByMouse(wrapper)

    expect(wrapper.find("input[type='hidden']").attributes("name")).toEqual("selectedFruit[]")
    expect(wrapper.find("input[type='hidden']").attributes("value")).toEqual("4")
  })
})
