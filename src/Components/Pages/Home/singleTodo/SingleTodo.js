import React from "react";

const SingleTodo = ({ todo }) => {
  const { title, description, _id } = todo || {};
  return (
    <div className=" shadow-xl flex justify-between p-3 gap-5 mb-5 bg-slate-200 rounded-2xl">
      <div className="mx-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="flex justify-end items-center gap-3">
        <button class="btn btn-sm bg-primary text-white">Complete</button>
        <button class="btn btn-sm bg-red-500 text-white">Delete</button>
      </div>
    </div>
  );
};

export default SingleTodo;
