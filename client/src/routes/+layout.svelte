<script>
  import { useAuthState } from "$lib/states/authState.svelte.js";
  let { children } = $props();
  const authState = useAuthState();
</script>

<header>
  {#if authState.user}
    <div>
      <span>
        Hello, {authState.user.email}!
        {#if authState.user.roles?.length}
          (Roles: {authState.user.roles.join(", ")})
        {/if}
      </span>

      {#if authState.user.roles?.includes("ADMIN")}
        <ul>
          <li><a href="/admin">Admin</a></li>
        </ul>
      {/if}

      <button onclick={() => authState.logout()}>Logout</button>
    </div>
  {:else}
    <span>Hello anonymous!</span>
    <ul>
      <li><a href="/auth/login">Login</a></li>
      <li><a href="/auth/register">Register</a></li>
    </ul>
  {/if}
</header>

<main>
  {@render children()}
</main>