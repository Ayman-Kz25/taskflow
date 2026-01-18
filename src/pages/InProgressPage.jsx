import { useTasks } from "../context/TaskContext";
import TaskList from "../components/task/TaskList";

const InProgressPage = () => {
  const { tasks, deleteTask } = useTasks();

  const inProgressTasks = tasks.filter(
    task => task.status === "in-progress"
  );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">In Progress</h2>

      <TaskList
        tasks={inProgressTasks}
        onDelete={(task) => deleteTask(task.id)}
      />
    </div>
  );
};

export default InProgressPage;
