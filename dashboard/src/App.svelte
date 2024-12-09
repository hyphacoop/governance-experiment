<script>
  // currently not using the LineGraph
  //import LineGraph from "./lib/LineGraph.svelte";

  import TotalVoters from "./lib/TotalVoters.svelte";
  import BarGraph from "./lib/BarGraph.svelte";
  import ProposalsTable from "./lib/ProposalsTable.svelte";
  import LoadDecisions from "./lib/LoadDecisions.svelte";
  import DecisionLog from "./lib/DecisionLog.svelte";

  import { isDecisionLogLoaded, loadVoteData, voteDataLoaded } from "./stores";

  // Track loaded state for vote data
  let isVoteDataLoaded;
  $: voteDataLoaded.subscribe((value) => (isVoteDataLoaded = value));

  // Track loaded state for decision log
  let decisionLogLoadState;
  $: isDecisionLogLoaded.subscribe((value) => (decisionLogLoadState = value));

  // Handler for vote data file upload
  const handleVoteDataUpload = async (event) => {
    const file = event.target.files[0];
    if (file) await loadVoteData(file);
  };
</script>

<main>
  <h1>Governance Dashboard</h1>

  <!-- Display or Load decision log data -->
  {#if decisionLogLoadState}
    <DecisionLog />
    <!-- Display Vote Data Graphs and Table if vote data is loaded -->
    {#if isVoteDataLoaded}
      <div class="flex flex-col lg:flex-row lg:space-x-7">
        <BarGraph />
        <!-- Hiding LineGraph until it serves a purpose other than showing results -->
        <!-- 
        <LineGraph />
      -->
        <TotalVoters />
      </div>
      <ProposalsTable />
    {/if}
  {:else}
    <LoadDecisions />
  {/if}
</main>

<style>
  h1 {
    text-align: left;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
</style>
