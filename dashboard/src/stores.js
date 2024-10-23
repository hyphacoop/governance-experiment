import { writable } from 'svelte/store';

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
