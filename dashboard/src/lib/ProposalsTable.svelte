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
  <table class="w-full border-separate border-spacing-0 rounded-tl-lg mt-4">
    <thead>
      <tr>
          <th class="rounded-tl-lg rounded-bl-lg px-4 py-2 thead">ID</th> 
          <th class="px-4 py-2 thead">Title</th>
          <th class="rounded-tr-lg rounded-br-lg px-4 py-2 thead">Status</th>
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
  .thead {
    background-color: #D9D9D9;
    color: #000;
  }
</style>
