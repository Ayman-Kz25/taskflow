export const filterTasks = (tasks, filters = {}) => {
  return tasks.filter(task => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.category && task.category !== filters.category) return false;
    return true;
  });
};
