import LuxDialog from "@/components/LuxDialog.vue"
import { mount } from "@vue/test-utils"
import { vi } from "vitest"

describe("LuxDialog", () => {
  it("provides an open() function", () => {
    const component = mount(LuxDialog)
    expect(component.find("dialog[open]").exists()).toBe(false)
    component.vm.open()
    expect(component.find("dialog[open]").exists()).toBe(true)
  })

  it("focuses the dialog content on open()", async () => {
    vi.useFakeTimers()
    const component = mount(LuxDialog, { attachTo: document.body })
    component.vm.open()
    vi.runAllTimers()
    expect(component.find(".dialog-content").element).toEqual(document.activeElement)
  })

  it("provides an close() function", () => {
    const component = mount(LuxDialog)
    component.vm.open()
    expect(component.find("dialog[open]").exists()).toBe(true)

    component.vm.close()
    expect(component.find("dialog[open]").exists()).toBe(false)
  })

  it("provides an isOpen() function", () => {
    const component = mount(LuxDialog)
    expect(component.vm.isOpen()).toBe(false)

    component.vm.open()
    expect(component.vm.isOpen()).toBe(true)

    component.vm.close()
    expect(component.vm.isOpen()).toBe(false)
  })

  it("allows you to pass in a title", () => {
    const component = mount(LuxDialog, { slots: { title: "My nice title" } })
    expect(component.text()).toContain("My nice title")
  })

  it("allows you to pass in content via the default slot", () => {
    const component = mount(LuxDialog, { slots: { default: "My nice content" } })
    expect(component.text()).toContain("My nice content")
  })

  it("allows you to pass in a footer", () => {
    const component = mount(LuxDialog, { slots: { footer: "My nice footer" } })
    expect(component.text()).toContain("My nice footer")
  })

  it("allows you to provide a DOM id", () => {
    const component = mount(LuxDialog, { props: { id: "my-id-123" } })
    expect(component.find("dialog").attributes("id")).toEqual("my-id-123")
  })
})
