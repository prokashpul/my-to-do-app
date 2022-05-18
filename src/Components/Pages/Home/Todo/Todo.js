import React, { useEffect, useState } from "react";

const Todo = () => {
  const [totoData, setTodoData] = useState([]);

  const handelSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.dis.value;
    const todo = { title, description };
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setTodoData({ title, description });
    e.target.title.value = "";
    e.target.dis.value = "";
  };
  console.log(totoData);
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

            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2>title</h2>
                <p>add</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
