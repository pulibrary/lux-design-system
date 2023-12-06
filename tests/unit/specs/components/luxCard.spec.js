import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import LuxCard from "@/components/LuxCard.vue";

describe("LuxCard.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(LuxCard, {
      props: {
        id: "MyCard",
      },
    });
  });

  it("should have the appropriate class when selected", async () => {
    wrapper.setProps({ selected: true });
    await nextTick();
    const card = wrapper.find(".lux-card");
    //expect(card.classes()).toContain(".lux-card-selected")).toBe(true)
    expect(card.classes("lux-card-selected")).toBe(true);
  });

  it("should have the appropriate class when editied", async () => {
    wrapper.setProps({ edited: true });
    await nextTick();
    const card = wrapper.find(".lux-card");
    expect(card.classes("lux-card-edited")).toBe(true);
  });

  it("should have the appropriate class when disabled", async () => {
    wrapper.setProps({ disabled: true });
    await nextTick();
    const card = wrapper.find(".lux-card");
    expect(card.classes("lux-card-disabled")).toBe(true);
  });

  it("should have the appropriate class when sized", async () => {
    wrapper.setProps({ size: "full-width" });
    await nextTick();
    const card = wrapper.find(".lux-card");
    expect(card.classes("full-width")).toBe(true);
  });

  it("should emit a card-click event when select() is called", () => {
    wrapper.vm.select();
    const emitted = wrapper.emitted();
    expect(Object.prototype.hasOwnProperty.call(emitted, "card-click")).toBe(
      true
    );
  });

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
