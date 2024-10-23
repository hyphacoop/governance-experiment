<script>
  import ParticipationGraph from './lib/ParticipationGraph.svelte';
  import VotesBarGraph from './lib/VotesBarGraph.svelte';
  import ProposalsTable from './lib/ProposalsTable.svelte';
  
</script>

<main>
  <h1 class="text-left mb-6 mt-2 text-center md:text-left">
    Governance Dashboard
  </h1>
  <div class="flex flex-col lg:flex-row lg:space-x-8">
    <ParticipationGraph />
    <VotesBarGraph />
  </div>
  
  <ProposalsTable />
  
</main>

<style>
  
</style>
