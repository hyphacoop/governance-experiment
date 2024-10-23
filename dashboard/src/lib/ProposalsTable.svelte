<script>
  import { proposalsData } from "../stores";

  let proposals;

  // Subscribe to the store data
  $: proposalsData.subscribe(data => {
    proposals = data;
  });
</script>

<div class="flex flex-col items-start component">
  <h2>
    Proposals
  </h2>
  <table class="w-full border-separate border-spacing-0 rounded-tl-lg">
    <thead class="theader">
      <tr>
        <div>
        <th class="rounded-tl-lg px-4 py-2">ID</th>  <!-- Top-left corner rounded -->
        <th class="px-4 py-2">Title</th>
        <th class="rounded-tr-lg px-4 py-2">Status</th> <!-- Top-right corner rounded -->
      </div>
      </tr>
    </thead>
    <tbody>
      {#each proposals as proposal}
        <tr class="border-b border-gray-300">
          <td class="px-4 py-2">{proposal.id}</td>
          <td class="px-4 py-2">{proposal.title}</td>
          <td class="px-4 py-2">{proposal.status}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .theader {
    background-color: #D9D9D9;
    color: #000;
  }
</style>
