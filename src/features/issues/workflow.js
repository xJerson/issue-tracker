// This order defines the only valid path for an AndesPay ticket.
export const workflowPhases = [
  "reported",
  "triaged",
  "in-progress",
  "in-review",
  "qa-validation",
  "ready-to-release",
  "released",
  "closed",
];

// Labels are kept separate from the stored status values.
export const statusLabels = {
  reported: "Reported",
  triaged: "Triaged",
  "in-progress": "In progress",
  "in-review": "In review",
  "qa-validation": "QA validation",
  "ready-to-release": "Ready to release",
  released: "Released",
  closed: "Closed",
};

// These semantic colors describe progress without changing the data model.
export const statusColors = {
  reported: "info",
  triaged: "warning",
  "in-progress": "primary",
  "in-review": "secondary",
  "qa-validation": "info",
  "ready-to-release": "secondary",
  released: "success",
  closed: "default",
};

// Return the immediately following phase, or null when the ticket is complete.
export function getNextStatus(status) {
  const currentIndex = workflowPhases.indexOf(status);
  return workflowPhases[currentIndex + 1] ?? null;
}
