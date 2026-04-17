import TaskCard from "./TaskCard";
import type { Task } from "../types/task";

const LABELS = {
  high: "High priority",
  medium: "Medium priority",
  low: "Low priority",
};

interface TaskGroupProps {
  priority: Task["priority"];
  tasks: Array<Task>;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskGroup({
  priority,
  tasks,
  onDelete,
  onToggle,
  onEdit,
}: TaskGroupProps) {
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
