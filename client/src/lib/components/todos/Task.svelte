<script>
    import { useTodoState } from '$lib/states/todoState.svelte.js';
    import { useTaskState } from '$lib/states/taskState.svelte.js';
    const todoState = useTodoState();
    const taskState = useTaskState();

    let { todoId, taskId } = $props();
    let todoName = $derived(todoState.todos.find(todo => todo.id === parseInt(todoId))?.name);
    let taskName = $derived(taskState.tasks[parseInt(todoId)]?.find(task => task.id === parseInt(taskId))?.description);
</script>

<h1>Todo {todoName}, task {taskName}</h1>