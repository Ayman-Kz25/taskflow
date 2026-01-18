import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskList from "../components/task/TaskList";
import AddTaskModal from "../components/task/AddTaskModal";
import EditTaskModal from "../components/task/EditTaskModal";
import ConfirmDeleteModal from "../components/task/ConfirmDeleteModal";
import FilterBar from "../components/filters/FilterBar";

const DashboardPage = () => {
  const { tasks, deleteTask } = useTasks();

  const [filters, setFilters] = useState({
    status: "",
    category: "",
    priority: "",
    due: "",
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Handle Edit
  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  // Handle Delete
  const handleDelete = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    let match = true;
    if (filters.status) match = match && task.status === filters.status;
    if (filters.category) match = match && task.category === filters.category;
    if (filters.priority)
      match = match && (task.priority || "medium") === filters.priority;
    if (filters.due && task.dueDate) {
      const dueDate = new Date(task.dueDate.seconds * 1000);
      if (filters.due === "overdue")
        match = match && dueDate < new Date() && task.status !== "completed";
      if (filters.due === "today")
        match = match && dueDate.toDateString() === new Date().toDateString();
      if (filters.due === "upcoming") match = match && dueDate > new Date();
    }
    return match;
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">All Tasks</h2>
      <FilterBar filters={filters} setFilters={setFilters} />
      {/* TaskList with onEdit and onDelete passed down */}
      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      Modals
      <AddTaskModal isOpen={false} onClose={() => {}} />{" "}
      {/* This can be controlled from Header */}
      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
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

export default DashboardPage;
