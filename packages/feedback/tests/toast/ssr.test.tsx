// @vitest-environment node
import { renderToString } from "react-dom/server";

import { TestComponent } from "./_setup";

describe("toast - SSR", () => {
  it("should not render anything in non-browser environment", () => {
    const output = renderToString(<TestComponent />);
    expect(output).toBe("");
  });
});
