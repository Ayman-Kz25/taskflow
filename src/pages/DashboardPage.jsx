// pages/DashboardPage.jsx
import { useState, useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import TaskList from "../components/task/TaskList";
import AddTaskModal from "../components/task/AddTaskModal";
import EditTaskModal from "../components/task/EditTaskModal";
import ConfirmDeleteModal from "../components/task/ConfirmDeleteModal";
import FilterBar from "../components/filters/FilterBar";
import { isToday, isPast } from "date-fns";

const DashboardPage = () => {
  const { tasks, deleteTask } = useTasks();

  const [filters, setFilters] = useState({
    status: "",
    category: "",
    priority: "",
    due: "",
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Edit
  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  // Delete
  const handleDelete = (task) => {
    setSelectedTask(task);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      setIsDeleteOpen(false);
      setSelectedTask(null);
    }
  };

  // 🔹 Filter logic (improved & consistent)
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      let pass = true;

      if (filters.status) pass = pass && task.status === filters.status;
      if (filters.category)
        pass = pass && task.category === filters.category;
      if (filters.priority)
        pass = pass && task.priority === filters.priority;

      if (filters.due) {
        if (!task.dueDate) return false;

        const due = task.dueDate.seconds
          ? new Date(task.dueDate.seconds * 1000)
          : new Date(task.dueDate);

        if (filters.due === "today") pass = pass && isToday(due);
        if (filters.due === "overdue")
          pass = pass && isPast(due) && task.status !== "completed";
        if (filters.due === "upcoming")
          pass = pass && !isPast(due) && !isToday(due);
      }

      return pass;
    });
  }, [tasks, filters]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">All Tasks</h2>

      <FilterBar filters={filters} setFilters={setFilters} />

      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modals */}
      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      {selectedTask && (
        <ConfirmDeleteModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={confirmDelete}
          taskTitle={selectedTask.title}
        />
      )}

      {/* Controlled elsewhere (header/fab) */}
      <AddTaskModal isOpen={false} onClose={() => {}} />
    </div>
  );
};

export default DashboardPage;
