// These values standardize how AndesPay classifies incoming work.
export const issueTypes = [
  { value: "bug", label: "Bug" },
  { value: "incident", label: "Incident" },
  { value: "service-request", label: "Service request" },
  { value: "improvement", label: "Improvement" },
];

export const issueCategories = [
  { value: "authentication", label: "Authentication" },
  { value: "payments", label: "Payments" },
  { value: "profile", label: "Profile" },
  { value: "notifications", label: "Notifications" },
  { value: "reports", label: "Reports" },
  { value: "mobile", label: "Mobile" },
  { value: "infrastructure", label: "Infrastructure" },
];

// Severity measures business impact, while priority determines work order.
export const severityLevels = [
  { value: "p1", label: "P1 · Critical" },
  { value: "p2", label: "P2 · Major" },
  { value: "p3", label: "P3 · Moderate" },
  { value: "p4", label: "P4 · Minor" },
];

export function getCatalogLabel(items, value) {
  return items.find((item) => item.value === value)?.label ?? value;
}
