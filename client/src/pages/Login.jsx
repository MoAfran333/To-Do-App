import React, { useState } from "react";
import passwd from "../assets/passwd.svg";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/user.js";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { fetchLoginUser } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = await fetchLoginUser(email, password);
      if (success === true) {
        toast.success(message);
        navigate("/");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-8  border border-white p-12 rounded-xl">
      <h1 className="text-center text-4xl mt-10 text-white font-extrabold">
        Login Page
      </h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
        <label
          htmlFor="email-address-icon"
          className="block mb-2 text-lg font-medium text-white"
        >
          Your Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="name@example.com"
            type="text"
            id="email-address-icon"
            className="bg-gray-50 border sm:min-w-96 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <label
          htmlFor="password-icon"
          className="block mb-2 text-lg font-medium text-white"
        >
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <img src={passwd} className="w-4 text-white" alt="Password-logo" />
          </div>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="****"
            type="password"
            id="password-icon"
            className="bg-gray-50 border sm:min-w-96 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center w-full"
        >
          Submit
        </button>
      </form>
      <p className="text-sm text-white">
        Don't have an Account?{" "}
        <a className="text-blue-400" href={"/signup"}>
          SignUp
        </a>
      </p>
    </div>
  );
};

export default Login;
