<script>
  import { proposalsData } from "../stores";

  let proposals;

  // Subscribe to the store data
  $: proposalsData.subscribe(data => {
    proposals = data;
  });
</script>

<div class="flex flex-col items-start component mt-2">
  <h2>
    Proposals
  </h2>
  <table class="w-full border-separate border-spacing-0 rounded-tl-lg my-4 flex flex-col items-start md:items-stretch">
    <thead class="md:w-full">
      <tr class="mb-2 flex flex-col md:flex-row rounded-lg thead items-start leading-4 py-2 justify-around">
          <th class="md:rounded-tl-lg md:rounded-bl-lg px-4 md:py-2 md:thead">ID</th> 
          <th class="px-4 md:py-2 md:thead">Title</th>
          <th class="rounded-tr-lg rounded-br-lg px-4 md:py-2 md:thead">Status</th>
      </tr>
    </thead>
    <tbody class="space-y-2 md:w-full">
      {#each proposals as proposal}
        <tr class="border-b border-gray-300 flex flex-col md:flex-row rounded-lg items-start proposals border-solid border-2 md:border-0 md:border-b-[3px] md:rounded-none justify-around">
          <td class="px-4 md:py-2">{proposal.id}</td>
          <td class="px-4 md:py-2">{proposal.title}</td>
          <td class="px-4 md:py-2">{proposal.status}</td>
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
  .proposals {
    border-color: #D9D9D9;
  }
  thead tr th {
    font-weight: bolder;
  }
</style>
