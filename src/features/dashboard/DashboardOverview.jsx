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
        <Paper elevation={0} sx={{ backgroundColor: "#17354A", color: "common.white", overflow: "hidden", p: { xs: 3, md: 4 }, position: "relative" }}>
          <Box sx={{ borderLeft: "4px solid #75D8D2", maxWidth: 700, pl: 2.5, position: "relative" }}>
            <Typography color="rgba(232, 245, 247, 0.76)" variant="body2">
              {today}
            </Typography>
            <Typography component="h1" sx={{ mt: 1 }} variant="h3">
              Today in operations
            </Typography>
            <Typography color="rgba(232, 245, 247, 0.82)" sx={{ mt: 1.5 }}>
              See where incidents need attention before they affect customers.
            </Typography>
          </Box>
          <Box sx={{ backgroundColor: "rgba(117, 216, 210, 0.22)", borderRadius: "50%", height: 220, position: "absolute", right: -80, top: -120, width: 220 }} />
        </Paper>

        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" } }}>
          {issueSummary.map((item) => (
            <Paper
              elevation={0}
              key={item.label}
              sx={{ border: "1px solid #C9D8E0", overflow: "hidden", p: 2.5, position: "relative" }}
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
