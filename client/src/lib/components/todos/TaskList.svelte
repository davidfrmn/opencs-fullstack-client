<script>
    import { useTaskState } from '$lib/states/taskState.svelte.js';
    let { todoId } = $props();
    const taskState  = useTaskState();
</script>

<ul>
{#each taskState.tasks[todoId] as task }
    {#if !task.is_done}
        <li>
            <a href="/todos/{todoId}/tasks/{task.id}">{task.description}</a>
            <button onclick={() => taskState.removeTask(todoId, task.id)}>Remove</button>
            <button onclick={() => taskState.toggleDone(todoId, task.id)}>Mark done</button>
        </li>
    {:else}
        <li>
            <s>{task.description}</s>
            <button onclick={() => taskState.toggleDone(todoId, task.id)}>Mark not done</button>
        </li>
    {/if}
{/each}
</ul>