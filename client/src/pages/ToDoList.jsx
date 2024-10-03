import React from "react";
import ToDo from "./ToDo";

const ToDoList = ({ todoList }) => {
  return (
    <div className="h-screen, w-full p-12 mx-10 my-8 flex flex-1 justify-center items-center">
      {todoList?.length !== 0 ? (
        <div className="w-2/3 space-y-6">
          {todoList?.map((todo) => (
            <ToDo key={todo._id} todo={todo} />
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

export default ToDoList;
