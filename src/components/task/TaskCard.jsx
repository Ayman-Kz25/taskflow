import { format, isPast, isToday, isValid } from "date-fns";

const statusColors = {
  todo: "bg-gray-100 text-gray-700",
  "in-progress": "bg-violet-100 text-violet-700",
  completed: "bg-blue-100 text-blue-700",
};

const priorityColors = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const TaskCard = ({ task, onEdit, onDelete, onView }) => {
  // Safe conversion of Firestore timestamp or JS Date
  let dueDate = null;
  if (task.dueDate) {
    if (task.dueDate.seconds) {
      // Firestore timestamp
      dueDate = new Date(task.dueDate.seconds * 1000);
    } else if (task.dueDate instanceof Date) {
      // JS Date
      dueDate = task.dueDate;
    }
  }

  // Only valid dates
  if (dueDate && !isValid(dueDate)) dueDate = null;

  // Compute label
  let dueLabel = "";
  let dueClass = "text-gray-600 text-[18]";
  if (dueDate) {
    if (isPast(dueDate) && task.status !== "completed") {
      dueLabel = "Overdue";
      dueClass = "text-red-600 text-[16px] font-semibold";
    } else if (isToday(dueDate)) {
      dueLabel = "Today";
      dueClass = "text-yellow-700 text-[16px] font-semibold";
    } else {
      dueLabel = `Due: ${format(dueDate, "MMM dd, yyyy")}`;
      dueClass = "text-gray-500";
    }
  }

  return (
    <div className="task-card">
      {/* Task Info */}
      <div
        className="cursor-pointer"
        onClick={() => onView?.(task)}
      >
        <h3 className="title">{task.title}</h3>
        <p className="category">{task.category}</p>
        {dueLabel && <p className={`text-sm ${dueClass}`}>{dueLabel}</p>}
      </div>

      {/* Task Actions */}
      <div className="flex flex-col gap-1 items-end">
        <span
          className={`text-xs px-2 py-2 rounded ${statusColors[task.status]}`}
        >
          {task.status}
        </span>
        <span
          className={`text-xs px-2 py-2 rounded ${priorityColors[task.priority || "medium"]}`}
        >
          {task.priority || "medium"}
        </span>
        <div className="flex gap-2 mt-1">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening TaskDetail
              onEdit?.(task);
            }}
            className="edit-btn"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(task);
            }}
            className="del-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
