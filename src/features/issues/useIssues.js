import { useEffect, useState } from "react";
import { issues as initialIssues } from "./data/issues";
import { loadIssues, saveIssues } from "./data/issueStorage";

// This hook owns ticket persistence while App keeps responsibility for user interactions.
export default function useIssues() {
  // Read localStorage once, when React creates this state for the first time.
  const [issues, setIssues] = useState(() => loadIssues(initialIssues));

  useEffect(() => {
    // localStorage is an external browser system, so synchronization belongs in an Effect.
    saveIssues(issues);
  }, [issues]);

  return [issues, setIssues];
}
