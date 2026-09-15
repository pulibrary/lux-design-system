import { mount } from "@vue/test-utils"
import { defineComponent, nextTick } from "vue"
import LuxTab from "@/components/LuxTab.vue"
import LuxTabWrapper from "@/components/LuxTabWrapper.vue"

describe("LuxTabWrapper and LuxTab", () => {
  const TabInterface = defineComponent({
    components: {
      LuxTab,
      LuxTabWrapper,
    },

    template: `
      <LuxTabWrapper>
        <LuxTab title="Dog">
          Aspen is a cute dog!
        </LuxTab>

        <LuxTab title="Tree">
          Aspen is a majestic tree!
        </LuxTab>
      </LuxTabWrapper>
    `,
  })

  let wrapper

  beforeEach(async () => {
    wrapper = mount(TabInterface)
    await nextTick()
  })

  it("renders the tab titles", () => {
    const tabs = wrapper.findAll(".tabs-header button")

    expect(tabs).toHaveLength(2)
    expect(tabs[0].text()).toBe("Dog")
    expect(tabs[1].text()).toBe("Tree")
  })

  it("marks the first tab as selected by default", () => {
    const tabs = wrapper.findAll('[role="tab"]')

    expect(tabs[0].attributes("aria-selected")).toBe("true")
    expect(tabs[1].attributes("aria-selected")).toBe("false")
  })

  it("renders only the active tab panel", () => {
    const panels = wrapper.findAll(".lux-tab-panel")

    expect(panels).toHaveLength(1)
    expect(panels[0].text()).toBe("Aspen is a cute dog!")
  })

  it("changes the active tab when clicked", async () => {
    const tabs = wrapper.findAll('[role="tab"]')

    await tabs[1].trigger("click")
    await nextTick()

    expect(tabs[0].attributes("aria-selected")).toBe("false")
    expect(tabs[1].attributes("aria-selected")).toBe("true")

    const panels = wrapper.findAll(".lux-tab-panel")

    expect(panels).toHaveLength(1)
    expect(panels[0].text()).toBe("Aspen is a majestic tree!")
  })
})
