import { useState } from "react";
import TaskBoard from "./components/TaskBoard";
import TaskModal from "./components/TaskModal";
import type { Task, TaskInput } from "./types/task";

function App() {
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

  const addTask = (task: TaskInput) => {
    setTasks((prev) => [
      ...prev,
      { ...task, id: String(Date.now()), completed: false },
    ]);
  };

  const editTask = (updated: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleComplete = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

  return (
    <div>
      <TaskBoard
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleComplete}
        onOpenModal={openAddModal}
        onEdit={openEditModal}
      />
      {isModalOpen && (
        <TaskModal
          onAdd={addTask}
          onEdit={editTask}
          onClose={closeModal}
          editingTask={editingTask}
        />
      )}
    </div>
  );
}

export default App;
