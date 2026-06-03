import { PUBLIC_API_URL } from "$env/static/public";

const BASE_URL = `${PUBLIC_API_URL}/api/todos`;

const getTodos = async () => {
    const res = await fetch(
        `${BASE_URL}`
    );
    return await res.json();
};


const getTodo = async (todoId) => {
    const res = await fetch(
        `${BASE_URL}/${todoId}`
    );
    return await res.json();
};


const createTodo = async (todo) => {
    const res = await fetch(
        `${BASE_URL}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        }
    );
    return await res.json();
};


const updateTodo = async (todoId, todo) => {
    const res = await fetch(
        `${BASE_URL}/${todoId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        }
    );
    return await res.json();
};


const deleteTodo = async (todoId) => {
    const res = await fetch(
        `${BASE_URL}/${todoId}`,
        {
            method: "DELETE",
        }
    );
    return await res.json();
};



export { getTodos, getTodo, createTodo, updateTodo, deleteTodo };