import { useState } from "react";
import AddTaskModal from "../task/AddTaskModal";

const Header = ({onToggleSidebar}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <header>
        <div className="flex items-center gap-4">
          {/* Hamburger button for mobile */}
          <button
            type="button"
            className="md:hidden text-[var(--bg)] text-2xl"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            🟰
          </button>

          <h1 className="logo text-[24px] md:text-[36px]">
            TaskFlow
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="btn cta"
        >
          ➕ Add Task
        </button>
      </header>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
};

export default Header;
