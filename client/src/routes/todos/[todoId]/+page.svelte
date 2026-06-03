<script>
    import { page } from "$app/state";
    import { initTodo } from "$lib/states/todoState.svelte.js";
    import { initTasks } from "$lib/states/taskState.svelte.js";
    import Todo from "$lib/components/todos/Todo.svelte";

    $effect(() => {
        initTodo(page.params.todoId);
        initTasks(page.params.todoId);
    });
</script>

<Todo todoId={page.params.todoId} />