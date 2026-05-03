import LuxBadge from "@/components/LuxBadge.vue"
import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"

describe("LuxBadge", () => {
  it("defaults to green", () => {
    const component = mount(LuxBadge, { slots: { default: "Hello!" } })
    expect(component.text()).toEqual("Hello!")
    expect(component.find(".lux-badge-green").exists()).toBe(true)
  })
  it("can be red", () => {
    const component = mount(LuxBadge, { props: { color: "red" }, slots: { default: "Hello!" } })
    expect(component.find(".lux-badge-red").exists()).toBe(true)
  })
})
