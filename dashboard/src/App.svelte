<script>
  // currently not using the LineGraph
  import LineGraph from './lib/LineGraph.svelte';

  import TotalVoters from './lib/TotalVoters.svelte';
  import BarGraph from './lib/BarGraph.svelte';
  import ProposalsTable from './lib/ProposalsTable.svelte';
  import LoadDecisions from './lib/LoadDecisions.svelte';
  import DecisionLog from './lib/DecisionLog.svelte';
  import { decisionLogLoaded, loadVoteData, clearVoteData, voteDataLoaded } from './stores';

  // Track loaded state for vote data
  let isVoteDataLoaded;
  $: voteDataLoaded.subscribe(value => isVoteDataLoaded = value);


  // Track loaded state for decision log
  let decisionLogLoadState;
  $: decisionLogLoaded.subscribe(value => decisionLogLoadState = value);

  // Handler for vote data file upload
  const handleVoteDataUpload = async (event) => {
    const file = event.target.files[0];
    if (file) await loadVoteData(file);
  };

  // Handler to clear vote data
  const handleClearVoteData = () => clearVoteData();
</script>

<main>
  <h1>Governance Dashboard</h1>

  <!-- Display Vote Data Graphs and Table if vote data is loaded -->
  {#if isVoteDataLoaded}
    <div class="flex flex-col lg:flex-row lg:space-x-7">
      <BarGraph />
      <TotalVoters />
    </div>
    <ProposalsTable />
    <button on:click={handleClearVoteData} class="bg-red-500 text-white px-4 py-2 rounded my-4">
      Clear Vote Data
    </button>
  {/if}

  <!-- Upload button for vote data CSV file (shown if not loaded) -->
  {#if !isVoteDataLoaded}
    <div class="my-4 flex flex-row border-2 border-purple rounded p-2">
      <label>
        <p class="text-left">Upload Vote Data CSV</p>
        <input type="file" accept=".csv" on:change={handleVoteDataUpload} />
      </label>
    </div>
  {/if}


    <!-- Load and display Decision Log as before -->
    {#if !decisionLogLoadState}
    <LoadDecisions />
  {:else}
    <DecisionLog />
  {/if}

</main>

<style>
  h1 {
    text-align: left;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
</style>
