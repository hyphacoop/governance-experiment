import { loadDecisionLogFromApi } from "../stores";

// Function to fetch spreadsheet data
export async function fetchSpreadsheetData(spreadsheetId, accessToken) {
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
        throw new Error(
          `Failed to fetch spreadsheet data: ${response.status} - ${data.error.message}`
        );
      }
  
      if (!data.values) {
        console.error("No data found in spreadsheet.");
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error fetching spreadsheet data:", error);
      throw error;
    }
  }
  
  // Function to fetch decision log
  export async function fetchDecisionLog(spreadsheetIDs, accessToken) {
    const allData = [];
  
    for (const spreadsheetId of Object.values(spreadsheetIDs)) {
      try {
        const data = await fetchSpreadsheetData(spreadsheetId, accessToken);
        if (data) {      
                console.log("Loading decision log data into store...");
                await loadDecisionLogFromApi(data);
              }
      } catch (error) {
        console.error("Error fetching data for spreadsheet ID:", spreadsheetId, error);
      }
    }
  
    return allData;
  }