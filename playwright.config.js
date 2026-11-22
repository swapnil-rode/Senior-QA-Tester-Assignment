const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './Automation/tests',

  fullyParallel: true,

  reporter: 'list',

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium'
      }
    }
  ]
});
