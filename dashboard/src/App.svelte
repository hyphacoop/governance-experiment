<script>
  // currently not using the LineGraph
  import LineGraph from './lib/LineGraph.svelte';

  import TotalVoters from './lib/TotalVoters.svelte';
  import BarGraph from './lib/BarGraph.svelte';
  import ProposalsTable from './lib/ProposalsTable.svelte';
  import LoadDecisions from './lib/LoadDecisions.svelte';
  import DecisionLog from './lib/DecisionLog.svelte';

  import { isDecisionLogLoaded, decisionLogData, loadVoteData, clearVoteData, voteDataLoaded } from './stores';

  // Track loaded state for vote data
  let isVoteDataLoaded;
  $: voteDataLoaded.subscribe(value => isVoteDataLoaded = value);


  // Track loaded state for decision log
  let decisionLogLoadState;
  $: isDecisionLogLoaded.subscribe(value => decisionLogLoadState = value);

  // Handler for vote data file upload
  const handleVoteDataUpload = async (event) => {
    const file = event.target.files[0];
    if (file) await loadVoteData(file);
  };
</script>

<main>
  <h1>Governance Dashboard</h1>

  <!-- Display Vote Data Graphs and Table if vote data is loaded -->
  {#if decisionLogLoadState}
    <DecisionLog />
   
  {:else}

    <LoadDecisions />
  <!--

     <div class="flex flex-col lg:flex-row lg:space-x-7">
      <BarGraph />
      <TotalVoters />
    </div>
    <ProposalsTable />
    <div class="my-4 flex flex-col border-2 border-purple rounded p-2 items-baseline">
      <h2 class="text-left">Vote Results</h2>
      <br>
      <label>
        <p class="text-left purple">Load CSV</p>
        <input type="file" accept=".csv" on:change={handleVoteDataUpload} />
      </label>
    </div>
    -->
  {/if}


</main>

<style>
  h1 {
    text-align: left;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
</style>
