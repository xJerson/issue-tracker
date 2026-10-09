const storageKey = "andes-pay-issues";

// Read persisted tickets without allowing invalid browser data to break the application.
export function loadIssues(fallbackIssues) {
  try {
    const savedIssues = window.localStorage.getItem(storageKey);

    if (!savedIssues) {
      return fallbackIssues;
    }

    const parsedIssues = JSON.parse(savedIssues);
    return Array.isArray(parsedIssues) ? parsedIssues : fallbackIssues;
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
