import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

// This component controls only the query inputs; App decides how tickets are filtered.
export default function IssueFilters({ assignees, filters, onChange, onClear }) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: "rgba(148, 163, 184, 0.24)",
        p: 2,
      }}
    >
      <Stack alignItems="center" direction={{ xs: "column", lg: "row" }} gap={1.5}>
        <TextField
          fullWidth
          label="Search tickets"
          name="query"
          onChange={onChange}
          placeholder="Search by ID, title, or description"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          value={filters.query}
        />
        <TextField
          label="Priority"
          name="priority"
          onChange={onChange}
          select
          sx={{ minWidth: { xs: "100%", sm: 160 } }}
          value={filters.priority}
        >
          <MenuItem value="all">All priorities</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </TextField>
        <TextField
          label="Assignee"
          name="assignee"
          onChange={onChange}
          select
          sx={{ minWidth: { xs: "100%", sm: 160 } }}
          value={filters.assignee}
        >
          <MenuItem value="all">All assignees</MenuItem>
          {assignees.map((assignee) => (
            <MenuItem key={assignee} value={assignee}>
              {assignee}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Availability"
          name="blocked"
          onChange={onChange}
          select
          sx={{ minWidth: { xs: "100%", sm: 160 } }}
          value={filters.blocked}
        >
          <MenuItem value="all">All tickets</MenuItem>
          <MenuItem value="blocked">Blocked</MenuItem>
          <MenuItem value="unblocked">Unblocked</MenuItem>
        </TextField>
        <TextField
          label="Sort by"
          name="sort"
          onChange={onChange}
          select
          sx={{ minWidth: { xs: "100%", sm: 160 } }}
          value={filters.sort}
        >
          <MenuItem value="newest">Newest reported</MenuItem>
          <MenuItem value="oldest">Oldest reported</MenuItem>
          <MenuItem value="priority">Highest priority</MenuItem>
        </TextField>
        <Button
          color="inherit"
          onClick={onClear}
          startIcon={<ClearRoundedIcon />}
          sx={{ alignSelf: { xs: "stretch", lg: "center" }, whiteSpace: "nowrap" }}
        >
          Clear
        </Button>
      </Stack>
    </Paper>
  );
}
