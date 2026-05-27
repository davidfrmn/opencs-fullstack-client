import { browser } from '$app/environment';
import { useTaskState } from '$lib/states/taskState.svelte';

const KEY = "todos";
let initial_todos = [];

if (browser && localStorage.getItem(KEY) !== null) {
    initial_todos = JSON.parse(localStorage.getItem(KEY));
}

let todoState = $state(initial_todos);
let taskState = useTaskState();


const saveTodos = () => {
    if (browser) {
        localStorage.setItem(KEY, JSON.stringify(todoState));
    }
};

const useTodoState = () => {
    return {
        get todos() {
            return todoState;
        },
        addTodo: (todo) => {
            todo.id = todoState.length > 0 ? Math.max(...todoState.map(t => t.id)) + 1 : 1;
            todoState.push(todo);
            saveTodos();
        },
        removeTodo: (id) => {
            todoState = todoState.filter((todo) => todo.id !== id);
            taskState.removeAllTasks(id);
            saveTodos();
        },
    };
};

export { useTodoState };