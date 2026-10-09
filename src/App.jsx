import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import FiberNewRoundedIcon from "@mui/icons-material/FiberNewRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, Navigate, Route, Routes } from "react-router-dom";
import CreateIssueDialog from "./features/issues/CreateIssueDialog";
import IssueDetailDrawer from "./features/issues/IssueDetailDrawer";
import DashboardOverview from "./features/dashboard/DashboardOverview";
import TicketQueue from "./features/issues/TicketQueue";
import useIssues from "./features/issues/useIssues";
import { getNextStatus, statusLabels } from "./features/issues/workflow";

// Keep a single resettable shape for every filter used by the ticket queue.
const initialFilters = {
  assignee: "all",
  blocked: "all",
  priority: "all",
  query: "",
  sort: "newest",
};

const currentOperator = "Jerson";

function createActivity(message) {
  return {
    author: currentOperator,
    createdAt: new Date().toLocaleString("en-US"),
    id: `${Date.now()}-${Math.random()}`,
    message,
  };
}

// App composes the first Issue Tracker screen from feature-level components.
export default function App() {
  // Keep the date stable for this page visit instead of recreating it on every render.
  const [currentDate] = useState(() => new Date());
  // This custom Hook loads saved tickets and keeps later changes persisted.
  const [issues, setIssues] = useIssues();
  // This phase is shared by the workflow menu and the ticket list.
  const [selectedPhase, setSelectedPhase] = useState("all");
  // The selected ticket controls whether the detail drawer is open.
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  // This state controls whether the report-issue dialog is visible.
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  // Filter state is shared by the filter controls and the visible ticket queue.
  const [filters, setFilters] = useState(initialFilters);

  // Apply every active filter in one predicate so filters can work together.
  const visibleIssues = issues.filter((issue) => {
    const searchableText = `${issue.id} ${issue.title} ${issue.description ?? ""}`.toLowerCase();
    const matchesPhase = selectedPhase === "all" || issue.status === selectedPhase;
    const matchesQuery = searchableText.includes(filters.query.trim().toLowerCase());
    const matchesPriority = filters.priority === "all" || issue.priority === filters.priority;
    const matchesAssignee = filters.assignee === "all" || issue.assignee === filters.assignee;
    const matchesBlocked =
      filters.blocked === "all" ||
      (filters.blocked === "blocked" && issue.isBlocked) ||
      (filters.blocked === "unblocked" && !issue.isBlocked);

    return matchesPhase && matchesQuery && matchesPriority && matchesAssignee && matchesBlocked;
  }).sort((firstIssue, secondIssue) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };

    if (filters.sort === "priority") {
      return priorityOrder[firstIssue.priority] - priorityOrder[secondIssue.priority];
    }

    return filters.sort === "oldest"
      ? firstIssue.reportedAt.localeCompare(secondIssue.reportedAt)
      : secondIssue.reportedAt.localeCompare(firstIssue.reportedAt);
  });

  // Derive dropdown options from the actual people assigned to tickets.
  const assignees = [...new Set(issues.map((issue) => issue.assignee))].sort();

  const selectedIssue = issues.find((issue) => issue.id === selectedIssueId) ?? null;

  function advanceIssue(issueId) {
    setIssues((currentIssues) =>
      currentIssues.map((issue) => {
        if (issue.id !== issueId || issue.isBlocked) {
          return issue;
        }

        const nextStatus = getNextStatus(issue.status);

        if (!nextStatus) {
          return issue;
        }

        // Move only one step forward, never directly to an arbitrary phase.
        return {
          ...issue,
          activity: [
            ...(issue.activity ?? []),
            createActivity(`Moved the ticket from ${statusLabels[issue.status]} to ${statusLabels[nextStatus]}.`),
          ],
          qaStatus: nextStatus === "qa-validation" ? "pending" : issue.qaStatus,
          status: nextStatus,
        };
      }),
    );
  }

  function updateIssue(issueId, updates) {
    // Triage changes update only the selected ticket and remain persisted by useIssues.
    setIssues((currentIssues) =>
      currentIssues.map((issue) => (issue.id === issueId ? { ...issue, ...updates } : issue)),
    );
  }

  function addComment(issueId, comment) {
    // Keep comments in the same chronological activity stream as workflow changes.
    setIssues((currentIssues) =>
      currentIssues.map((issue) =>
        issue.id === issueId
          ? {
              ...issue,
              activity: [...(issue.activity ?? []), createActivity(`Commented: ${comment}`)],
            }
          : issue,
      ),
    );
  }

  function completeQa(issueId, result, notes) {
    setIssues((currentIssues) =>
      currentIssues.map((issue) => {
        if (issue.id !== issueId || issue.status !== "qa-validation") {
          return issue;
        }

        const nextStatus = result === "passed" ? "ready-to-release" : "in-progress";
        const resultLabel = result === "passed" ? "passed" : "failed";

        return {
          ...issue,
          activity: [
            ...(issue.activity ?? []),
            createActivity(`QA ${resultLabel}: ${notes}`),
            createActivity(`Moved the ticket from QA validation to ${statusLabels[nextStatus]}.`),
          ],
          qaNotes: notes,
          qaStatus: result,
          status: nextStatus,
        };
      }),
    );
  }

  function closeIssue(issueId, resolutionSummary) {
    setIssues((currentIssues) =>
      currentIssues.map((issue) =>
        issue.id === issueId && issue.status === "released"
          ? {
              ...issue,
              activity: [
                ...(issue.activity ?? []),
                createActivity(`Closed the ticket. Resolution: ${resolutionSummary}`),
              ],
              closedAt: new Date().toISOString(),
              resolutionSummary,
              status: "closed",
            }
          : issue,
      ),
    );
  }

  function reopenIssue(issueId, reason) {
    setIssues((currentIssues) =>
      currentIssues.map((issue) =>
        issue.id === issueId && issue.status === "closed"
          ? {
              ...issue,
              activity: [
                ...(issue.activity ?? []),
                createActivity(`Reopened the ticket for triage. Reason: ${reason}`),
              ],
              closedAt: null,
              status: "triaged",
            }
          : issue,
      ),
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
          activity: [createActivity(`Reported a new ${draft.type} ticket.`)],
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

  function updateFilters(event) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [event.target.name]: event.target.value,
    }));
  }

  // Derive summary values from the source data instead of duplicating state.
  const issueSummary = [
    {
      label: "Total tickets",
      value: issues.length,
      helper: "Across all workflow phases",
      icon: ArticleRoundedIcon,
      color: "#4F46E5",
      tint: "rgba(79, 70, 229, 0.12)",
    },
    {
      label: "New reports",
      value: issues.filter((issue) => issue.status === "reported").length,
      helper: "Awaiting triage",
      icon: FiberNewRoundedIcon,
      color: "#0284C7",
      tint: "rgba(2, 132, 199, 0.12)",
    },
    {
      label: "Blocked",
      value: issues.filter((issue) => issue.isBlocked).length,
      helper: "Need an external action",
      icon: BlockRoundedIcon,
      color: "#DC2626",
      tint: "rgba(220, 38, 38, 0.12)",
    },
    {
      label: "High priority",
      value: issues.filter((issue) => issue.priority === "high").length,
      helper: "Require rapid attention",
      icon: BugReportRoundedIcon,
      color: "#D97706",
      tint: "rgba(217, 119, 6, 0.12)",
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
    <Box
      component="main"
      sx={{
        background: "linear-gradient(180deg, #EEF2FF 0, #F4F6FB 360px)",
        minHeight: "100vh",
      }}
    >
      <AppBar
        color="inherit"
        elevation={0}
        position="static"
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.82)" }}
      >
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
          <Button component={RouterLink} to="/" color="inherit">
            Overview
          </Button>
          <Button component={RouterLink} to="/tickets" color="inherit" sx={{ mr: 1 }}>
            Tickets
          </Button>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            startIcon={<AddRoundedIcon />}
            variant="contained"
          >
            New issue
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route element={<DashboardOverview issueSummary={issueSummary} issues={issues} today={today} />} path="/" />
        <Route
          element={
            <TicketQueue
              assignees={assignees}
              filters={filters}
              issues={issues}
              onClearFilters={() => setFilters(initialFilters)}
              onFilterChange={updateFilters}
              onSelectIssue={setSelectedIssueId}
              onSelectPhase={setSelectedPhase}
              selectedPhase={selectedPhase}
              visibleIssues={visibleIssues}
            />
          }
          path="/tickets"
        />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
      <IssueDetailDrawer
        onCloseIssue={closeIssue}
        onCompleteQa={completeQa}
        issue={selectedIssue}
        onAdvance={advanceIssue}
        onAddComment={addComment}
        onClose={() => setSelectedIssueId(null)}
        onReopenIssue={reopenIssue}
        onUpdate={updateIssue}
      />
      <CreateIssueDialog
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={createIssue}
        open={isCreateDialogOpen}
      />
    </Box>
  );
}
