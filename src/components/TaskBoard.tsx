import { useState } from "react";
import TaskGroup from "./TaskGroup";
import TaskModal from "./TaskModal";
import type { Task, TaskInput } from "../types/task";

const PRIORITIES = ["high", "medium", "low"] as const;

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };
  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const addTask = (task: TaskInput) =>
    setTasks((prev) => [
      ...prev,
      { ...task, id: String(Date.now()), completed: false },
    ]);

  const editTask = (updated: Task) =>
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));

  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleComplete = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

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
    <>
      <div className="app">
        <div className="header">
          <div className="header-left">
            <h1>My tasks</h1>
            <p>{subtitle}</p>
          </div>
          <button className="add-btn" onClick={openAddModal}>
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
                  onDelete={deleteTask}
                  onToggle={toggleComplete}
                  onEdit={openEditModal}
                />
              ) : null,
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <TaskModal
          onAdd={addTask}
          onEdit={editTask}
          onClose={closeModal}
          editingTask={editingTask}
        />
      )}
    </>
  );
}
