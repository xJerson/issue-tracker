import { afterEach, describe, expect, it } from "vitest";
import { loadIssues, saveIssues } from "./issueStorage";

const storageKey = "andes-pay-issues";

describe("issue storage", () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("adds new ticket fields to legacy saved tickets", () => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify([{ id: "INC-1", priority: "high", reportedAt: "2026-10-01", reporter: "Support" }]),
    );

    const [issue] = loadIssues([]);

    expect(issue.qaStatus).toBe("pending");
    expect(issue.resolutionSummary).toBe("");
    expect(issue.activity).toHaveLength(1);
  });

  it("persists the current ticket collection", () => {
    const issues = [{ id: "INC-2", status: "reported" }];

    saveIssues(issues);

    expect(JSON.parse(window.localStorage.getItem(storageKey))).toEqual(issues);
  });
});
