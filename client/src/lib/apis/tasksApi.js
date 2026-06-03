import { PUBLIC_API_URL } from "$env/static/public";

const BASE_URL = `${PUBLIC_API_URL}/api/todos`;

const getTasks = async (todoId) => {
    const res = await fetch(
        `${BASE_URL}/${todoId}/tasks`
    );
    return await res.json();
};


const getTask = async (todoId, taskId) => {
    const res = await fetch(
        `${BASE_URL}/${todoId}/tasks/${taskId}`
    );
    return await res.json();
};


const createTask = async (todoId, task) => {
    const res = await fetch(
        `${BASE_URL}/${todoId}/tasks`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        }
    );
    return await res.json();
};


const updateTask = async (todoId, taskId, task) => {
    const res = await fetch(
        `${BASE_URL}/${todoId}/tasks/${taskId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        }
    );
    return await res.json();
};


const deleteTask = async (todoId, taskId) => {
    const res = await fetch(
        `${BASE_URL}/${todoId}/tasks/${taskId}`,
        {
            method: "DELETE",
        }
    );
    return await res.json();
};



export { getTasks, getTask, createTask, updateTask, deleteTask };