<script>
    import { onMount } from "svelte";
    import { githubIssues } from "../stores"; 
    import { githubToken, logOutGithub, revokeGithubToken } from "../stores/auth";
    import GithubIssues from "./GithubIssues.svelte";

    // Determine logged-in state based on githubToken
    $: loggedIn = $githubToken !== null;

    let accessToken = null;
    let topDivClass = "my-4 flex flex-col border-2 border-purple rounded p-2 items-baseline"; // Default class
  
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI || "https://hyphacoop.github.io/governance-experiment/callback";
  
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&scope=read:org project repo`;

  
    function handleGitHubSignIn() {
      // Redirect to GitHub OAuth
      window.location.href = authUrl;
    }
  
    async function handleGitHubCallback() {
  // Extract "code" manually from the hash fragment
  const hash = window.location.hash.slice(1); // Remove the "#"
  const [path, queryString] = hash.split("?");
  const params = new URLSearchParams(queryString);
  const code = params.get("code");

  if (!code) {
    console.error("No authorization code found in URL.");
    return;
  }

  try {
    const response = await fetch(
      `https://ghauth.netlify.app/.netlify/functions/github-auth?action=getAccessToken&code=${code}`
    );

    const data = await response.json();

    if (data.access_token) {
      accessToken = data.access_token;
      githubToken.set(accessToken);
      sessionStorage.setItem("github_token", accessToken);
      console.log("GitHub Access Token:", accessToken);

      // Clean up the URL to remove hash and query params
      const newUrl = window.location.origin + "/governance-experiment/";
      window.history.replaceState({}, document.title, newUrl);

      fetchColumnCards();
    } else {
      console.error("Error exchanging code for token:", data);
    }
  } catch (error) {
    console.error("Error handling GitHub callback:", error);
  }
}


onMount(() => {
  const currentPath = window.location.hash.slice(1).split("?")[0];
  if (currentPath.startsWith("/governance-experiment/callback")) {
    handleGitHubCallback();
  }
});
async function fetchColumnCards() {
    try {
    let token = accessToken; 
    if (!token) {
      console.error("GitHub token is missing.");
      return;
    }

    const response = await fetch(`https://ghauth.netlify.app/.netlify/functions/github-auth?action=getColumnCards&token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });


    if (!response.ok) {
      if (response.status === 401) {
        console.error("Bad credentials. Token is invalid or expired.");
        logOutGithub(); // Clear token and session
        return;
      }
      throw new Error(`Failed to fetch column cards: ${response.status}`);
    }


    const data = await response.json();
    console.log("Fetched column cards:", data);

    // Update the store with the fetched issues
    githubIssues.set(data);
  } catch (error) {
    console.error("Error fetching column cards:", error);
  }
}

// Attach this to a button or logout event
async function handleLogout() {
    console.log("Logging out...");
    await revokeGithubToken(); // Revoke GitHub token
    logOutGithub(); // Clear local GitHub token state
}

  // Reactive statement to update class based on githubIssues length
  $: topDivClass = $githubIssues.length > 0 
      ? "my-4 flex flex-col border-2 border-purple rounded p-2 items-baseline component" 
      : "my-4 flex flex-col border-2 border-purple rounded p-2 items-baseline";


</script>
  
  
  <div class={topDivClass}>
    <h2 class="text-left">Provide feedback</h2>
    {#if loggedIn}
      {#if $githubIssues.length > 0}
        <GithubIssues />
      {:else}
        <p>Loading issues...</p>
      {/if}
      <button on:click={handleLogout} class="text-white px-4 py-2 rounded mt-4 ml-2">
        Sign out
      </button>
    {:else}
      <button class="signin" on:click={handleGitHubSignIn}>Sign in with GitHub</button>
    {/if}
  </div>
  <style>
  button.signin {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 0px;
    border: 1px solid #000;
    background-color: #f5f5f5;
    margin: 2rem 0;
  }

  button.signin:hover {
    background-color: black;
    color: white;
  }

  .component {
  border: 2px dotted #000;
}
</style>