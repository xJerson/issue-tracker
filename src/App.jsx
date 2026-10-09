// Import the feature entry point instead of importing its internal components.
import TaskBoard from "./features/tasks/TaskBoard";

// App composes top-level features of the application.
export default function App() {
  // Render the task feature as the current application screen.
  return (
    <main>
      <TaskBoard />
    </main>
  );
}
