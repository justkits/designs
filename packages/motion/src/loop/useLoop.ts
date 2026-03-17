import { useCallback, useState } from "react";

export function useLoop() {
  const [isLooping, setIsLooping] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    setIsLooping(true);
  }, []);

  const stopAnimation = useCallback(() => {
    setIsLooping(false);
  }, []);

  return { isLooping, startAnimation, stopAnimation };
}
