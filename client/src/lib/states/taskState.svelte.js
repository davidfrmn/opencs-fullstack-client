import { browser } from '$app/environment';

const KEY = "tasks";
let initial_tasks = {};

if (browser && localStorage.getItem(KEY) !== null) {
    initial_tasks = JSON.parse(localStorage.getItem(KEY));
}

let taskState = $state(initial_tasks);

const saveTasks = () => {
    if (browser) {
        localStorage.setItem(KEY, JSON.stringify(taskState));
    }
};

const useTaskState = () => {
    return {
        get tasks() {
            return taskState;
        },
        addTask: (todoId, task) => {
            if (!taskState[todoId]) {
                taskState[todoId] = [];
            }
            const tasklist = taskState[todoId];
            task.todo_id = todoId;
            task.id = tasklist.length > 0 ? Math.max(...tasklist.map(t => t.id)) + 1 : 1;
            taskState[todoId].push(task);
            saveTasks();
        },
        removeTask: (todoId, taskId) => {
            const tasklist = taskState[todoId];
            if (tasklist) {
                taskState[todoId] = tasklist.filter((task) => task.id !== taskId);
                saveTasks();
            }
        },
        removeAllTasks: (todoId) => {
            delete taskState[todoId];
            saveTasks();
        },
        toggleDone: (todoId, taskId) => {
            let alteredTaskState = taskState[todoId];
            for (let index = 0; index < alteredTaskState.length; index++) {
                if (alteredTaskState[index].id === taskId) {
                    alteredTaskState[index].is_done = !alteredTaskState[index].is_done;
                    break;
                }
            }
            taskState[todoId] = alteredTaskState;
            saveTasks();
        },
    };
};

export { useTaskState };