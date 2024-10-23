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
  <table class="w-full border-spacing-0 rounded-tl-lg my-4 table-auto">
    <thead>
      <tr>
        <th class="px-4 py-2 text-left rounded-tl-lg rounded-bl-lg thead">ID</th>
        <th class="px-4 py-2 text-left thead">Title</th>
        <th class="px-4 py-2 text-left rounded-tr-lg rounded-br-lg thead">Status</th>
      </tr>
    </thead>
    <tbody>
      {#each proposals as proposal}
        <tr class="border-b border-gray-300">
          <td class="px-4 py-2 text-left">{proposal.id}</td>
          <td class="px-4 py-2 text-left">{proposal.title}</td>
          <td class="px-4 py-2 text-left">{proposal.status}</td>
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
  thead tr th {
    font-weight: bolder;
  }
</style>
