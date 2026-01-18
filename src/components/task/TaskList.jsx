import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskDetailModal from "./TaskDetailModal";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <>
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={setSelectedTask}
          />
        ))}
      </div>

      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </>
  );
};

export default TaskList;
