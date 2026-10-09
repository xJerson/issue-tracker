import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CreateIssueDialog from "./features/issues/CreateIssueDialog";
import IssueDetailDrawer from "./features/issues/IssueDetailDrawer";
import IssueList from "./features/issues/IssueList";
import { issues as initialIssues } from "./features/issues/data/issues";
import { getNextStatus } from "./features/issues/workflow";
import WorkflowMenu from "./features/issues/WorkflowMenu";

// App composes the first Issue Tracker screen from feature-level components.
export default function App() {
  // Keep the date stable for this page visit instead of recreating it on every render.
  const [currentDate] = useState(() => new Date());
  // Ticket data becomes state because operators can now update its workflow phase.
  const [issues, setIssues] = useState(initialIssues);
  // This phase is shared by the workflow menu and the ticket list.
  const [selectedPhase, setSelectedPhase] = useState("all");
  // The selected ticket controls whether the detail drawer is open.
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  // This state controls whether the report-issue dialog is visible.
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Filter tickets from the selected operational phase.
  const visibleIssues =
    selectedPhase === "all"
      ? issues
      : issues.filter((issue) => issue.status === selectedPhase);

  const selectedIssue = issues.find((issue) => issue.id === selectedIssueId) ?? null;

  function advanceIssue(issueId) {
    setIssues((currentIssues) =>
      currentIssues.map((issue) => {
        if (issue.id !== issueId || issue.isBlocked) {
          return issue;
        }

        // Move only one step forward, never directly to an arbitrary phase.
        return { ...issue, status: getNextStatus(issue.status) ?? issue.status };
      }),
    );
  }

  function createIssue(draft) {
    setIssues((currentIssues) => {
      // Derive the next readable identifier from existing ticket identifiers.
      const highestIssueNumber = currentIssues.reduce(
        (highest, issue) => Math.max(highest, Number(issue.id.replace("INC-", ""))),
        0,
      );

      return [
        {
          ...draft,
          id: `INC-${highestIssueNumber + 1}`,
          isBlocked: false,
          reportedAt: new Date().toISOString().slice(0, 10),
          status: "reported",
        },
        ...currentIssues,
      ];
    });

    // Show the reported queue so the operator sees the newly created ticket.
    setSelectedPhase("reported");
    setIsCreateDialogOpen(false);
  }

  // Derive summary values from the source data instead of duplicating state.
  const issueSummary = [
    { label: "Total issues", value: issues.length },
    { label: "Reported", value: issues.filter((issue) => issue.status === "reported").length },
    { label: "Blocked", value: issues.filter((issue) => issue.isBlocked).length },
    {
      label: "High priority",
      value: issues.filter((issue) => issue.priority === "high").length,
    },
  ];

  // Format the captured date so the header stays contextual.
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(currentDate);

  // Pass data down as a prop. The list should not know where the data comes from.
  return (
    <Box component="main" sx={{ minHeight: "100vh" }}>
      <AppBar color="inherit" elevation={0} position="static">
        <Toolbar
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            px: { xs: 2, md: 5, lg: 8 },
          }}
        >
          <BugReportRoundedIcon color="primary" sx={{ mr: 1 }} />
          <Typography color="text.primary" fontWeight={700} variant="h6">
            Issue Tracker
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            startIcon={<AddRoundedIcon />}
            variant="contained"
          >
            New issue
          </Button>
        </Toolbar>
      </AppBar>

      {/* A full-width container prevents the operational panel from feeling compressed. */}
      <Container
        disableGutters
        maxWidth={false}
        sx={{ px: { xs: 2, sm: 3, md: 5, lg: 8 }, py: { xs: 4, md: 6 } }}
      >
        <Stack spacing={4}>
          <Box>
            <Typography color="primary" fontWeight={700} variant="overline">
              Product workspace
            </Typography>
            <Typography component="h1" sx={{ mt: 1 }} variant="h3">
              Keep product issues visible and actionable.
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {today}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              Review the current work, identify blockers, and keep the team aligned.
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {issueSummary.map((item) => (
              // A stable label identifies each summary card.
              <Paper
                elevation={0}
                key={item.label}
                sx={{ border: 1, borderColor: "divider", flex: 1, p: 2.5 }}
              >
                <Typography color="text.secondary" variant="body2">
                  {item.label}
                </Typography>
                <Typography color="text.primary" fontWeight={700} variant="h4">
                  {item.value}
                </Typography>
              </Paper>
            ))}
          </Stack>

          <Box
            sx={{
              alignItems: "start",
              display: "grid",
              gap: 3,
              gridTemplateColumns: { xs: "1fr", md: "260px minmax(0, 1fr)" },
            }}
          >
            <Paper
              component="aside"
              elevation={0}
              sx={{
                border: 1,
                borderColor: "divider",
                p: 2,
                position: { md: "sticky" },
                top: { md: 24 },
              }}
            >
              <WorkflowMenu
                issues={issues}
                onSelectPhase={setSelectedPhase}
                selectedPhase={selectedPhase}
              />
            </Paper>
            <Box>
              <Typography component="h2" fontWeight={700} variant="h5">
                Ticket queue
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
                Work through the selected phase of the incident lifecycle.
              </Typography>
              {/* The key resets pagination when an operator switches workflow phases. */}
              <IssueList
                issues={visibleIssues}
                key={selectedPhase}
                onSelectIssue={setSelectedIssueId}
              />
            </Box>
          </Box>
        </Stack>
      </Container>
      <IssueDetailDrawer
        issue={selectedIssue}
        onAdvance={advanceIssue}
        onClose={() => setSelectedIssueId(null)}
      />
      <CreateIssueDialog
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={createIssue}
        open={isCreateDialogOpen}
      />
    </Box>
  );
}
