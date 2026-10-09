import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// This timeline makes workflow decisions visible instead of hiding them in state.
export default function TicketActivity({ activity }) {
  if (activity.length === 0) {
    return <Typography color="text.secondary">No activity recorded yet.</Typography>;
  }

  return (
    <Stack component="ol" spacing={1.5} sx={{ listStyle: "none", m: 0, p: 0 }}>
      {[...activity].reverse().map((entry) => (
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
      ))}
    </Stack>
  );
}
