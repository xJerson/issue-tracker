import { useState } from "react";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  getCatalogLabel,
  issueCategories,
  issueTypes,
  severityLevels,
} from "./data/issueCatalog";
import { teamMembers } from "./data/teamMembers";
import TicketActivity from "./TicketActivity";
import { getNextStatus, statusLabels } from "./workflow";

// The drawer focuses one ticket so operators can make a deliberate workflow decision.
export default function IssueDetailDrawer({
  issue,
  onAddComment,
  onAdvance,
  onClose,
  onCloseIssue,
  onCompleteQa,
  onReopenIssue,
  onUpdate,
}) {
  const nextStatus = issue ? getNextStatus(issue.status) : null;
  // Keep each unfinished action form scoped to its ticket while the drawer remains open.
  const [qaNotesByIssue, setQaNotesByIssue] = useState({});
  const [reopenReasonsByIssue, setReopenReasonsByIssue] = useState({});
  const [resolutionSummariesByIssue, setResolutionSummariesByIssue] = useState({});
  const qaNotes = issue ? qaNotesByIssue[issue.id] ?? "" : "";
  const reopenReason = issue ? reopenReasonsByIssue[issue.id] ?? "" : "";
  const resolutionSummary = issue ? resolutionSummariesByIssue[issue.id] ?? "" : "";

  return (
    <Drawer anchor="right" onClose={onClose} open={Boolean(issue)}>
      <Box sx={{ p: 3, width: { xs: "100vw", sm: 420 } }}>
        {issue && (
          <Stack spacing={3}>
            <Stack alignItems="start" direction="row" justifyContent="space-between">
              <Box>
                <Typography color="text.secondary" variant="overline">
                  {issue.id}
                </Typography>
                <Typography component="h2" variant="h5">
                  {issue.title}
                </Typography>
              </Box>
              <IconButton aria-label="Close ticket detail" onClick={onClose}>
                <CloseRoundedIcon />
              </IconButton>
            </Stack>

            {issue.isBlocked && (
              <Alert icon={<BlockOutlinedIcon />} severity="error">
                This ticket is blocked. Unblock it before moving to the next phase.
              </Alert>
            )}

            <Stack direction="row" flexWrap="wrap" gap={1}>
              <Chip label={statusLabels[issue.status]} color="primary" />
              <Chip label={`${issue.priority} priority`} variant="outlined" />
              <Chip label={getCatalogLabel(issueTypes, issue.type)} variant="outlined" />
              <Chip label={getCatalogLabel(issueCategories, issue.category)} variant="outlined" />
              <Chip label={getCatalogLabel(severityLevels, issue.severity)} variant="outlined" />
            </Stack>

            <Divider />

            <Box>
              <Typography fontWeight={700} variant="subtitle1">
                Triage controls
              </Typography>
              <Stack spacing={2} sx={{ mt: 1.5 }}>
                <TextField
                  label="Type"
                  onChange={(event) => onUpdate(issue.id, { type: event.target.value })}
                  select
                  value={issue.type}
                >
                  {issueTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Category"
                  onChange={(event) => onUpdate(issue.id, { category: event.target.value })}
                  select
                  value={issue.category}
                >
                  {issueCategories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Severity"
                  onChange={(event) => onUpdate(issue.id, { severity: event.target.value })}
                  select
                  value={issue.severity}
                >
                  {severityLevels.map((severity) => (
                    <MenuItem key={severity.value} value={severity.value}>
                      {severity.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Assignee"
                  onChange={(event) => onUpdate(issue.id, { assignee: event.target.value })}
                  select
                  value={issue.assignee}
                >
                  {teamMembers.map((member) => (
                    <MenuItem key={member} value={member}>
                      {member}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Priority"
                  onChange={(event) => onUpdate(issue.id, { priority: event.target.value })}
                  select
                  value={issue.priority}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </TextField>
                <FormControlLabel
                  control={
                    <Switch
                      checked={issue.isBlocked}
                      onChange={(event) =>
                        onUpdate(issue.id, {
                          blockReason: event.target.checked ? issue.blockReason ?? "" : "",
                          isBlocked: event.target.checked,
                        })
                      }
                    />
                  }
                  label="This ticket is blocked"
                />
                {issue.isBlocked && (
                  <TextField
                    error={!issue.blockReason?.trim()}
                    helperText={
                      issue.blockReason?.trim()
                        ? "This reason explains why the workflow cannot advance."
                        : "Add a reason before the team can act on this blocker."
                    }
                    label="Blocker reason"
                    multiline
                    onChange={(event) => onUpdate(issue.id, { blockReason: event.target.value })}
                    required
                    value={issue.blockReason ?? ""}
                  />
                )}
              </Stack>
            </Box>

            <Divider />

            {issue.description && (
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Description
                </Typography>
                <Typography>{issue.description}</Typography>
              </Box>
            )}
            <Box>
              <Typography color="text.secondary" variant="body2">
                Reported by
              </Typography>
              <Typography>{issue.reporter}</Typography>
            </Box>
            <Box>
              <Typography color="text.secondary" variant="body2">
                Assigned to
              </Typography>
              <Typography>{issue.assignee}</Typography>
            </Box>
            <Box>
              <Typography color="text.secondary" variant="body2">
                Reported at
              </Typography>
              <Typography>{issue.reportedAt}</Typography>
            </Box>

            <Divider />

            <Box>
              <Typography fontWeight={700} variant="subtitle1">
                Activity
              </Typography>
              <Box sx={{ mt: 1.5 }}>
                <TicketActivity
                  activity={issue.activity ?? []}
                  onAddComment={(comment) => onAddComment(issue.id, comment)}
                />
              </Box>
            </Box>

            {issue.status === "qa-validation" && (
              <Box>
                <Typography fontWeight={700} variant="subtitle1">
                  QA decision
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5 }} variant="body2">
                  Record the validation result before the ticket can continue.
                </Typography>
                <TextField
                  fullWidth
                  label="QA notes"
                  multiline
                  onChange={(event) =>
                    setQaNotesByIssue((currentNotes) => ({ ...currentNotes, [issue.id]: event.target.value }))
                  }
                  placeholder="Describe what was tested and the result."
                  required
                  rows={3}
                  sx={{ mt: 1.5 }}
                  value={qaNotes}
                />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mt: 1.5 }}>
                  <Button
                    color="error"
                    disabled={issue.isBlocked || !qaNotes.trim()}
                    onClick={() => onCompleteQa(issue.id, "failed", qaNotes.trim())}
                    variant="outlined"
                  >
                    Return to development
                  </Button>
                  <Button
                    disabled={issue.isBlocked || !qaNotes.trim()}
                    onClick={() => onCompleteQa(issue.id, "passed", qaNotes.trim())}
                    variant="contained"
                  >
                    Pass QA
                  </Button>
                </Stack>
              </Box>
            )}

            {issue.status === "released" && (
              <Box>
                <Typography fontWeight={700} variant="subtitle1">
                  Close ticket
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5 }} variant="body2">
                  Confirm the released fix and leave a resolution summary.
                </Typography>
                <TextField
                  fullWidth
                  label="Resolution summary"
                  multiline
                  onChange={(event) =>
                    setResolutionSummariesByIssue((currentSummaries) => ({
                      ...currentSummaries,
                      [issue.id]: event.target.value,
                    }))
                  }
                  placeholder="Explain how the incident was resolved."
                  required
                  rows={3}
                  sx={{ mt: 1.5 }}
                  value={resolutionSummary}
                />
                <Button
                  disabled={issue.isBlocked || !resolutionSummary.trim()}
                  onClick={() => onCloseIssue(issue.id, resolutionSummary.trim())}
                  sx={{ mt: 1.5 }}
                  variant="contained"
                >
                  Close ticket
                </Button>
              </Box>
            )}

            {issue.status === "closed" && (
              <Box>
                <Typography fontWeight={700} variant="subtitle1">
                  Resolution
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  {issue.resolutionSummary || "No resolution summary was recorded."}
                </Typography>
                <TextField
                  fullWidth
                  label="Reason for reopening"
                  multiline
                  onChange={(event) =>
                    setReopenReasonsByIssue((currentReasons) => ({
                      ...currentReasons,
                      [issue.id]: event.target.value,
                    }))
                  }
                  placeholder="Explain why this ticket needs another review."
                  required
                  rows={3}
                  sx={{ mt: 2 }}
                  value={reopenReason}
                />
                <Button
                  disabled={!reopenReason.trim()}
                  onClick={() => onReopenIssue(issue.id, reopenReason.trim())}
                  sx={{ mt: 1.5 }}
                  variant="outlined"
                >
                  Reopen for triage
                </Button>
              </Box>
            )}

            {nextStatus && !["qa-validation", "released"].includes(issue.status) ? (
              <Button
                disabled={issue.isBlocked}
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => onAdvance(issue.id)}
                variant="contained"
              >
                Move to {statusLabels[nextStatus]}
              </Button>
            ) : !["qa-validation", "released", "closed"].includes(issue.status) ? (
              <Alert severity="success">This ticket has completed its lifecycle.</Alert>
            ) : null}
          </Stack>
        )}
      </Box>
    </Drawer>
  );
}
