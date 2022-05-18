import React from "react";

const SingleTodo = ({ todo, deleteHandel, updateHandel }) => {
  const { title, description, _id, checked } = todo || {};
  return (
    <div className=" shadow-xl flex justify-between p-3 gap-5 mb-5 bg-slate-200 rounded-2xl">
      <div className="mx-4">
        <h2
          className={`${
            checked === "yes" && "line-through"
          } text-2xl font-bold`}
        >
          {title}
        </h2>
        <p>{description}</p>
      </div>
      <div className="flex justify-end items-center gap-3">
        <button
          onClick={() => updateHandel(_id)}
          className="btn btn-sm bg-primary text-white"
        >
          Complete
        </button>
        <button
          onClick={() => deleteHandel(_id)}
          className="btn btn-sm bg-red-500 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleTodo;
