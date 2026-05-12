import * as jiti from "jiti";

import { type Config } from "@/config/manager";

export function prepareConfig(config: Config) {
  vi.spyOn(jiti.createJiti(""), "import").mockResolvedValue(config);

  afterEach(() => {
    vi.restoreAllMocks();
  });
}

export function setup() {
  beforeEach(() => {
    vi.clearAllMocks();
  });
}
