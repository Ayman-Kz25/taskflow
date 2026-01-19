// pages/CategoryPage.jsx
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskList from "../components/task/TaskList";
import FilterBar from "../components/filters/FilterBar";
import EditTaskModal from "../components/task/EditTaskModal";
import ConfirmDeleteModal from "../components/task/ConfirmDeleteModal";
import EmptyState from "../components/ui/EmptyState";
import { isToday, isPast } from "date-fns";

const CategoryPage = () => {
  const { category } = useParams(); // work | personal | study
  const { tasks, deleteTask } = useTasks();

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    due: "",
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // 🔹 Edit handler
  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  // 🔹 Delete handler
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

  // 🔹 Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      let pass = true;

      // Category from route
      if (category) {
        pass =
          pass &&
          task.category?.toLowerCase() === category.toLowerCase();
      }

      if (filters.status) {
        pass = pass && task.status === filters.status;
      }

      if (filters.priority) {
        pass = pass && task.priority === filters.priority;
      }

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
  }, [tasks, category, filters]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 capitalize">
        {category} Tasks
      </h2>

      {/* Filters (NO category dropdown) */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {filteredTasks.length > 0 ? (
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <EmptyState />
      )}

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
    </div>
  );
};

export default CategoryPage;
