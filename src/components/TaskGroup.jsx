import TaskCard from "./TaskCard";

const LABELS = {
  high: "High priority",
  medium: "Medium priority",
  low: "Low priority",
};

export default function TaskGroup({
  priority,
  tasks,
  onDelete,
  onToggle,
  onEdit,
}) {
  return (
    <div className="group-card">
      <div className="group-header">
        <div className="group-title">
          <span className={`dot dot-${priority}`} />
          <span className="group-name">{LABELS[priority]}</span>
        </div>
        <span className="group-count">{tasks.length}</span>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
