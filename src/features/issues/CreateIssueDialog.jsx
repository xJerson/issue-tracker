import { useState } from "react";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { issueCategories, issueTypes, severityLevels } from "./data/issueCatalog";
import { teamMembers } from "./data/teamMembers";

const initialForm = {
  title: "",
  description: "",
  priority: "medium",
  reporter: "Customer Support",
  assignee: "Jerson",
  type: "bug",
  category: "authentication",
  severity: "p3",
};

// This dialog collects the information required to report a new ticket.
export default function CreateIssueDialog({ open, onClose, onCreate }) {
  // Form state belongs here because no other component needs unfinished input.
  const [form, setForm] = useState(initialForm);

  function updateField(event) {
    // Use one handler for every controlled field.
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Do not create a ticket without a meaningful title.
    if (!form.title.trim()) {
      return;
    }

    onCreate({ ...form, title: form.title.trim(), description: form.description.trim() });
    setForm(initialForm);
  }

  function handleClose() {
    // Discard unfinished input when the operator cancels the dialog.
    setForm(initialForm);
    onClose();
  }

  return (
    <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Report new issue</DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              autoFocus
              label="Title"
              name="title"
              onChange={updateField}
              required
              value={form.title}
            />
            <TextField
              label="Description"
              minRows={4}
              multiline
              name="description"
              onChange={updateField}
              placeholder="Explain what happened and how to reproduce it."
              value={form.description}
            />
            <TextField
              label="Reporter"
              name="reporter"
              onChange={updateField}
              select
              value={form.reporter}
            >
              <MenuItem value="Customer Support">Customer Support</MenuItem>
              <MenuItem value="Monitoring">Monitoring</MenuItem>
              <MenuItem value="Product Team">Product Team</MenuItem>
            </TextField>
            <TextField label="Type" name="type" onChange={updateField} select value={form.type}>
              {issueTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Category"
              name="category"
              onChange={updateField}
              select
              value={form.category}
            >
              {issueCategories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Severity"
              name="severity"
              onChange={updateField}
              select
              value={form.severity}
            >
              {severityLevels.map((severity) => (
                <MenuItem key={severity.value} value={severity.value}>
                  {severity.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Priority"
              name="priority"
              onChange={updateField}
              select
              value={form.priority}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </TextField>
            <TextField
              label="Assignee"
              name="assignee"
              onChange={updateField}
              select
              value={form.assignee}
            >
              {teamMembers.map((member) => (
                <MenuItem key={member} value={member}>
                  {member}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button startIcon={<AddTaskRoundedIcon />} type="submit" variant="contained">
            Create issue
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
