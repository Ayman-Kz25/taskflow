import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, isClose }) => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded text-[18px] transition ${
      isActive
        ? "bg-[var(--primary)] text-[var(--bg)] font-semibold"
        : "text-gray-500 text-[18px] hover:bg-[var(--bg)]"
    }`;

  return (
    <>
      {/* Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={isClose}
      ></div>
      <aside
        className={`sidebar ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close btn for mobile overlay */}
        <div className="flex justify-end p-4 mb-6 md:hidden">
          <button onClick={isClose} className="text-2xl text-[var(--bg)]">
            ❌
          </button>
        </div>
        {/* Desktop View */}
        <nav className="px-4 pb-6">
          <NavLink to="/" end className={linkClass}>
            ⚙️ All Tasks
          </NavLink>

          <NavLink to="/in-progress" className={linkClass}>
            ⌛ In Progress
          </NavLink>

          <NavLink to="/completed" className={linkClass}>
            ✅ Completed
          </NavLink>

          <div className="mt-4">
            <p>Categories</p>

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
    </>
  );
};

export default Sidebar;
