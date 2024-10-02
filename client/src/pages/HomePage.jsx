import React from "react";
import useUserStore from "../store/user.js";
import TODO from "./TODO.jsx";
import Navbar from "../components/Navbar.jsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { currentUser, logOut } = useUserStore();
  console.log(currentUser);

  const handleLogout = async () => {
    const { success, message } = await logOut();
    if (success === true) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      <div className="h-screen w-full p-12 mx-10 my-8 flex flex-col items-center">
        <Navbar />
        {currentUser?.email !== null && currentUser?.email !== undefined ? (
          <div className="w-full">
            <div className="flex justify-end">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <Link to={"/create"}>Add a Task</Link>
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                LogOut
              </button>
            </div>
            <TODO todoList={currentUser?.todoList} />
          </div>
        ) : (
          <>
            <p className="text-white text-2xl">
              Please Login to View your To-Dos{" "}
              <a className="text-blue-600" href={"/login"}>
                Login
              </a>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
