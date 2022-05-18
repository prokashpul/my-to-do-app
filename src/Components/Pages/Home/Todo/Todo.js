import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../../Sheard/Loader/Loader";
import SingleTodo from "../singleTodo/SingleTodo";

const Todo = () => {
  //   const [todoData, setTodoData] = useState([]);

  //   useEffect(() => {
  //     fetch("http://localhost:5000/todos")
  //       .then((res) => res.json())
  //       .then((data) => setTodoData(data));
  //   }, []);

  const {
    isLoading,
    error,
    data: todoData,
    refetch,
  } = useQuery("repoData", () =>
    fetch("http://localhost:5000/todos").then((res) => res.json())
  );
  const handelSubmit = (e) => {
    e.preventDefault();
    if (e.target.title.value !== "" || e.target.dis.value !== "") {
      const title = e.target.title.value;
      const description = e.target.description.value;

      const todo = { title, description };
      fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(todo),
      })
        .then((res) => res.json())
        .then((data) => refetch());

      e.target.title.value = "";
      e.target.description.value = "";
    } else {
      alert("error");
    }
  };
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="hero min-h-screen bg-base-200 shadow-2xl">
      <div className="hero-content text-center">
        <div className="card md:w-[50vw] min-h-[100vh] bg-base-100 shadow-xl">
          <div className="card-body ">
            <h2 className="card-title mb-5 justify-center">Add ToDo !!</h2>
            <form onSubmit={handelSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="input input-bordered input-primary w-full mb-5"
              />
              <textarea
                name="description"
                className="textarea textarea-primary w-full mb-5"
                placeholder="Description"
              ></textarea>
              <button type="submit" className="btn btn-primary">
                ADD TODO
              </button>
            </form>
            <div className="my-10">
              <h2 className="text-center font-bold text-2xl text-primary mb-10">
                All ToDo List
              </h2>
              {todoData?.map((todo) => (
                <SingleTodo key={todo._id} todo={todo}></SingleTodo>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
