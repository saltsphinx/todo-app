import { useState, useEffect } from "react";
import Todo from "../components/Todo.jsx";

export default function TodoPage() {
  const [todos, setTodos] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    const data = await fetch("http://localhost:3040/todos");
    if (!data.ok) {
      throw new Error(data.status);
    }

    const json = await data.json();
    setTodos(json);
  };

  const handleDelete = async (id) => {
    const data = await fetch("http://localhost:3040/todos/" + id, {
      method: "DELETE",
    });
    if (!data.ok) {
      throw new Error(data.status);
    }

    fetchTodos();
  };

  const handleUpdate = async (todo) => {
    const data = await fetch("http://localhost:3040/todos/" + todo.id, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" },
    });
    if (!data.ok) {
      throw new Error(data.status);
    }

    fetchTodos();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch("http://localhost:3040/todos", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetchTodos();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        await fetchTodos();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>An error was encountered!</p>;
  }

  return (
    <section>
      <form onSubmit={handleSubmit} className="mb-2">
        <input
          name="description"
          type="text"
          placeholder="add description..."
          className="mb-2"
        />
        <button className="btn btn-primary d-block" type="submit">
          ADD
        </button>
      </form>
      <div className="bg-secondary bg-gradient bg-opacity-25 p-2 rounded-2">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            todo={todo}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
      </div>
    </section>
  );
}
