import { useState } from "react";
import TaskBoard from "./components/TaskBoard";
import TaskModal from "./components/TaskModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const openAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      { ...task, id: Date.now(), completed: false },
    ]);
  };

  const editTask = (updated) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleComplete = (id) =>
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
