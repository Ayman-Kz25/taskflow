import { getAuth } from "firebase/auth";
import { app } from "./firebase.config";

export const auth = getAuth(app);
