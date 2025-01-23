<script>
  import { proposalsData, clearVoteData } from "../stores";
  let proposals;

  // Subscribe to the store data
  $: proposalsData.subscribe(data => {
    proposals = data;
  });

  // Handler to clear vote data
  const handleClearVoteData = () => clearVoteData();
</script>

<div class="flex flex-col items-start component">
  <h2>
    Proposals
  </h2>
  <table class="border-spacing-0 rounded-tl-lg my-4 table-auto w-full">
    <thead>
      <tr>
        <th class="px-4 py-2 text-left rounded-tl-lg rounded-bl-lg thead w-1/6">Label</th>
        <th class="px-4 py-2 text-left thead w-2/6">Proposal</th>
        <th class="px-4 py-2 text-left thead w-1/6">Votes</th>
      </tr>
    </thead>
    <tbody>
      {#each proposals as proposal}
        <tr class="border-b border-purple">
          <td class="px-4 py-2 text-left">{proposal.proposal}</td>
          <td class="px-4 py-2 text-left">{proposal.title}</td>
          <td class="px-4 py-2 text-left">{proposal.count}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <button on:click={handleClearVoteData} class="text-white px-4 py-2 rounded mt-4">
    Clear data
  </button>
</div>

<style>
  .thead {
    background-color: #D9D9D9;
    color: #000;
  }
  thead tr th {
    font-weight: bold;
  }
</style>
