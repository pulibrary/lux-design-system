import { nextTick } from "vue"
import { mount } from "@vue/test-utils"
import LuxDropdownMenu from "@/components/LuxDropdownMenu.vue"
import LuxInputButton from "@/components/LuxInputButton.vue"
import LuxMenuBar from "@/components/LuxMenuBar.vue"

// create an extended `Vue` constructor

let wrapper

describe("LuxDropdownMenu.vue", () => {
  beforeEach(() => {
    wrapper = mount(LuxDropdownMenu, {
      props: {
        buttonLabel: "Dropdown",
        menuItems: [
          { name: "All", component: "All" },
          { name: "None", component: "None" },
          { name: "Alternate", component: "Alternate", disabled: true },
          { name: "Inverse", component: "Inverse" },
        ],
      },
      stubs: ["lux-input-button", "menu-bar"],
    })
  })

  it("should be of the element that is passed in as a prop", () => {
    expect(wrapper.find("div").exists()).toBe(true)
    expect(wrapper.find("form").exists()).toBe(false)
    // can't setProps here because the component must be regenerated to change its wrapper
    const wrapper2 = mount(LuxDropdownMenu, {
      propsData: {
        element: "form",
        buttonLabel: "Dropdown",
        menuItems: [
          { name: "All", component: "All" },
          { name: "None", component: "None" },
          { name: "Alternate", component: "Alternate", disabled: true },
          { name: "Inverse", component: "Inverse" },
        ],
      },
      stubs: ["lux-input-button", "lux-menu-bar"],
    })
    expect(wrapper2.find("div").exists()).toBe(false)
    expect(wrapper2.find("form").exists()).toBe(true)
  })

  it("should hide menu on button click", () => {
    expect(wrapper.vm.isVisible).toBe(false)
    wrapper.vm.buttonClicked()
    expect(wrapper.vm.isVisible).toBe(true)
  })

  it("should hide menu on menu item click", () => {
    wrapper.vm.buttonClicked()
    expect(wrapper.vm.isVisible).toBe(true)
    wrapper.vm.menuItemClicked()
    expect(wrapper.vm.isVisible).toBe(false)
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
