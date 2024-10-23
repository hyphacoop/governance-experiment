<script>
  import ParticipationGraph from './lib/ParticipationGraph.svelte';
  import VotesBarGraph from './lib/VotesBarGraph.svelte';
  import ProposalsTable from './lib/ProposalsTable.svelte';
  import LoadDecisions from './lib/LoadDecisions.svelte';
  import DecisionLog from './lib/DecisionLog.svelte';
  import { csvLoaded } from './stores';
  
  $: console.log(csvLoaded);
</script>

<main>
  <h1 class="text-left mb-6 mt-2 text-center md:text-left mb-12 md:mb-6 lg:mb-8">
    Governance Dashboard
  </h1>
  <div class="flex flex-col lg:flex-row lg:space-x-8">
    <ParticipationGraph />
    <VotesBarGraph />
  </div>
  
  <ProposalsTable />

  {#if !$csvLoaded}
    <LoadDecisions />
  {:else}
    <DecisionLog />
  {/if}

</main>

<style>
  
</style>
