import { useState } from "react";

// This component owns the text currently typed in the input.
export default function TaskForm({ onCreateTask }) {
  // State makes the input value persist between React renders.
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    // Prevent the browser from reloading the page when the form is submitted.
    event.preventDefault();

    // Remove accidental spaces before validating the value.
    const cleanTitle = title.trim();

    // Do not create empty tasks.
    if (!cleanTitle) {
      return;
    }

    // Send the new task to the parent component through a prop.
    onCreateTask(cleanTitle);

    // Reset the controlled input after a successful submission.
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task-title">New task</label>
      <input
        id="task-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="For example: learn React state"
      />
      <button type="submit">Add task</button>
    </form>
  );
}
