// pages/InProgressPage.jsx
import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskList from "../components/task/TaskList";
import EditTaskModal from "../components/task/EditTaskModal";
import ConfirmDeleteModal from "../components/task/ConfirmDeleteModal";
import EmptyState from "../components/ui/EmptyState";

const InProgressPage = () => {
  const { tasks, deleteTask } = useTasks();

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
  );

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 🔹 Handle Edit
  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  // 🔹 Handle Delete
  const handleDelete = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  // 🔹 Confirm Delete
  const confirmDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">In Progress</h2>

      {inProgressTasks.length > 0 ? (
        <TaskList
          tasks={inProgressTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <EmptyState />
      )}

      {/* 🔹 Edit Modal */}
      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {/* 🔹 Delete Modal */}
      {selectedTask && (
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          taskTitle={selectedTask.title}
        />
      )}
    </div>
  );
};

export default InProgressPage;
