<script>
  import ParticipationGraph from './lib/ParticipationGraph.svelte';
  import VotesBarGraph from './lib/VotesBarGraph.svelte';
  import ProposalsTable from './lib/ProposalsTable.svelte';
  
</script>

<main>
  <h1 class="text-left">
    Governance Dashboard
  </h1>
  <div class="flex flex-col lg:flex-col">
    <ParticipationGraph />
    <VotesBarGraph />
  </div>
  
  <ProposalsTable />
  
</main>

<style>
  
</style>
