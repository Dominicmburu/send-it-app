import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Event listeners go here
    },
    baseUrl: "http://localhost:5173/",
  },
});
