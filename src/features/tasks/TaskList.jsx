// This component receives data and actions through props.
export default function TaskList({ tasks, onToggleTask }) {
  // Give the user feedback when the list has no elements yet.
  if (tasks.length === 0) {
    return <p>No tasks yet. Create your first one above.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        // key helps React identify each item when the list changes.
        <li key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
            />
            {" "}
            {task.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
