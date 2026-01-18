import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTasks } from "../context/TaskContext";

const CalendarView = () => {
  const { tasks } = useTasks();

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const dayTasks = tasks.filter((task) => {
      if (!task.dueDate) return false;

      let taskDate;
      if (task.dueDate.seconds) {
        taskDate = new Date(task.dueDate.seconds * 1000);
      } else if (task.dueDate instanceof Date) {
        taskDate = task.dueDate;
      } else {
        return false;
      }

      return (
        taskDate.getFullYear() === date.getFullYear() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getDate() === date.getDate()
      );
    });

    if (!dayTasks.length) return null;

    return (
      <ul className="mt-1 text-xs space-y-0.5">
        {dayTasks.map((task) => (
          <li key={task.id} className="truncate" title={task.title}>
            {task.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="m-6 p-4 bg-white rounded-xl shadow-xl flex justify-center items-center min-h-[calc(100vh-14rem)]">
      {/* Force Calendar to fill wrapper */}
      <Calendar
        tileContent={tileContent}
        className="!h-full !w-full !border-2 !border-[var(--primary)] !rounded-xl"
      />
    </div>
  );
};

export default CalendarView;
