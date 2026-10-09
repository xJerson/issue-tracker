import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

// This feature component owns task data because its children need that shared state.
export default function TaskBoard() {
  // Each task is an object so it can grow with more fields later.
  const [tasks, setTasks] = useState([
    { id: 1, title: "Inspect the React folder structure", completed: false },
    { id: 2, title: "Create a component", completed: true },
  ]);

  function createTask(title) {
    // Create a new array instead of changing the old state array directly.
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), title, completed: false },
    ]);
  }

  function toggleTask(taskId) {
    // map returns a new array with only the selected task changed.
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  // Calculate derived information instead of storing redundant state.
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <section>
      <h1>Issue Tracker</h1>
      <p>
        Completed: {completedTasks} of {tasks.length}
      </p>
      <TaskForm onCreateTask={createTask} />
      <TaskList tasks={tasks} onToggleTask={toggleTask} />
    </section>
  );
}
