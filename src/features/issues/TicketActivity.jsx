import { useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// This timeline makes workflow decisions visible instead of hiding them in state.
export default function TicketActivity({ activity, onAddComment }) {
  // A comment stays local until the operator explicitly submits it.
  const [comment, setComment] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!comment.trim()) {
      return;
    }

    onAddComment(comment.trim());
    setComment("");
  }

  return (
    <Stack spacing={2}>
      <Stack component="ol" spacing={1.5} sx={{ listStyle: "none", m: 0, p: 0 }}>
        {activity.length === 0 ? (
          <Typography color="text.secondary">No activity recorded yet.</Typography>
        ) : (
          [...activity].reverse().map((entry) => (
            <Paper
              component="li"
              elevation={0}
              key={entry.id}
              sx={{ backgroundColor: "rgba(79, 70, 229, 0.04)", p: 1.5 }}
            >
              <Stack alignItems="start" direction="row" spacing={1}>
                <HistoryRoundedIcon color="primary" fontSize="small" />
                <Box>
                  <Typography variant="body2">{entry.message}</Typography>
                  <Typography color="text.secondary" variant="caption">
                    {entry.author} · {entry.createdAt}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          ))
        )}
      </Stack>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            label="Add a comment"
            onChange={(event) => setComment(event.target.value)}
            size="small"
            value={comment}
          />
          <Button aria-label="Post comment" type="submit" variant="contained">
            <SendRoundedIcon fontSize="small" />
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
