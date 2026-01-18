import { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { Timestamp } from "firebase/firestore";

const AddTaskModal = ({ isOpen, onClose }) => {
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    setLoading(true);

    try {
      await addTask({
        title,
        description,
        category,
        status: "todo",
        dueDate: dueDate ? Timestamp.fromDate(new Date(dueDate)) : null,
        priority: "medium"
      });

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("Work");
      setDueDate("");

      onClose();
    } catch (error) {
      console.error("Failed to add task:", error);
      alert("Error adding task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-container">
      <div className="task-modal">
        <h2 className="title">Add New Task</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task title"
            className="add-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description (optional)"
            className="add-input"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <select
            className="add-input"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <option value="">Please Select</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
          </select>

          <input
            type="date"
            className="add-input"
            value={dueDate}
            required
            onChange={e => setDueDate(e.target.value)}
          />

          <div className="btn-container">
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
