import { useState } from "react";

import { TextInput } from "@/TextInput";

export function TestComponent() {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  return (
    <div>
      <TextInput>
        <TextInput.Label>Label</TextInput.Label>
        <TextInput.Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {error && <TextInput.ErrorMessage>{error}</TextInput.ErrorMessage>}
      </TextInput>
      <button onClick={() => setError("This is an error message")}>
        Set Error
      </button>
      <button onClick={() => setError("")}>Clear Error</button>
    </div>
  );
}
