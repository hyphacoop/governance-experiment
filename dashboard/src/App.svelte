<script>
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import GithubAuth from "./lib/GithubAuth.svelte";
  import DecisionLog from "./lib/DecisionLog.svelte";
  import LoadDecisions from "./lib/LoadDecisions.svelte";
  import TotalVoters from "./lib/TotalVoters.svelte";
  import BarGraph from "./lib/BarGraph.svelte";
  import ProposalsTable from "./lib/ProposalsTable.svelte";

  import Demo from "./lib/Demo.svelte";
  import { googleToken, validateGoogleToken } from "./stores/auth";
  import { fetchDecisionLog } from "./stores/utils";
  import { demoMode, isDecisionLogLoaded, voteDataLoaded, loadDecisionLogFromApi, googleSpreadsheetIDs, githubIssues } from "./stores";
    import GithubIssues from "./lib/GithubIssues.svelte";

  // Track Github connection state
  let githubConnected;

  // Track loaded state for vote data
  let isVoteDataLoaded;
  $: voteDataLoaded.subscribe((value) => (isVoteDataLoaded = value));

  // Track loaded state for decision log
  let decisionLogLoadState;
  $: isDecisionLogLoaded.subscribe((value) => (decisionLogLoadState = value));

  // Reactive value for Google token
  let googleAccessToken;
  $: googleAccessToken = $googleToken;

  // Auto-validate Google token
  async function validateAndLoadDecisionLog() {
    const isLogLoaded = get(isDecisionLogLoaded);
        if (isLogLoaded) {
          console.log("Decision log is already loaded. Skipping API fetch.");
          decisionLogLoadState = true;
          return;
        } else {
          console.log("Decision log is not loaded. Fetching from API...");
        }
        if (googleAccessToken) {
          const isValid = await validateGoogleToken(googleAccessToken);
          if (isValid) {
            console.log("Google token is valid. Fetching decision log...");
            try {
              const decisionLogData = await fetchDecisionLog(googleSpreadsheetIDs, googleAccessToken);
              if (decisionLogData) {
                await loadDecisionLogFromApi(decisionLogData);
                decisionLogLoadState = true;
              }
            } catch (error) {
              console.error("Error loading decision log:", error);
            }
          } else {
            console.log("Google token is invalid. Please sign in again.");  
          }
        }
    }

  onMount(() => {
    githubIssues.set([]); // Clear GitHub issues
    // Validate and load decision log data
    validateAndLoadDecisionLog();
    // Reset demo mode
    $demoMode = false;
  });
</script>

<main>
  <h1>Governance Dashboard</h1>
  {#if !$isDecisionLogLoaded }
    <Demo />
  {/if}

     <!-- Show GitHub issues only if connected or in demo mode -->
    {#if $demoMode}
      <GithubIssues />
    {:else if githubConnected}
      <GithubIssues />
    {:else}
      <GithubAuth />
    {/if}
  {#if decisionLogLoadState}
    <DecisionLog />
    <!-- Display Vote Data Graphs and Table if vote data is loaded -->
  {:else}
    <LoadDecisions />
  {/if}
  {#if isVoteDataLoaded}
  <div class="flex flex-col lg:flex-row lg:space-x-7">
    <BarGraph />
    <TotalVoters />
  </div>
  <ProposalsTable />
{/if}
</main>

<style>
  h1 {
    text-align: left;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
</style>
