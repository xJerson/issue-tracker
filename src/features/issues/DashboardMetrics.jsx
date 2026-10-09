import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { statusLabels, workflowPhases } from "./workflow";

// This panel derives operational signals from tickets instead of storing duplicate dashboard state.
export default function DashboardMetrics({ issues }) {
  const totalIssues = issues.length || 1;
  const closedIssues = issues.filter((issue) => issue.status === "closed").length;
  const activeIssues = issues.filter((issue) => !["closed", "released"].includes(issue.status)).length;
  const blockedIssues = issues.filter((issue) => issue.isBlocked).length;
  const metrics = [
    { label: "Active work", value: activeIssues, helper: "Tickets still moving through the workflow" },
    { label: "Resolution rate", value: `${Math.round((closedIssues / totalIssues) * 100)}%`, helper: "Tickets formally closed" },
    { label: "Blocked rate", value: `${Math.round((blockedIssues / totalIssues) * 100)}%`, helper: "Tickets needing an external action" },
  ];

  return (
    <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.6fr) minmax(280px, 1fr)" } }}>
      <Paper elevation={0} sx={{ border: 1, borderColor: "rgba(148, 163, 184, 0.24)", p: 2.5 }}>
        <Typography fontWeight={700} variant="subtitle1">
          Workflow distribution
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }} variant="body2">
          See where the current workload is accumulating.
        </Typography>
        <Stack spacing={1.5} sx={{ mt: 2 }}>
          {workflowPhases.map((phase) => {
            const count = issues.filter((issue) => issue.status === phase).length;
            const percentage = (count / totalIssues) * 100;

            return (
              <Box key={phase}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                  <Typography variant="body2">{statusLabels[phase]}</Typography>
                  <Typography color="text.secondary" variant="body2">{count}</Typography>
                </Stack>
                <LinearProgress aria-label={`${statusLabels[phase]}: ${count} tickets`} value={percentage} variant="determinate" />
              </Box>
            );
          })}
        </Stack>
      </Paper>

      <Stack spacing={2}>
        {metrics.map((metric) => (
          <Paper elevation={0} key={metric.label} sx={{ border: 1, borderColor: "rgba(148, 163, 184, 0.24)", p: 2 }}>
            <Typography color="text.secondary" fontWeight={600} variant="body2">
              {metric.label}
            </Typography>
            <Typography fontWeight={800} sx={{ mt: 0.25 }} variant="h5">
              {metric.value}
            </Typography>
            <Typography color="text.secondary" variant="caption">
              {metric.helper}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
