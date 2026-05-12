import { defineProject, mergeConfig } from "vitest/config";

import { sharedReactConfig } from "@justkits/vitest-config/shared";

const config = defineProject({
  test: {
    root: __dirname,
    environment: "jsdom",
  },
});

export default mergeConfig(sharedReactConfig, config);
