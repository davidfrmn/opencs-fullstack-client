import { browser } from '$app/environment';
import * as todosApi from '$lib/apis/todosApi.js';
import { useTaskState } from '$lib/states/taskState.svelte.js';

let todoState = $state([]);
let taskState = useTaskState();


const initTodos = async () => {
    if (browser) {
        todoState = await todosApi.getTodos();
    }
};

const initTodo = async (id) => {
    if (!browser) {
        return;
    }

    const fetchedTodo = await todosApi.getTodo(id);
    const index = todoState.findIndex((todo) => todo.id === fetchedTodo.id);
    if (index !== -1) {
        todoState[index] = fetchedTodo;
    } else {
        todoState.push(fetchedTodo)
    }
};

const useTodoState = () => {
    return {
        get todos() {
            return todoState;
        },
        addTodo: async (todo) => {
            const newTodo = await todosApi.createTodo(todo);
            todoState.push(newTodo);
        },
        removeTodo: async (id) => {
            const removedTodo = await todosApi.deleteTodo(id); 
            todoState = todoState.filter((todo) => todo.id !== removedTodo.id);
            taskState.removeAllTasks(removedTodo.id);
        },
        updateTodo: async (id, todo) => {
            const updatedTodo = await todosApi.updateTodo(id, todo);
            const index = todoState.findIndex((todo) => todo.id === updatedTodo.id);
            if (index !== -1) {
                todoState[index] = updatedTodo;
            }
        },
    };
};

export { initTodos, initTodo, useTodoState };