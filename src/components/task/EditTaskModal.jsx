import { useState, useEffect } from "react";
import { useTasks } from "../../context/TaskContext";

const EditTaskModal = ({ task, isOpen, onClose }) => {
  const { updateTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);

  // Populate fields when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setCategory(task.category || "Work");
      setStatus(task.status || "todo");
      setPriority(task.priority || "medium");

      // Safely handle Firestore timestamp or JS Date
      if (task.dueDate) {
        if (task.dueDate.seconds) {
          setDueDate(new Date(task.dueDate.seconds * 1000).toISOString().split("T")[0]);
        } else if (task.dueDate instanceof Date) {
          setDueDate(task.dueDate.toISOString().split("T")[0]);
        } else {
          setDueDate("");
        }
      } else {
        setDueDate("");
      }
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    setLoading(true);
    try {
      await updateTask(task.id, {
        title,
        description,
        category,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
      });
      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Error updating task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-container">
      <div className="task-modal">
        <h2 className="title">Edit Task</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="add-input"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="add-input"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="add-input"
            required
          >
            <option value="">Please Select</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="add-input"
            required
          >
            <option value="">Please Select</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="add-input"
            required
          >
            <option value="">Please Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="add-input"
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
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
