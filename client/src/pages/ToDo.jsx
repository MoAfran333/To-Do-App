import React from "react";
import toast from "react-hot-toast";
import deleteIcon from "../assets/delete.svg";
import useUserStore from "../store/user";
import { useNavigate } from "react-router-dom";

function ToDo({ todo }) {
  const { deleteToDoList } = useUserStore();
  const navigate = useNavigate();

  const handleDelete = async (e, taskId) => {
    e.preventDefault();
    console.log(taskId);
    try {
      const { success, message } = await deleteToDoList(taskId);
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
    <div className="flex gap-6 items-center">
      <div className="border-2 w-full flex flex-col rounded-lg space-y-2 border-white px-8 py-6">
        <h1 className="text-white font-extrabold">{todo.title}</h1>
        <div className="flex justify-between">
          <h2 className="text-gray-300 font-lg">{todo.description}</h2>
          <h4 className="text-gray-300 font-md">{Date(todo.deadlineDate)}</h4>
        </div>
      </div>
      <button
        onClick={(e) => handleDelete(e, todo._id)}
        className="w-10 h-10 bg-red-500 rounded-lg flex justify-center items-center"
      >
        <img src={deleteIcon} alt="Delete Icon" className="w-7 h-7" />
      </button>
    </div>
  );
}

export default ToDo;
