import LuxLibraryFooter from "@/components/LuxLibraryFooter.vue"
import { mount } from "@vue/test-utils"
import { describe, it } from "vitest"

describe("LuxLibraryFooter", () => {
  it("defaults to dark mode", () => {
    const component = mount(LuxLibraryFooter)
    expect(component.find(".dark").exists()).toBe(true)
  })
  it("can be in light mode", () => {
    const component = mount(LuxLibraryFooter, { props: { theme: "light" } })
    expect(component.find(".light").exists()).toBe(true)
    expect(component.find(".dark").exists()).toBe(false)
  })
})
