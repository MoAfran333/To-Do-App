import React from "react";

const TODO = ({ todoList }) => {
  return (
    <div className="h-screen, w-full p-12 mx-10 my-8 flex flex-1 justify-center items-center">
      {todoList?.length !== 0 ? (
        <div className="w-2/3 space-y-6">
          {todoList?.map((todo) => (
            <div className="border-2 w-full flex flex-col rounded-lg space-y-2 border-white px-8 py-6">
              <h1 className="text-white font-extrabold">{todo.title}</h1>
              <div className="flex justify-between">
                <h2 className="text-gray-300 font-lg">{todo.description}</h2>
                <h4 className="text-gray-300 font-md">
                  {Date(todo.deadlineDate)}
                </h4>
              </div>
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
