import { format } from "date-fns";

const TaskDetailModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="task-container">
      <div className="task-modal">
        <h2 className="title">{task.title}</h2>

        <p className="desc">{task.description || "No description"}</p>

        <div className="space-y-1 text-sm">
          <p><strong className="text-gray-500 mr-1.5">Category:</strong> {task.category}</p>
          <p><strong className="text-gray-500 mr-1.5">Status:</strong> {task.status}</p>
          <p><strong className="text-gray-500 mr-1.5">Priority:</strong> {task.priority || "medium"}</p>

          {task.dueDate && (
            <p>
              <strong className="text-gray-500 mr-1.5">Due:</strong>{" "}
              {format(task.dueDate, "MMM dd, yyyy")}
            </p>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="cancel-btn"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
