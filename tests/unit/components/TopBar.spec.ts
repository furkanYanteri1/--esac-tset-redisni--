import { shallowMount } from "@vue/test-utils";
import TopBar from "@/src/components/TopBar.vue";

describe("TopBar.vue", () => {
  it("emits generateProgram event when button is clicked", async () => {
    const wrapper = shallowMount(TopBar);

    // Simulate button click
    await wrapper.find("button").trigger("click");

    // Check if event is emitted
    expect(wrapper.emitted("generateProgram")).toBeTruthy();
  });

  it("toggles start/pause button text correctly", async () => {
    const wrapper = shallowMount(TopBar);

    // Initial state check
    expect(wrapper.text()).toContain("Start");

    // Simulate button click
    await wrapper.find("button").trigger("click");

    // After click check
    expect(wrapper.text()).toContain("Pause");
  });

  // Add more test cases for other components as needed
});
