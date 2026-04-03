import { useState, useEffect } from "react";

export default function TaskModal({ onAdd, onEdit, onClose, editingTask }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("high");
  const [dueDate, setDueDate] = useState("");

  const isEditing = Boolean(editingTask);

  useEffect(() => {
    if (editingTask) {
      setText(editingTask.text);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate || "");
    } else {
      setText("");
      setPriority("high");
      setDueDate("");
    }
  }, [editingTask]);

  const handleSubmit = () => {
    if (!text.trim()) return;
    if (isEditing) {
      onEdit({ ...editingTask, text, priority, dueDate });
    } else {
      onAdd({ text, priority, dueDate });
    }
    onClose();
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") onClose();
  };

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
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
          />
        </div>

        <div className="field">
          <label>Priority</label>
          <div className="priority-row">
            {["high", "medium", "low"].map((p) => (
              <button
                key={p}
                className={`p-btn ${priority === p ? "active" : ""}`}
                data-p={p}
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
