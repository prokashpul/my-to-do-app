import React from "react";

const SingleTodo = ({ todo, deleteHandel, updateHandel }) => {
  const { title, description, _id, checked } = todo || {};
  return (
    <div className=" shadow-xl flex flex-col md:flex-row justify-between p-3 gap-5 mb-5 bg-slate-200 rounded-2xl ">
      <div className="mx-4 text-left">
        <h2
          className={`${
            checked === "yes" && "line-through text-red-500"
          } text-2xl font-bold`}
        >
          {title}
        </h2>
        <p>
          {description.length >= 30 ? description.slice(0, 30) : description}
        </p>
      </div>
      <div className="flex justify-center  md:justify-end items-center gap-3">
        <button
          disabled={checked === "yes" && true}
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
