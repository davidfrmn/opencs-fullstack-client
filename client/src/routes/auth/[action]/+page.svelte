<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { useAuthState } from "$lib/states/authState.svelte.js";

  let message = $state("");
  let errorMessage = $state("");
  let isLoading = $state(false);

  const authState = useAuthState();

  const handleForm = async (e) => {
    e.preventDefault();
    errorMessage = "";
    message = "";
    isLoading = true;

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      if (page.params.action === "login") {
        await authState.login(email, password);
        message = "Login successful! Redirecting...";
        setTimeout(() => goto("/"), 1000);
      } else {
        await authState.register(email, password);
        message = "Registration successful! You can now log in.";
        setTimeout(() => goto("/auth/login"), 2000);
      }
    } catch (error) {
      errorMessage = error.message;
    } finally {
      isLoading = false;
    }
  };
</script>

<h2>
  {page.params.action === "login" ? "Login" : "Register"}
</h2>

{#if message}
  <div>
    <p>{message}</p>
  </div>
{/if}

{#if errorMessage}
  <div>
    <p>{errorMessage}</p>
  </div>
{/if}

<form onsubmit={handleForm}>
  <label>
    <span>Email</span>
    <input
      id="email"
      name="email"
      type="email"
      placeholder="user@example.com"
      required
    />
  </label>
  <br />
  <label>
    <span>Password</span>
    <input
      id="password"
      name="password"
      type="password"
      placeholder="Enter your password"
      required
    />
  </label>
  <br />
  <button type="submit" disabled={isLoading}>
    {isLoading
      ? "Please wait..."
      : page.params.action === "login"
        ? "Login"
        : "Register"}
  </button>
</form>

{#if page.params.action === "login"}
  <p>
    Don't have an account? <a href="/auth/register">Register here</a>
  </p>
{:else}
  <p>
    Already have an account? <a href="/auth/login">Login here</a>
  </p>
{/if}