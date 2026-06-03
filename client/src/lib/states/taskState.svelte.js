import { browser } from '$app/environment';
import * as tasksApi from "$lib/apis/tasksApi.js";

let taskState = $state({});

const initTasks = async (todoId) => {
    if (browser) {
        taskState[todoId] = await tasksApi.getTasks(todoId);
    }
};

const initTask = async (todoId, taskId) => {
    if (!browser) {
        return;
    }
    taskList = taskState[todoId] || [];
    const fetchedTask = await tasksApi.getTask(todoId, taskId);

    const index = taskList.findIndex((task) => task.id === fetchedTask.id);
    if (index !== -1) {
        taskList[index] = fetchedTask;
    } else {
        taskList.push(fetchedTask);
    }
    taskState[todoId] = taskList;
};

const useTaskState = () => {
    return {
        get tasks() {
            return taskState;
        },
        addTask: async (todoId, task) => {
            const newTask = await tasksApi.createTask(todoId, task);
            const taskList = taskState[todoId] || [];
            taskList.push(newTask);
            taskState[todoId] = taskList;
        },
        removeTask: async (todoId, taskId) => {
            const tasklist = taskState[todoId];
            if (tasklist) {
                const deletedTask = await tasksApi.deleteTask(todoId, taskId);
                taskState[todoId] = tasklist.filter((task) => task.id !== deletedTask.id);
            }
        },
        removeAllTasks: (todoId) => {
            // todosApi calls this function which deletes the todo
            // which will cascade, so here we only have to remove them from the state
            delete taskState[todoId];
        },
        toggleDone: async (todoId, taskId) => {
            const task = taskState[todoId].find(t => t.id === taskId);
            if (!task) {
                return;
            }
            task.is_done = !task.is_done;
            const modifiedTask = await tasksApi.updateTask(todoId, taskId, task);
        },
    };
};

export { initTasks, initTask, useTaskState };