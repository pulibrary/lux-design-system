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
        defaultValue: { label: "abc", id: 50 },
      },
    })
  })

  it("adds selected items to the selected area", async () => {
    await addMangoItemByMouse(wrapper)
    expect(wrapper.find("input").element.value).toEqual("mango #1")
  })

  it("should populate the selectedItem with json when defaultValue is passed and found in items", () => {
    expect(wrapper.vm.selectedItem).toEqual({ label: "abc", id: 50 })
    expect(wrapper.find("input").element.value).toEqual("abc")
  })

  it("emits a selected event when the user selects an item via keyboard", async () => {
    await addMangoItemByMouse(wrapper)

    expect(wrapper.emitted().selected.length).toEqual(1)
    expect(wrapper.emitted().selected[0]).toEqual([{ id: 1, label: "mango #1" }])
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
        "hidden-input": `<template #hidden-input="{selectedItem}"><input name="selectedFruit" type="hidden" :value="JSON.stringify(selectedItem)" /></template>`,
      },
    })
    await addMangoItemByMouse(wrapper)

    expect(wrapper.find("input[type='hidden']").attributes("name")).toEqual("selectedFruit")
    expect(wrapper.find("input[type='hidden']").attributes("value")).toEqual(
      '{"label":"mango #1","id":1}'
    )
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

    // Allow the debounce to occur
    jest.runAllTimers()
    await flushPromises()

    let items = wrapper.findAll(".lux-autocomplete-result")
    expect(items.length).toEqual(0)

    input.setValue("my query")

    // Allow the debounce to occur
    jest.runAllTimers()
    await flushPromises()

    items = wrapper.findAll(".lux-autocomplete-result")
    expect(items[0].text()).toEqual("my query #1")
    expect(items[1].text()).toEqual("my query #2")
  })

  it("can use query with blank if desired", async () => {
    wrapper = mount(LuxInputAsyncSelect, {
      props: {
        label: "Your preferred fruits",
        asyncLoadItemsFunction: async query => [
          { label: `${query} #1`, id: 1 },
          { label: `${query} #2`, id: 2 },
        ],
        searchOnEmptyQuery: true,
      },
    })

    const input = wrapper.find("input.displayInput")
    input.trigger("focus")

    // Allow the debounce to occur
    jest.runAllTimers()
    await flushPromises()

    let items = wrapper.findAll(".lux-autocomplete-result")
    expect(items.length).toEqual(2)
    expect(items[0].text()).toEqual("#1")
    expect(items[1].text()).toEqual("#2")

    input.setValue("my query")

    // Allow the debounce to occur
    jest.runAllTimers()
    await flushPromises()

    items = wrapper.findAll(".lux-autocomplete-result")
    expect(items[0].text()).toEqual("my query #1")
    expect(items[1].text()).toEqual("my query #2")
  })
})
