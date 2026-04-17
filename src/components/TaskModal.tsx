import { useState, useEffect } from "react";
import type { Task, TaskInput } from "../types/task";

interface TaskModalProps {
  onAdd: (task: TaskInput) => void;
  onEdit: (task: Task) => void;
  onClose: () => void;
  editingTask?: Task | null;
}

export default function TaskModal({
  onAdd,
  onEdit,
  onClose,
  editingTask,
}: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskInput["priority"]>("high");
  const [dueDate, setDueDate] = useState("");

  const isEditing = Boolean(editingTask);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate ?? "");
    } else {
      setTitle("");
      setPriority("high");
      setDueDate("");
    }
  }, [editingTask]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (editingTask) {
      onEdit({
        ...editingTask,
        title,
        priority,
        dueDate,
      });
    } else {
      onAdd({
        title,
        priority,
        dueDate,
      });
    }

    onClose();
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") onClose();
  };

  const priorities: TaskInput["priority"][] = ["high", "medium", "low"];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">
          {isEditing ? "Edit task" : "New task"}
        </div>

        <div className="field">
          <label>Task</label>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
          />
        </div>

        <div className="field">
          <label>Priority</label>
          <div className="priority-row">
            {priorities.map((p) => (
              <button
                key={p}
                data-p={p}
                className={`p-btn ${priority === p ? "active" : ""}`}
                onClick={() => setPriority(p)}
              >
                <span className="p-dot" />
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSubmit}>
            {isEditing ? "Save changes" : "Add task"}
          </button>
        </div>
      </div>
    </div>
  );
}
