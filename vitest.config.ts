import { fileURLToPath } from "node:url";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

// The specs import the public API as 'number-to-words', and each project points that at a different build
function target(path: string) {
  return {
    alias: [
      {
        find: /^number-to-words$/,
        replacement: fileURLToPath(new URL(path, import.meta.url))
      }
    ]
  };
}

const include = ["src/**/*.test.ts"];

// A function, because Vitest names each instance after its project, so projects can't share them
function browsers() {
  return {
    enabled: true,
    headless: true,
    provider: playwright(),
    instances: [
      { browser: "chromium" as const },
      { browser: "firefox" as const },
      { browser: "webkit" as const }
    ]
  };
}

export default defineConfig({
  test: {
    projects: [
      {
        resolve: target("./src/index.ts"),
        test: { name: "src", include }
      },
      {
        resolve: target("./dist/index.js"),
        test: { name: "esm", include }
      },
      {
        resolve: target("./test/targets/cjs.ts"),
        test: { name: "cjs", include }
      },
      {
        resolve: target("./test/targets/iife.ts"),
        test: { name: "iife", include, browser: browsers() }
      },
      {
        resolve: target("./test/targets/iife-min.ts"),
        test: { name: "iife-min", include, browser: browsers() }
      }
    ]
  }
});
