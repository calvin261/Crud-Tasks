import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useTasks } from "../context/taskContext";
import { useRouter } from "next/router";
const TaskFormPage = () => {
  const { createTask, updateTask, tasks } = useTasks();
  const { push, query } = useRouter();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.id) {
      createTask(task.title, task.description);
    } else {
      updateTask(query.id, task);
    }

    push("/");
  };
  useEffect(() => {
    if (query.id) {
      const taskFound = tasks.find((task) => task.id === query.id);
      setTask({ title: taskFound.title, description: taskFound.description });
      console.log(taskFound);
    }
  }, []);
  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <form onSubmit={handleSubmit} className="bg-gray-700 p-10 h-2/4 rounded-md">
          <h1 className="text-3xl mb-7">{query.id ? "Udpate a Task" : "Create a Task"}</h1>
          <input
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
            type="text"
            name="title"
            placeholder="Write a title"
            value={task.title}
            onChange={handleChange}
          />
          <textarea
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-4"
            rows="2"
            placeholder="Write a description"
            name="description"
            value={task.description}
            onChange={handleChange}
          ></textarea>
          <button
            className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md disabled:opacity-30"
            disabled={!task.title}
          >
            Save
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default TaskFormPage;
