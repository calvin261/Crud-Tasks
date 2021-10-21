const { createContext, children, useContext, useState } = require("react");
import { v4 as uuid } from "uuid";
export const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: "1", title: "first task", description: "first task description" },
  ]);

  const createTask = (title, description) =>
    setTasks([...tasks, { title, description, id: uuid() }]);

  const updateTask = (id, udpatedTask) =>
    setTasks([
      ...tasks.map((task) =>
        task.id === id ? { ...task, ...udpatedTask } : task
      ),
    ]);
  const deleteTask = (id) =>
    setTasks([...tasks.filter((task) => task.id !== id)]);
  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
