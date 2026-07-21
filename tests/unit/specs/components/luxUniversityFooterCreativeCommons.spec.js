import LuxUniversityFooterCreativeCommons from "@/components/LuxUniversityFooterCreativeCommons.vue"
import { mount } from "@vue/test-utils"
import { describe, it } from "vitest"

describe("LuxUniversityFooterCreativeCommons", () => {
  it("defaults to dark mode", () => {
    const component = mount(LuxUniversityFooterCreativeCommons)
    expect(component.find(".dark").exists()).toBe(true)
  })
  it("can be in light mode", () => {
    const component = mount(LuxUniversityFooterCreativeCommons, { props: { theme: "light" } })
    expect(component.find(".light").exists()).toBe(true)
    expect(component.find(".dark").exists()).toBe(false)
  })
})
