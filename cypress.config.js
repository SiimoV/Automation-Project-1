const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 15000,
  viewportWidth: 600, // Set your desired width
  viewportHeight: 800, // Set your desired height
  env: {
    firstCookieValue: "firstValue",
  },

  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
