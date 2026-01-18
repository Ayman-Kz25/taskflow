import { useState } from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!onConfirm) return;
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Error deleting task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-container">
      <div className="task-modal">
        <h3 className="title">Delete Task?</h3>
        <p className="msg">
          Are you sure you want to delete "<span className="font-medium">{taskTitle}</span>"? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cancel-btn"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="btn bg-red-600"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
