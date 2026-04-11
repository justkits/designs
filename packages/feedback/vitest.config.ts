import { defineProject, mergeConfig } from "vitest/config";

import { sharedConfig } from "@justkits/vitest-config/shared";

const config = defineProject({
  test: {
    environment: "jsdom",
  },
});

export default mergeConfig(sharedConfig, config);
