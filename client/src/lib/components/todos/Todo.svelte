<script>
    import TaskList from "$lib/components/todos/TaskList.svelte";
    import TaskForm from '$lib/components/todos/TaskForm.svelte';
    import { useTodoState } from '$lib/states/todoState.svelte.js';
    const todoState = useTodoState();
    let { todoId } = $props();
    let todoName = $derived(todoState.todos.find(todo => todo.id === parseInt(todoId))?.name);
</script>

<h1>Todo {todoName}</h1>
<TaskList todoId={todoId} />
<TaskForm {todoId}/>
