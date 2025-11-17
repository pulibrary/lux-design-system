import { flushPromises, mount } from "@vue/test-utils"
import LuxInputAsyncSelect from "@/components/LuxInputAsyncSelect.vue"
import { nextTick } from "vue"

jest.useFakeTimers()

async function addMangoItemByMouse(wrapper) {
  const input = wrapper.find("input.displayInput")
  // Enter mango
  input.setValue("mango")

  // Allow the debounce to occur
  jest.runAllTimers()
  await flushPromises()

  const items = wrapper.findAll(".lux-autocomplete-result")
  expect(items[0].text()).toEqual("mango #1")
  expect(items[1].text()).toEqual("mango #2")
  items[0].trigger("mousedown")
  await nextTick()
}

let wrapper

describe("AsyncSelect.vue", () => {
  beforeEach(() => {
    wrapper = mount(LuxInputAsyncSelect, {
      props: {
        label: "Your preferred fruits",
        asyncLoadItemsFunction: async query => [
          { label: `${query} #1`, id: 1 },
          { label: `${query} #2`, id: 2 },
        ],
        debounceTimeout: 1,
      },
    })
  })

  it("adds selected items to the selected area", async () => {
    await addMangoItemByMouse(wrapper)
    expect(wrapper.find("input").element.value).toEqual("mango #1")
  })

  it("can create a hidden input for use in an HTML form", async () => {
    wrapper = mount(LuxInputAsyncSelect, {
      props: {
        label: "Your preferred fruits",
        asyncLoadItemsFunction: async query => [
          { label: `${query} #1`, id: 1 },
          { label: `${query} #2`, id: 2 },
        ],
      },
      slots: {
        hiddenInput: `<template #hiddenInput="{selectedItem}"><input name="selectedFruit" type="hidden" :value="selectedItem" /></template>`,
      },
    })
    await addMangoItemByMouse(wrapper)

    expect(wrapper.find("input[type='hidden']").attributes("name")).toEqual("selectedFruit")
    expect(wrapper.find("input[type='hidden']").attributes("value")).toEqual("1")
  })

  it("requires an accessible name to be passed in", () => {
    expect(LuxInputAsyncSelect.props.label.required).toBe(true)
  })

  it("requires an asynchronous function to be passed in", () => {
    expect(LuxInputAsyncSelect.props.asyncLoadItemsFunction.required).toBe(true)
  })

  it("uses the label prop to label the input", () => {
    wrapper = mount(LuxInputAsyncSelect, {
      props: {
        label: "Your preferred fruits",
        asyncLoadItemsFunction: async query => [
          { label: `${query} #1`, id: 1 },
          { label: `${query} #2`, id: 2 },
        ],
      },
    })

    const inputId = wrapper.find("input").attributes("id")
    const label = wrapper.find(`label[for=${inputId}]`)
    expect(label.text()).toEqual("Your preferred fruits")
  })

  it("can use an async function to provide the entries", async () => {
    wrapper = mount(LuxInputAsyncSelect, {
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

    // Allow the debounce to occur
    jest.runAllTimers()
    await flushPromises()

    const items = wrapper.findAll(".lux-autocomplete-result")
    expect(items[0].text()).toEqual("my query #1")
    expect(items[1].text()).toEqual("my query #2")
  })
})
