import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IssueFilters from "./IssueFilters";
import IssueList from "./IssueList";
import WorkflowMenu from "./WorkflowMenu";

// The queue route groups phase navigation, filters, and paginated ticket work in one screen.
export default function TicketQueue({ assignees, filters, issues, onClearFilters, onFilterChange, onSelectIssue, onSelectPhase, selectedPhase, visibleIssues }) {
  return (
    <Container disableGutters maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 5, lg: 8 }, py: { xs: 4, md: 6 } }}>
      <Box sx={{ alignItems: "start", display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "260px minmax(0, 1fr)" } }}>
        <Paper component="aside" elevation={0} sx={{ border: "1px solid #C9D8E0", borderTop: "4px solid #007C78", boxShadow: "0 12px 32px rgba(23, 53, 74, 0.06)", p: 2.5, position: { md: "sticky" }, top: { md: 24 } }}>
          <WorkflowMenu issues={issues} onSelectPhase={onSelectPhase} selectedPhase={selectedPhase} />
        </Paper>
        <Box>
          <Typography component="h1" fontWeight={700} variant="h4">
            Ticket queue
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2, mt: 0.5 }}>
            Work through the selected phase of the incident lifecycle.
          </Typography>
          <IssueFilters assignees={assignees} filters={filters} onChange={onFilterChange} onClear={onClearFilters} />
          <Box sx={{ mt: 2 }}>
            {/* Reset pagination when an operator changes filters or workflow phase. */}
            <IssueList issues={visibleIssues} key={`${selectedPhase}-${JSON.stringify(filters)}`} onSelectIssue={onSelectIssue} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
