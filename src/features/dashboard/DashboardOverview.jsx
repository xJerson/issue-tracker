import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DashboardMetrics from "../issues/DashboardMetrics";

// The overview is a route-level screen that presents the current operational picture.
export default function DashboardOverview({ issueSummary, issues, today }) {
  return (
    <Container disableGutters maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 5, lg: 8 }, py: { xs: 4, md: 6 } }}>
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

        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" } }}>
          {issueSummary.map((item) => (
            <Paper
              elevation={0}
              key={item.label}
              sx={{ border: 1, borderColor: "rgba(148, 163, 184, 0.24)", overflow: "hidden", p: 2.5, position: "relative" }}
            >
              <Box sx={{ alignItems: "start", display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography color="text.secondary" fontWeight={600} variant="body2">
                    {item.label}
                  </Typography>
                  <Typography color="text.primary" fontWeight={800} sx={{ mt: 0.5 }} variant="h4">
                    {item.value}
                  </Typography>
                </Box>
                <Box sx={{ alignItems: "center", backgroundColor: item.tint, borderRadius: 3, color: item.color, display: "flex", height: 44, justifyContent: "center", width: 44 }}>
                  <item.icon />
                </Box>
              </Box>
              <Typography color="text.secondary" sx={{ mt: 1.5 }} variant="caption">
                {item.helper}
              </Typography>
              <Box sx={{ backgroundColor: item.color, bottom: 0, height: 3, left: 0, position: "absolute", right: 0 }} />
            </Paper>
          ))}
        </Box>

        <DashboardMetrics issues={issues} />
      </Stack>
    </Container>
  );
}
