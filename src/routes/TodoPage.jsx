import { useState, useEffect } from "react";

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
    }

    const handleDelete = async (id) => {
        const data = await fetch("http://localhost:3040/todos/" + id, {method: "DELETE"});
        if (!data.ok) {
            throw new Error(data.status);
        }

        fetchTodos();
    };

    const handleUpdate = async (todo) => {
        console.log(todo);
        
        const data = await fetch("http://localhost:3040/todos/" + todo.id, { method: "PUT", body: todo });
        if (!data.ok) {
            throw new Error(data.status);
        }

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
        return <p>loading...</p>
    }

    if (error) {
        return <p>An error was encountered!</p>
    }

    return (
        <section>
            {
                todos.map(todo => <TodoComponent key={todo.id} {...todo} todo={todo} handleDelete={handleDelete} handleUpdate={handleUpdate}/>)
            }
        </section>
    )
}

function TodoComponent({ id, description, is_complete, todo, handleDelete, handleUpdate }) {
    const [isComplete, setIsComplete] = useState(is_complete);

    return (
        <div className="todo">
            <input onClick={() => {handleUpdate({...todo, is_complete: !is_complete})}}type="checkbox" value={is_complete}/>
            <p>{description}</p>
            <input onClick={() => handleDelete(id)} type="button" value="Delete" />
            <input type="button" value="edit" />
        </div>
    );
}