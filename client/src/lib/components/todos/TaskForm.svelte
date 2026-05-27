<script>
    let {todoId} = $props();
    import { useTaskState } from "$lib/states/taskState.svelte.js";
    const taskState = useTaskState();

    const addTask = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const task = Object.fromEntries(formData);

        if (!formData.has("is_done")){
            task.is_done = false;
        } else {
            task.is_done = true;
        }

        taskState.addTask(todoId, task);
        
        e.target.reset();
    };
</script>

<form onsubmit={addTask}>
    <label>
        Task description
        <input type="text" name="description" />
    </label>
    <label>
        Is done
        <input type="checkbox"  name="is_done" />
    </label>
    <input type="submit" value="Add Task" />
</form>