import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";
import { db } from "../firebase/firestore";

export const getTasks = async (userId) => {
  const q = query(collection(db, "users", userId, "tasks"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addTask = async (userId, task) => {
  return addDoc(collection(db, "users", userId, "tasks"), task);
};
