import { describe, expect, it } from "vitest";
import { getNextStatus, workflowPhases } from "./workflow";

describe("issue workflow", () => {
  it("moves through exactly one phase at a time", () => {
    expect(getNextStatus("reported")).toBe("triaged");
    expect(getNextStatus("qa-validation")).toBe("ready-to-release");
  });

  it("does not move a closed ticket further", () => {
    expect(getNextStatus("closed")).toBeNull();
  });

  it("defines a workflow that ends in closure", () => {
    expect(workflowPhases.at(-1)).toBe("closed");
  });
});
