import React, { useState } from "react";
import toast from "react-hot-toast";
import useUserStore from "../store/user.js";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";

function Create() {
  const { currentUser, addToDoList } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Take a Walk");
  const [description, setDescription] = useState("Write your thoughts here...");
  const [deadlineDate, setDeadlineDate] = useState("");
  const navigate = useNavigate();

  const handleNav = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(title, description, deadlineDate);
    const userEmail = currentUser.email;
    try {
      const { success, message } = await addToDoList(
        userEmail,
        title,
        description,
        deadlineDate
      );
      if (success === true) {
        toast.success(message);
        setLoading(false);
        navigate("/");
      } else {
        toast.error(message);
        setLoading(false);
      }
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading === false ? (
        <div className="h-screen, w-1/2 mx-10 my-8 border-2 py-12 px-6 rounded-xl bg-slate-700 flex justify-center items-center">
          {currentUser.email !== null ? (
            <form onSubmit={handleSubmit}>
              <div className="gap-6 space-y-5 mb-6 w-full">
                <div className="">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={title}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    cols="40"
                    onChange={(e) => setDescription(e.target.value)}
                    className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={description}
                  ></textarea>
                </div>

                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 start-7 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    type="datetime-local"
                    id="Test_DatetimeLocal"
                    min="2024-10-01T00:00"
                    max="2025-12-31T23:59"
                    step="1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-7"
                    placeholder="Select date"
                    onChange={(e) => setDeadlineDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleNav}
                  type="button"
                  className="text-black relative left-0 bg-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/2 px-5 py-2.5 text-center dark:bg-white dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white relative left-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-md"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <p className="text-white text-2xl">
              Please{" "}
              <a className="text-blue-400" href={"/login"}>
                Login
              </a>{" "}
              to Create To-Dos
            </p>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Create;
