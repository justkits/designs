import { render } from "@testing-library/react";

import { Sidebar } from "@/components/Sidebar";

describe("Sidebar - structure", () => {
  describe("Sidebar.Content", () => {
    it("must be used inside the Sidebar wrapper", () => {
      expect(() => render(<Sidebar.Content>콘텐츠</Sidebar.Content>)).toThrow(
        "Sidebar.Content must be used inside the Sidebar wrapper.",
      );
    });

    it("should render as <aside> when scope is 'app'", () => {
      const { getByTestId } = render(
        <Sidebar scope="app">
          <Sidebar.Content data-testid="sidebar-content">
            콘텐츠
          </Sidebar.Content>
        </Sidebar>,
      );

      expect(getByTestId("sidebar-content").tagName).toBe("ASIDE");
    });

    it("should render as <div> when scope is not 'app'", () => {
      const { getByTestId } = render(
        <Sidebar scope="page">
          <Sidebar.Content data-testid="sidebar-content">
            콘텐츠
          </Sidebar.Content>
        </Sidebar>,
      );

      expect(getByTestId("sidebar-content").tagName).toBe("DIV");
    });
  });

  describe("Sidebar.Toggle", () => {
    it("must be used inside the Sidebar wrapper", () => {
      expect(() => render(<Sidebar.Toggle>토글</Sidebar.Toggle>)).toThrow(
        "Sidebar.Toggle must be used inside the Sidebar wrapper.",
      );
    });

    it("should support `asChild` property", () => {
      const { container } = render(
        <Sidebar>
          <Sidebar.Toggle asChild>
            <button>토글</button>
          </Sidebar.Toggle>
        </Sidebar>,
      );

      expect(container.querySelectorAll("button")).toHaveLength(1);
    });
  });
});
