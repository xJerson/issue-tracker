import { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { statusColors, statusLabels } from "./workflow";

// Map issue priority to MUI's semantic color tokens.
const priorityColors = {
  high: "error",
  medium: "warning",
  low: "success",
};

// Keep the list readable by showing only this many issues on one page.
const issuesPerPage = 5;

// This component receives its data through props.
// It owns only the page selection because that controls this view alone.
export default function IssueList({ issues, onSelectIssue }) {
  // Page is UI state because it determines which part of the list is visible.
  const [page, setPage] = useState(1);

  // Render an explicit empty state instead of an empty list.
  if (issues.length === 0) {
    return <Typography>No issues found.</Typography>;
  }

  // Calculate which segment of the array belongs on the selected page.
  const totalPages = Math.ceil(issues.length / issuesPerPage);
  const startIndex = (page - 1) * issuesPerPage;
  const visibleIssues = issues.slice(startIndex, startIndex + issuesPerPage);
  const finalIssueNumber = startIndex + visibleIssues.length;

  return (
    <Stack spacing={2}>
      <Typography color="text.secondary" variant="body2">
        Showing {startIndex + 1}–{finalIssueNumber} of {issues.length} issues
      </Typography>

      <Stack component="ul" spacing={2} sx={{ listStyle: "none", m: 0, p: 0 }}>
        {visibleIssues.map((issue) => (
          // A stable key lets React track each item in the list.
          <Card component="li" key={issue.id} variant="outlined">
            {/* A card is a real control, so keyboard users can open ticket detail too. */}
            <CardActionArea onClick={() => onSelectIssue(issue.id)}>
              <CardContent>
              {/* A grid reserves the same column for every assignee chip. */}
              <Box
                sx={{
                  alignItems: "start",
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) 176px" },
                }}
              >
                <Box>
                  <Typography color="text.secondary" variant="caption">
                    {issue.id}
                  </Typography>
                  <Typography component="h2" sx={{ mt: 0.5 }} variant="h6">
                    {issue.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 0.5 }} variant="body2">
                    Reported by {issue.reporter} · {issue.reportedAt}
                  </Typography>
                </Box>
                <Chip
                  icon={<AccountCircleOutlinedIcon />}
                  label={issue.assignee}
                  sx={{ justifyContent: "flex-start", width: { xs: "fit-content", sm: "100%" } }}
                  variant="outlined"
                />
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ flexWrap: "wrap", gridColumn: { sm: "1 / -1" }, rowGap: 1 }}
                >
                  <Chip
                    color={statusColors[issue.status]}
                    icon={<TaskAltOutlinedIcon />}
                    label={statusLabels[issue.status]}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    color={priorityColors[issue.priority]}
                    icon={<FlagOutlinedIcon />}
                    label={`${issue.priority} priority`}
                    size="small"
                  />
                  {issue.isBlocked && (
                    <Chip
                      color="error"
                      icon={<BlockOutlinedIcon />}
                      label="Blocked"
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Stack>
              </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>

      {/* MUI handles keyboard navigation and accessible page controls. */}
      <Pagination
        count={totalPages}
        onChange={(_, nextPage) => setPage(nextPage)}
        page={page}
        shape="rounded"
        sx={{ alignSelf: "center", mt: 1 }}
      />
    </Stack>
  );
}
