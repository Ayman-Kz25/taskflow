import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded text-[18px] transition ${
      isActive
        ? "bg-[var(--primary)] text-[var(--bg)] font-semibold"
        : "text-gray-500 text-[18px] hover:bg-[var(--bg)]"
    }`;

  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/" className={linkClass}>
          ⚙️ All Tasks
        </NavLink>

        <NavLink to="/in-progress" className={linkClass}>
          ⌛ In Progress
        </NavLink>

        <NavLink to="/completed" className={linkClass}>
          ✅ Completed
        </NavLink>

        <div className="mt-4">
          <p>
            Categories
          </p>

          <NavLink to="/category/work" className={linkClass}>
            💼 Work
          </NavLink>

          <NavLink to="/category/personal" className={linkClass}>
            📌 Personal
          </NavLink>

          <NavLink to="/category/study" className={linkClass}>
            🗂️ Study
          </NavLink>
        </div>

        <div className="mt-4">
          <NavLink to="/calendar" className={linkClass}>
            🗓️ Calendar
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
