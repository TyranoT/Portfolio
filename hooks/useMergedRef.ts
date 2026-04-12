import { useCallback } from "react";
import type { MutableRefObject, RefCallback } from "react";

export function useMergedRef<T>(
  ...refs: (MutableRefObject<T | null> | RefCallback<T | null>)[]
): RefCallback<T | null> {
  return useCallback(
    (node: T | null) => {
      for (const ref of refs) {
        if (typeof ref === "function") {
          ref(node);
        } else {
          ref.current = node;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}
