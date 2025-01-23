<script>
  import { googleToken } from "../stores/auth";
  import { fetchDecisionLog } from "../stores/utils";
  import { demoMode, loadDecisionLogFromApi, isDecisionLogLoaded, googleSpreadsheetIDs } from "../stores";

  let isLogLoaded;
  let accessToken = null;
  $: accessToken = $googleToken;

  function handleSignInClick() {
    demoMode.set(false); // Disable demo mode
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
      callback: handleTokenResponse,
    });

    tokenClient.requestAccessToken();
  }

  async function handleTokenResponse(response) {
    console.log("Token response received:", response);
    if (response.error) {
      console.error("Error fetching access token:", response.error);
      return;
    }
    console.log("Setting token in store...");
    googleToken.set(response.access_token); // Save token to store

    try {

      isLogLoaded = $isDecisionLogLoaded;
      if (isLogLoaded) {
        console.log("Decision log is already loaded. Skipping API fetch.");
        return;
      }
      const decisionLogData = await fetchDecisionLog(googleSpreadsheetIDs, response.access_token);
    } catch (error) {
      console.error("Error loading decision log:", error);
    }
  }
</script>

<button id="googleSignInButton" on:click={handleSignInClick}>
    Sign in to Google
</button>

<style>
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 0px;
    border: 1px solid #000;
    background-color: #f5f5f5;
    margin: 2rem 0;
  }

  button:hover {
    background-color: black;
    color: white;
  }

  button:disabled {
    background-color: #ddd;
    color: #666;
    cursor: not-allowed;
  }
</style>
