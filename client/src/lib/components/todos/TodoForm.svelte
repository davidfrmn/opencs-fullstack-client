<script>
    import { useTodoState } from '$lib/states/todoState.svelte.js';
    const { addTodo } = useTodoState();

    const handleAdd = (e) => {
        e.preventDefault();

        const todo = Object.fromEntries(new FormData(e.target));
        addTodo(todo);
        
        e.target.reset();
    };
</script>

<form onsubmit={handleAdd}>
    <label>
        Todo name
        <input type="text" name="name" />
    </label>
    <input type="submit" value="Add Todo">
</form>