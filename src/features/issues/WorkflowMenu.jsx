import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { statusLabels, workflowPhases } from "./workflow";

// Add an aggregate option before the ordered workflow phases.
const menuPhases = ["all", ...workflowPhases];

// This menu is the user's operational entry point for the ticket workflow.
export default function WorkflowMenu({ issues, selectedPhase, onSelectPhase }) {
  function getIssueCount(phaseId) {
    // The "all" option represents every ticket, not a ticket status.
    return phaseId === "all"
      ? issues.length
      : issues.filter((issue) => issue.status === phaseId).length;
  }

  return (
    <>
      <ChecklistRoundedIcon color="primary" />
      <Typography fontWeight={700} sx={{ mt: 1 }} variant="subtitle1">
        Workflow phases
      </Typography>
      <Typography color="text.secondary" variant="body2">
        Select a phase to operate its tickets.
      </Typography>
      <List disablePadding sx={{ mt: 2 }}>
        {menuPhases.map((phaseId) => (
          <ListItemButton
            key={phaseId}
            onClick={() => onSelectPhase(phaseId)}
            selected={selectedPhase === phaseId}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemText primary={phaseId === "all" ? "All issues" : statusLabels[phaseId]} />
            <Typography color="text.secondary" variant="body2">
              {getIssueCount(phaseId)}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
