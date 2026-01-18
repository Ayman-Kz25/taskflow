import { useTasks } from "../context/TaskContext";
import TaskList from "../components/task/TaskList";

const CompletedPage = () => {
  const { tasks, deleteTask } = useTasks();

  const completedTasks = tasks.filter(
    task => task.status === "completed"
  );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Completed Tasks</h2>

      <TaskList
        tasks={completedTasks}
        onDelete={(task) => deleteTask(task.id)}
      />
    </div>
  );
};

export default CompletedPage;
