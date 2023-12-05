import { mount } from "@vue/test-utils";
import Heading from "@/components/LuxHeading.vue";
import { nextTick } from "vue";

describe("LuxHeading.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Heading, {
      slots: {
        default: "Here's a heading.",
      },
    });
  });

  it("should render the appropriate level heading", async () => {
    const heading1 = wrapper.find("h1");
    expect(heading1.exists()).toBe(true);
    wrapper.setProps({ level: "h3" });
    await nextTick();
    const heading3 = wrapper.find("h3");
    expect(heading3.exists()).toBe(true);
    expect(heading3.text()).toBe("Here's a heading.");
  });

  it("should render the appropriate class name", async () => {
    wrapper.setProps({ level: "h3", size: "h2" });
    await nextTick();
    const heading3 = wrapper.find("h3");
    expect(heading3.exists()).toBe(true);
    expect(heading3.classes()).toContain("h2");
  });

  it("should display the slotted text", async () => {
    wrapper.setProps({ level: "h2" });
    await nextTick();
    const heading2 = wrapper.find("h2");
    expect(heading2.exists()).toBe(true);
    expect(heading2.text()).toBe("Here's a heading.");
  });

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
