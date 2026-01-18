import React from "react";

const FilterBar = ({ filters, setFilters }) => {
  // Handle select changes in a unified way
  const handleChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="flex gap-4 mb-4">
      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) => handleChange("status", e.target.value)}
        className="filter-box"
      >
        <option value="">All Status</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Priority Filter */}
      <select
        value={filters.priority}
        onChange={(e) => handleChange("priority", e.target.value)}
        className="filter-box"
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Due Date Filter */}
      <select
        value={filters.due}
        onChange={(e) => handleChange("due", e.target.value)}
        className="filter-box"
      >
        <option value="">All Dates</option>
        <option value="overdue">Overdue</option>
        <option value="today">Today</option>
        <option value="upcoming">Upcoming</option>
      </select>
    </div>
  );
};

export default FilterBar;
