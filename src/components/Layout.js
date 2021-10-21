import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";
import { useRouter } from "next/router";
import {useTasks} from '../context/taskContext'
const Layout = ({ children }) => {
  const router = useRouter();
  const {tasks} = useTasks();
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <header className="flex items-center bg-gray-800 px-28 py-5 ">
        <Link href="/">
          <a>
            <h1 className="font-black text-lg">Task App</h1>
          </a>
        </Link>
        <span className="ml-2 font-bold text-gray-400">{tasks.length} Tasks</span>
        <div className="flex-grow text-right">
          <button
            onClick={() => router.push("/new")}
            className="bg-green-500 hover:bg-green-600 font-bold rounded-md px-3 py-2 inline-flex items-center "
          >
            <FiPlusCircle className="mr-2" />
            Add Task
          </button>
        </div>
      </header>

      <main className="px-28 py-10">{children}</main>
    </div>
  );
};

export default Layout;
