import React from "react";
import useUserStore from "../store/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TODO = ({ email, todoList }) => {
  const { deleteToDoList } = useUserStore();
  const navigate = useNavigate();

  const handleDelete = async (e, email, id) => {
    e.preventDefault();
    console.log(id);
    try {
      const { success, message } = await deleteToDoList(email, id);
      if (success === true) {
        toast.success(message);
        navigate("/");
      } else {
        toast.error(message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="h-screen, w-full p-12 mx-10 my-8 flex flex-1 justify-center items-center">
      {todoList?.length !== 0 ? (
        <div className="w-2/3 space-y-6">
          {todoList?.map((todo) => (
            <div>
              <div className="border-2 w-full flex flex-col rounded-lg space-y-2 border-white px-8 py-6">
                <h1 className="text-white font-extrabold">{todo.title}</h1>
                <div className="flex justify-between">
                  <h2 className="text-gray-300 font-lg">{todo.description}</h2>
                  <h4 className="text-gray-300 font-md">
                    {Date(todo.deadlineDate)}
                  </h4>
                </div>
              </div>
              <button onClick={(e) => handleDelete(e, todo._id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-2xl">
          No To-Dos{" "}
          <a className="text-blue-600" href={"/create"}>
            Click Here
          </a>{" "}
          to Add One
        </p>
      )}
    </div>
  );
};

export default TODO;
