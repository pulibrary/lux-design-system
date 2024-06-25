import { mount } from "@vue/test-utils"
import LuxLibraryHeader from "@/components/LuxLibraryHeader.vue"

describe("LuxLibraryHeader.vue", () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(LuxLibraryHeader, {
      attachTo: document.body,
      props: {
        type: "abbr",
        appName: "My Application",
        abbrName: "My App",
        appUrl: "http://example.com/",
        maxWidth: 1111,
        theme: "light",
      },
    })
  })
  it("accepts a type prop", () => {
    expect(wrapper.find("abbr").text()).toBe(
      "Princeton University Library LogoPrinceton University Library IconMy ApplicationMy App"
    )
  })
  it("gets the theme and defaults to dark unless the theme is light", () => {
    expect(wrapper.vm.value(wrapper.vm.theme)).toEqual("light")
    expect(wrapper.vm.value("light")).toEqual("light")
    expect(wrapper.vm.value("dark")).toEqual("dark")
    expect(wrapper.vm.value("shade")).toEqual("dark")
  })
  it("has a long and short name", () => {
    let full_name = wrapper.find(".full-name")
    expect(full_name.text()).toEqual("My Application")
    // expect(full_name.isVisible()).toBe(false)
    let short_name = wrapper.find(".abbr-name")
    expect(short_name.text()).toEqual("My App")
    // expect(short_name.isVisible()).toBe(true)
  })
  it("links to the appUrl", () => {
    let appLink = wrapper.find(".lux-app-name")
    expect(appLink.attributes("href")).toBe("http://example.com/")
    expect(appLink.text()).toBe("My ApplicationMy App")
  })
  it("has a max width", () => {
    expect(wrapper.vm.maxWidth).toBe(1111)
  })
})
