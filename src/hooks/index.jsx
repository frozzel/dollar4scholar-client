import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { AuthContext } from "../context/AuthContext";



export const useNotification = () => useContext(NotificationContext)
export const useAuth = () => useContext(AuthContext)