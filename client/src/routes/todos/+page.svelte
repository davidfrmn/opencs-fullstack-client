<script>
    import { initTodos } from '$lib/states/todoState.svelte.js'; 
    import TodoForm from '$lib/components/todos/TodoForm.svelte';
    import TodoList from "$lib/components/todos/TodoList.svelte";

    $effect(() => {
        initTodos();
    });
</script>


<TodoList />
<TodoForm />