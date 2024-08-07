import { mount } from "@vue/test-utils"
import LuxMenuBar from "@/components/LuxMenuBar.vue"
import { nextTick } from "vue"
import _LuxHamburger from "@/components/_LuxHamburger.vue"

let wrapper

describe("LuxMenuBar.vue", () => {
  beforeEach(() => {
    wrapper = mount(LuxMenuBar, {
      propsData: {
        active: "Foo",
        menuItems: [
          {
            name: "Foo",
            component: "Foo",
            href: "/example/",
            children: [{ name: "Baz", component: "Baz", href: "/example/" }],
          },
          { name: "Bar", component: "Bar", href: "/example/" },
        ],
      },
      global: {
        components: {
          "lux-hamburger": _LuxHamburger,
        },
      },
    })
  })

  it("should not have a 'presentation' role within the main menu", async () => {
    wrapper.setProps({ type: "main-menu" })
    await nextTick()
    expect(wrapper.element.innerHTML).not.toContain('role="presentation"')
  })

  it("should be a nav element if the type prop value is 'links'", async () => {
    expect(wrapper.find("nav").exists()).toBe(true)
    expect(wrapper.find("div").exists()).toBe(false)
    wrapper.setProps({ type: "buttons" })
    await nextTick()
    expect(wrapper.find("nav").exists()).toBe(false)
    expect(wrapper.find("div").exists()).toBe(true)
  })

  it("should emit the correct event when nav-item is clicked", () => {
    const navItem = wrapper.find(".lux-nav-item")
    navItem.trigger("click")
    const emitted1 = wrapper.emitted()
    expect(Object.prototype.hasOwnProperty.call(emitted1, "menu-item-clicked")).toBe(true)
  })

  it("should emit the correct event when menu-item is clicked", async () => {
    wrapper.setProps({ type: "buttons" })
    await nextTick()
    const menuItem = wrapper.find(".lux-menu-item")
    menuItem.trigger("click")
    const emitted2 = wrapper.emitted()
    expect(Object.prototype.hasOwnProperty.call(emitted2, "menu-item-clicked")).toBe(true)
  })

  it("should emit the correct event when active menu-item changes", () => {
    wrapper.vm.localActive = "Bar"
    const e = wrapper.emitted()
    expect(Object.prototype.hasOwnProperty.call(e, "input")).toBe(true)
  })
  /* eslint-disable quotes */
  it("should properly parse menu items into a hierarchy", () => {
    const menuItemsList = [
      {
        name: "Foo",
        component: "Foo",
        href: "/example/",
        children: [{ name: "Baz", component: "Baz", href: "/example/" }],
      },
      { name: "Bar", component: "Bar", href: "/example/" },
    ]
    expect(wrapper.vm.menuItems).toEqual(menuItemsList)
  })

  it("defaults to a dark theme", async () => {
    wrapper.setProps({ type: "main-menu" })
    await nextTick()
    expect(wrapper.get("nav").classes()).toContain("dark")
  })

  it("has a light theme", async () => {
    wrapper.setProps({ type: "main-menu", theme: "light" })
    await nextTick()
    expect(wrapper.get("nav").classes()).toContain("light")
  })

  it("can include arbitrary html with the unsafe_name property", async () => {
    wrapper.setProps({
      menuItems: [
        {
          name: "Foo Bar",
          unsafe_name: "<span id='my-foo'>Foo</span> <span class='my-bar'>Bar</span>",
        },
      ],
    })
    await nextTick()
    expect(wrapper.get("#my-foo").text()).toEqual("Foo")
    expect(wrapper.get(".my-bar").text()).toEqual("Bar")
  })

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  describe("when type is main-menu", () => {
    it("emits menu-item-clicked with metadata about the clicked menu item", async () => {
      wrapper.setProps({ type: "main-menu" })
      await nextTick()
      wrapper.findAll(".lux-nav-item")[1].trigger("click")

      expect(wrapper.emitted()["menu-item-clicked"].length).toEqual(1)
      expect(wrapper.emitted()["menu-item-clicked"][0]).toEqual([
        { name: "Bar", component: "Bar", href: "/example/" },
      ])
    })
  })
})
