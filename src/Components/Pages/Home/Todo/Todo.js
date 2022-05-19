import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../../Sheard/Loader/Loader";
import SingleTodo from "../singleTodo/SingleTodo";

const Todo = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const {
    isLoading,
    data: todoData,
    refetch,
  } = useQuery("repoData", () =>
    fetch("https://aqueous-shore-62965.herokuapp.com/todos").then((res) =>
      res.json()
    )
  );

  //submit todo
  const onSubmit = (data) => {
    const title = data.title;
    const description = data.description;
    const checked = "no";
    const todo = { title, description, checked };
    fetch("https://aqueous-shore-62965.herokuapp.com/todos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        reset();
        toast.success("Successfully create your Todo!!");
      });
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
        fetch(`https://aqueous-shore-62965.herokuapp.com/todos/${id}`, {
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
    fetch(`https://aqueous-shore-62965.herokuapp.com/todos/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todoId),
    })
      .then((res) => res.json())
      .then((data) => refetch());
  };
  return (
    <div className="hero min-h-screen bg-base-200 shadow-2xl ">
      <div className="hero-content text-center mt-10">
        <div className="card md:w-[50vw] min-h-[100vh] bg-base-100 shadow-xl">
          <div className="card-body ">
            <h2 className="card-title mb-5 justify-center font-bold text-2xl text-primary">
              Add ToDo !!
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="input input-bordered input-primary w-full mb-5"
                {...register("title", { required: true })}
              />
              {errors.title?.type === "required" && (
                <p className="text-red-500 mb-5">Title field is required</p>
              )}
              <textarea
                name="description"
                className="textarea textarea-primary w-full mb-5"
                placeholder="Description"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-red-500 mb-5">
                  description field is required
                </p>
              )}
              <button type="submit" className="btn btn-primary text-white">
                ADD TODO
              </button>
            </form>
            <div className="my-10">
              <h2 className="text-center font-bold text-2xl text-primary mb-10">
                All ToDo List
              </h2>
              {[...todoData]?.reverse()?.map((todo) => (
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
