<script>
    import { useTodoState } from '$lib/states/todoState.svelte.js';
    const todoState = useTodoState();
</script>

<h1>Todos</h1>
<ul>
{#each todoState.todos as todo}
    <li>
        <a href="/todos/{todo.id}">{todo.name}</a>
        <button onclick={() => todoState.removeTodo(todo.id)}>Remove</button>
    </li>
{/each}
</ul>
