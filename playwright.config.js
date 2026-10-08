import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";

const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:5180",
    headless: true,
    launchOptions: { executablePath, args: ["--disable-dev-shm-usage"] },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run preview -- --port 5180 --strictPort",
    url: "http://127.0.0.1:5180",
    reuseExistingServer: false,
  },
});
