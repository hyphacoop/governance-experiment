<script>
  import { loadDecisionLogFromApi } from '../stores';

  let accessToken = null;

  let spreadsheetIDs = {
    'governance experiment': import.meta.env.VITE_GOOGLE_SPREADSHEET_ID2,
    'decision log':  import.meta.env.VITE_GOOGLE_SPREADSHEET_ID,
  }

  function handleSignInClick() {
    // Initialize and request access token when the button is clicked
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
      callback: handleTokenResponse,
    });

    tokenClient.requestAccessToken();
  }

  function handleTokenResponse(response) {
    if (response.error) {
      console.error('Error fetching access token:', response.error);
      return;
    }

    accessToken = response.access_token;

    // Fetch spreadsheets after acquiring the access token

    // For each spreadsheet ID, fetch it decisions data
    for (const [key, value] of Object.entries(spreadsheetIDs)) {
      fetchSpreadsheetData(value);
    }
  }

  async function fetchSpreadsheetData(spreadsheetId) {
    const sheetName = "Member + WG resolutions";
    const range = `${sheetName}!A1:Z1000`;

    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to fetch spreadsheet data: ${response.status} - ${data.error.message}`);
      }

      if (!data.values) {
        console.error('No data found in spreadsheet.');
        return;
      }

      await loadDecisionLogFromApi(data);
    } catch (error) {
      console.error('Error fetching spreadsheet data:', error);
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
</style>
