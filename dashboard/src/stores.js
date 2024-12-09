import * as Earthstar from "earthstar";
import { ReplicaDriverWeb } from "earthstar/browser";

import { writable } from 'svelte/store';
import Papa from 'papaparse';

export const decisionLogData = writable([]);
export const isDecisionLogLoaded = writable(false);

// State for the vote-related data (lineGraph, barChart, and proposals)
export const voteDataLoaded = writable(false);
export const votedCount = writable(0);


export const lineGraphData = writable({
  labels: ["A", "B", "C", "D", "E"],
  values: [3, 4, 2, 5, 6]
});

export const barChartData = writable({
  labels: ["Proposal A", "Proposal B", "Proposal C"],
  values: [7, 6, 4]
});

export const proposalsData = writable([
  { vote: "-", proposal: '-', title: 'Placeholder Proposal 1', count: 0 },
  { vote: "-", proposal: '-', title: 'Placeholder Proposal 2', count: 0 }
]);


export const loadDecisionLog = async (csvFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      // Get the file content as a string
      const fileContent = event.target.result;

      // Split the content by new lines and remove the first 3 lines
      const validContent = fileContent.split('\n').slice(3).join('\n');

      // Now pass the remaining content to Papa.parse
      Papa.parse(validContent, {
        header: true,
        complete: (result) => {
          decisionLogData.set(result.data);
          isDecisionLogLoaded.set(true);
          resolve(result.data);
        },
        error: (error) => reject(error)
      });
    };

    reader.onerror = (error) => reject(error);

    // Read the file content as text
    reader.readAsText(csvFile);
  });
};
export const loadDecisionLogFromApi = (apiResponse) => {
  return new Promise((resolve, reject) => {
    try {
      if (!apiResponse || !apiResponse.values || apiResponse.values.length < 4) {
        throw new Error('Invalid or insufficient data in API response.');
      }

      // Extract headers from the 4th row (index 3)
      const headers = apiResponse.values[3];
      if (!headers || headers.length === 0) {
        throw new Error('No headers found in the specified row.');
      }

      // Normalize headers (trim, lowercase, replace spaces and special characters with underscores)
      const normalizedHeaders = headers.map((header, index) => {
        if (!header || typeof header !== 'string') {
          console.warn(`Header at index ${index} is invalid:`, header);
          return `column_${index}`; // Default to generic column name
        }
        return header
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '_') // Replace spaces with underscores
          .replace(/[^a-z0-9_]/g, ''); // Remove special characters
      });

      // Extract data rows starting from the 5th row (index 4)
      const dataRows = apiResponse.values.slice(4);

      // Map rows to objects using headers, filtering out empty rows
      const parsedData = dataRows
        .filter((row) => 
          row && 
          row.some((cell) => cell && cell.trim() !== '') && // Exclude rows with all empty cells
          row[normalizedHeaders.indexOf('date')] && // Ensure `date` is not empty
          row[normalizedHeaders.indexOf('short_title')] // Ensure `short_title` is not empty
        )
        .map((row) =>
          normalizedHeaders.reduce((acc, key, index) => {
            acc[key] = row[index] || ''; // Assign value or empty string
            return acc;
          }, {})
        );

      
      // Retrieve the current data from the store
      let currentData = [];
      decisionLogData.subscribe(data => {
        currentData = data;
      })();

      // Append the new data to the existing data
      const combinedData = [...currentData, ...parsedData];
      // Update the store
      decisionLogData.set(combinedData);
      isDecisionLogLoaded.set(true);

      resolve(combinedData);
    } catch (error) {
      console.error('Error loading decision log from API response:', error);
      reject(error);
    }
  });
};


export const clearDecisionLog = () => {
  decisionLogData.set([]);  
  isDecisionLogLoaded.set(false);  
};
export const loadVoteData = async (csvFile) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      header: true,
      complete: (result) => {

        // Filter out rows with empty or undefined 'Response' fields
        const filterRawResponses = result.data.filter(row => row.Response && row.Response.trim() !== "");

        // Create unique labels only for valid responses
        const uniqueResponses = Array.from(new Set(filterRawResponses.map(row => row.Response)));

        // Create a mapping from unique responses to letter labels (A, B, C, ...)
        const labelMapping = {};
        uniqueResponses.forEach((response, index) => {
          labelMapping[response] = String.fromCharCode(65 + index); // 65 is ASCII for 'A'
        });

        // Separate "Voted" count and filter proposals data
        let votedCountVal = 0;
        const filteredData = filterRawResponses.filter(row => {
          if (row.Response === "Voted") {
            votedCountVal = parseInt(row.Count, 10) || 0;
            return false; // Exclude "Voted" rows from proposals data
          }
          return true;
        });

        // Update `votedCount`
        votedCount.set(votedCountVal);

        // Generate data for lineGraph and barChart using mapped letters
        const labels = filteredData.map(row => labelMapping[row.Response]);
        const values = filteredData.map(row => parseInt(row.Count, 10) || 0);

        lineGraphData.set({ labels, values });
        barChartData.set({ labels, values });

        // Prepare proposals data with valid rows
        proposalsData.set(filteredData.map((row) => ({
          vote: labelMapping[row.Response],
          proposal: labelMapping[row.Response],
          title: row.Response,
          count: parseInt(row.Count, 10) || 0
        })));

        voteDataLoaded.set(true);
        resolve();
      },
      error: (error) => {
        console.error("Error Parsing CSV:", error);
        reject(error);
      }
    });
  });
};


// Function to clear the Vote Data
export const clearVoteData = () => {
  lineGraphData.set({
    labels: ["Placeholder 1", "Placeholder 2", "Placeholder 3"],
    values: [0, 0, 0]
  });

  barChartData.set({
    labels: ["Placeholder A", "Placeholder B"],
    values: [0, 0]
  });

  proposalsData.set([
    { vote: "-", proposal: '-', title: 'Placeholder Proposal 1', count: 0 },
    { vote: "-", proposal: '-', title: 'Placeholder Proposal 2', count: 0}
  ]);

  votedCount.set(0);
  voteDataLoaded.set(false);
};

export const processVoteResults = (documents) => {
  const voteCounts = {};
  const voters = documents.filter(doc => doc.text === "Voted");
  const proposals = documents.filter(doc => doc.text !== "Voted");

  proposals.forEach(doc => {
    const vote = doc.text;
    voteCounts[vote] = (voteCounts[vote] || 0) + 1;
  });

  const labels = Object.keys(voteCounts).map((_, index) => String.fromCharCode(65 + index)); // 65 is ASCII for 'A'
  const values = Object.values(voteCounts);

  lineGraphData.set({ labels, values });
  barChartData.set({ labels, values });

  proposalsData.set(labels.map((label, index) => ({
    vote: label,
    proposal: label,
    title: Object.keys(voteCounts)[index],
    count: values[index]
  })));

  votedCount.set(voters.length);
  voteDataLoaded.set(true);
};

const settings = new Earthstar.SharedSettings();

const shareKeypair = {
  address: import.meta.env.VITE_ADDRESS,
  secret: import.meta.env.VITE_SECRET,
};

settings.addShare(shareKeypair.address);
settings.addSecret(shareKeypair.address, shareKeypair.secret);

export const replica = new Earthstar.Replica({
  driver: new ReplicaDriverWeb(shareKeypair.address),
  shareSecret: shareKeypair.secret,
});

export default settings;