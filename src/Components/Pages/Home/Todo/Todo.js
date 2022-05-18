import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
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
      const checked = "no";

      const todo = { title, description, checked };
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

  //   delete handel
  const deleteHandel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/todos/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => refetch());
      } else {
        return;
      }
    });
  };
  //   delete handel
  const updateHandel = (id) => {
    const todoId = todoData.find((todo) => todo._id === id);
    todoId.checked = "yes";
    console.log(todoId.checked);
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todoId),
    })
      .then((res) => res.json())
      .then((data) => refetch());
  };
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
                <SingleTodo
                  key={todo._id}
                  todo={todo}
                  deleteHandel={deleteHandel}
                  updateHandel={updateHandel}
                ></SingleTodo>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
