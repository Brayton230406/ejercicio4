const { defineConfig, devices } = require("@playwright/test");
module.exports = defineConfig({
  testDir: "./tests",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:42871",
    trace: process.env.CI ? "retain-on-failure" : "off",
  },
  webServer: {
    command: "node tools/server.cjs",
    url: "http://127.0.0.1:42871",
    reuseExistingServer: false,
    env: { SERVE_DIST: "1" },
  },
  projects: [
    { name: "android", use: { ...devices["Pixel 7"] } },
    { name: "iphone", use: { ...devices["iPhone 13"] } },
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
  ],
});
