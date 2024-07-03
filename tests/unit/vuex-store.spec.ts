import { createStore } from "vuex";
import storeConfig from "@/store";

describe("Vuex Store", () => {
  it("generates programs correctly", () => {
    const store = createStore(storeConfig);

    // Dispatch the mutation
    store.commit("generatePrograms");

    // Check if programs are generated
    expect(store.state.programs).toHaveLength(6); // Assuming you generate 6 programs
    expect(store.state.results).toHaveLength(6); // Results should also be initialized

    // Add more specific checks based on your mutation logic
  });

  it("updates results correctly", () => {
    const store = createStore(storeConfig);
    const mockResults = [
      { name: "Horse A" },
      { name: "Horse B" },
      // Add more mock results as needed
    ];

    // Dispatch the mutation with mock data
    store.commit("updateResults", { index: 0, results: mockResults });

    // Check if results are updated correctly
    expect(store.state.results[0]).toEqual(mockResults);

    // Add more specific checks based on your mutation logic
  });

  // Add more test cases for other mutations as needed
});
