import { useState } from "react";
import AddTaskModal from "../task/AddTaskModal";

const Header = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <header>
        <h1 className="logo">
          TaskFlow
        </h1>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="btn cta"
        >
          + Add Task
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
