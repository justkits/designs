// @vitest-environment node
import { renderToString } from "react-dom/server";

import { TestComponent } from "./_setup";

describe("alert - SSR", () => {
  it("should not render anything in non-browser environment", () => {
    const output = renderToString(<TestComponent />);
    expect(output).toBe("");
  });
});
