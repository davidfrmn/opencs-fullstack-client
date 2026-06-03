<script>
    import { page } from "$app/state";
    import { initTask } from "$lib/states/taskState.svelte.js";
    import Task from "$lib/components/todos/Task.svelte";

    $effect(() => {
        initTask(page.params.todoId, page.params.taskId);
    });
</script>

<Task todoId={page.params.todoId} taskId={page.params.taskId} />
