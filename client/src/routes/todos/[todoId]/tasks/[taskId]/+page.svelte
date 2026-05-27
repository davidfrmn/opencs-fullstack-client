<script>
    import { page } from "$app/state";
    import Task from "$lib/components/todos/Task.svelte";
</script>

<Task todoId={page.params.todoId} taskId={page.params.taskId} />
