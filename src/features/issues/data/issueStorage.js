const storageKey = "andes-pay-issues";

// Read persisted tickets without allowing invalid browser data to break the application.
export function loadIssues(fallbackIssues) {
  try {
    const savedIssues = window.localStorage.getItem(storageKey);

    if (!savedIssues) {
      return fallbackIssues;
    }

    const parsedIssues = JSON.parse(savedIssues);

    // Add fields introduced by newer versions without discarding existing local tickets.
    return Array.isArray(parsedIssues)
      ? parsedIssues.map((issue) => ({ blockReason: "", ...issue }))
      : fallbackIssues;
  } catch {
    // Fall back to seed data if storage is unavailable or contains invalid JSON.
    return fallbackIssues;
  }
}

// Persist the complete ticket collection after every valid change.
export function saveIssues(issues) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(issues));
  } catch {
    // The UI remains usable when browser storage is unavailable.
  }
}
