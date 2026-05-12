import { render } from "@testing-library/react";

import { DocsPage } from "@/pages/docs";

describe("DocsPage", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<DocsPage />);

    expect(getByText("Posts Page")).toBeTruthy();
  });
});
