import { writable } from 'svelte/store';
import Papa from 'papaparse';

export const decisionLogData = writable([]);
export const decisionLogLoaded = writable(false);

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
          decisionLogLoaded.set(true);
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

export const clearDecisionLog = () => {
  decisionLogData.set([]);  
  decisionLogLoaded.set(false);  
};
export const loadVoteData = async (csvFile) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      header: true,
      complete: (result) => {
        console.log("Raw CSV Data:", result.data);

        // Filter out rows with empty or undefined 'Response' fields
        const filterRawResponses = result.data.filter(row => row.Response && row.Response.trim() !== "");
        console.log("Filtered Responses (Non-empty):", filterRawResponses);

        // Create unique labels only for valid responses
        const uniqueResponses = Array.from(new Set(filterRawResponses.map(row => row.Response)));
        console.log("Unique Responses:", uniqueResponses);

        // Create a mapping from unique responses to letter labels (A, B, C, ...)
        const labelMapping = {};
        uniqueResponses.forEach((response, index) => {
          labelMapping[response] = String.fromCharCode(65 + index); // 65 is ASCII for 'A'
        });
        console.log("Label Mapping:", labelMapping);

        // Separate "Voted" count and filter proposals data
        let votedCountVal = 0;
        const filteredData = filterRawResponses.filter(row => {
          if (row.Response === "Voted") {
            votedCountVal = parseInt(row.Count, 10) || 0;
            return false; // Exclude "Voted" rows from proposals data
          }
          return true;
        });
        console.log("Filtered Proposal Data (Excluding 'Voted'):", filteredData);

        // Update `votedCount`
        votedCount.set(votedCountVal);
        console.log("Total 'Voted' Count:", votedCountVal);

        // Generate data for lineGraph and barChart using mapped letters
        const labels = filteredData.map(row => labelMapping[row.Response]);
        const values = filteredData.map(row => parseInt(row.Count, 10) || 0);
        console.log("Graph Labels:", labels);
        console.log("Graph Values:", values);

        lineGraphData.set({ labels, values });
        barChartData.set({ labels, values });

        // Prepare proposals data with valid rows
        proposalsData.set(filteredData.map((row) => ({
          vote: labelMapping[row.Response],
          proposal: labelMapping[row.Response],
          title: row.Response,
          count: parseInt(row.Count, 10) || 0
        })));
        console.log("Final Proposals Data:", filteredData);

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