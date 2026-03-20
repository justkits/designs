import { Tooltip } from "@justkits/headless-ui";

export function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "120vw",
        height: "120vh",
      }}
    >
      <h1>Tester App</h1>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tooltip position="right">
          <Tooltip.Trigger
            style={{
              backgroundColor: "blue",
              padding: "8px 16px",
              color: "white",
            }}
          >
            트리거
          </Tooltip.Trigger>
          <Tooltip.Content
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "2px 8px",
              width: "max-content",
            }}
          >
            <p>툴팁 메시지</p>
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip>
      </div>
    </div>
  );
}
