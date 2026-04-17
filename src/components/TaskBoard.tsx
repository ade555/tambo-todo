import TaskGroup from "./TaskGroup";
import type { Task } from "../types/task";

const PRIORITIES = ["high", "medium", "low"] as const;

interface TaskBoardProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onOpenModal: () => void;
  onEdit: (task: Task) => void;
}

export default function TaskBoard({
  tasks,
  onDelete,
  onToggle,
  onOpenModal,
  onEdit,
}: TaskBoardProps) {
  const grouped: Record<"high" | "medium" | "low", Task[]> = {
    high: [],
    medium: [],
    low: [],
  };

  for (const t of tasks) {
    grouped[t.priority].push(t);
  }

  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const subtitle =
    total === 0 ? "No tasks yet" : `${done} of ${total} completed`;

  return (
    <div className="app">
      <div className="header">
        <div className="header-left">
          <h1>My tasks</h1>
          <p>{subtitle}</p>
        </div>
        <button className="add-btn" onClick={onOpenModal}>
          + New task
        </button>
      </div>

      {total === 0 ? (
        <div className="empty-state">
          <p>Nothing here yet</p>
          <span>Hit "New task" to add your first one</span>
        </div>
      ) : (
        <div className="board">
          {PRIORITIES.map((p) =>
            grouped[p].length > 0 ? (
              <TaskGroup
                key={p}
                priority={p}
                tasks={grouped[p]}
                onDelete={onDelete}
                onToggle={onToggle}
                onEdit={onEdit}
              />
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
