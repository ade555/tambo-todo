function formatDate(d) {
  const [y, m, day] = d.split("-");
  return new Date(y, m - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function isOverdue(d) {
  const [y, m, day] = d.split("-");
  return new Date(y, m - 1, day) < new Date(new Date().toDateString());
}

export default function TaskCard({ task, onDelete, onToggle, onEdit }) {
  const over = task.dueDate && isOverdue(task.dueDate) && !task.completed;

  return (
    <div
      className={`task-row ${task.completed ? "done" : ""}`}
      onClick={() => onToggle(task.id)}
    >
      <div className="check-box" />

      <div className="task-content">
        <div className="task-text">{task.text}</div>
        {task.dueDate && (
          <div className="task-meta">
            <span className={`due-chip ${over ? "overdue" : ""}`}>
              {over ? "Overdue · " : "Due: "}
              {formatDate(task.dueDate)}
            </span>
          </div>
        )}
      </div>

      <div className="task-actions">
        <button
          className="action-btn edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          title="Edit task"
        >
          ✎
        </button>
        <button
          className="action-btn del-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          title="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
