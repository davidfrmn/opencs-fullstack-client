<script>
  import { useAuthState } from "$lib/states/authState.svelte.js";
  const authState = useAuthState();
</script>

{#if authState.token }
    <a href="/todos">Go to your todos</a>
{/if}