import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase/firestore";

// Create context
const TaskContext = createContext();

// Provider
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = "demo-user";

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "users", userId, "tasks"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => {
        const taskData = doc.data();
        return {
          id: doc.id,
          ...taskData,
          dueDate: taskData.dueDate ? taskData.dueDate.toDate() : null
        };
      });

      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a task
  const addTask = async (task) => {
    try {
      await addDoc(collection(db, "users", userId, "tasks"), {
        ...task,
        dueDate: task.dueDate || null,
        createdAt: serverTimestamp() 
      });

      await fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Update a task
  const updateTask = async (taskId, updatedData) => {
    try {
      const taskRef = doc(db, "users", userId, "tasks", taskId);
      await updateDoc(taskRef, updatedData);
      await fetchTasks(); 
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, "users", userId, "tasks", taskId);
      await deleteDoc(taskRef);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook
export const useTasks = () => useContext(TaskContext);
