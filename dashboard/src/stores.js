import { writable } from 'svelte/store';
import Papa from 'papaparse';

export const decisionLogData = writable([]);

export const csvLoaded = writable(false);

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
          csvLoaded.set(true);
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
  csvLoaded.set(false);  
};

export const participationData = writable({
  labels: ["A", "B", "C", "D", "E"],
  values: [3, 4, 2, 5, 6]
});

export const votesData = writable({
  labels: ["Proposal A", "Proposal B", "Proposal C"],
  values: [7, 6, 4]
});

export const proposalsData = writable([
  { id: 'A', title: 'Proposal A', status: 'Passed' },
  { id: 'B', title: 'Proposal B', status: 'Rejected' },
  { id: 'C', title: 'Proposal C', status: 'Ongoing' }
]);
