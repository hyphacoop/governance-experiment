<script>
    import { decisionLogData, clearDecisionLog, isDecisionLogLoaded } from '../stores';
    let decisions = [];
    let isCsvLoaded;

    // Subscribe to the decision log data from the store
    $: decisionLogData.subscribe(data => {
      decisions = data;
    });

    // Subscribe to isDecisionLogLoaded to track if the data is loaded
    $: isDecisionLogLoaded.subscribe(value => {
        isCsvLoaded = value;
    });

    // Handle clearing data
    const handleClearData = () => {
        clearDecisionLog();
    };
</script>

  <div class="flex flex-col items-start component">
    <h2>Decision Log</h2>
    <div class="flex flex-col flex-wrap items-start	content-start">
    {#each decisions as decision}
      <details class="my-2 p-2 border border-purple rounded-lg max-w-2xl">
        <summary class="font-semibold text-md text-left">{decision.short_title}</summary>

        <div class="mt-2">
          <table class="table-auto text-left max-w-xl">
            <tbody>
              <tr>
                <td class="font-semibold px-2 py-1">Date</td>
                <td class="px-2 py-1">{decision.date}</td>
              </tr>
              <tr>
                <td class="font-semibold px-2 py-1">Description</td>
                <td class="px-2 py-1 description">{decision.description}</td>
              </tr>
              <tr>
                <td class="font-semibold px-2 py-1">Deciding Group(s)</td>
                <td class="px-2 py-1">{decision.deciding_groups}</td>
              </tr>
              <tr>
                <td class="font-semibold px-2 py-1">Resolution</td>
                <td class="px-2 py-1">{decision.resolution}</td>
              </tr>
              {#if decision.supplemental_materials}
                <tr>
                  <td class="font-semibold px-2 py-1">Supplemental Materials</td>
                  <td class="px-2 py-1">{decision.supplemental_materials}</td>
                </tr>
              {/if}
              {#if decision.other_notes}
                <tr>
                  <td class="font-semibold px-2 py-1">Other Notes</td>
                  <td class="px-2 py-1">{decision.other_notes}</td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </details>
    {/each}
    </div>
    {#if isCsvLoaded}
    <button on:click={handleClearData} class="text-white px-4 py-2 rounded mt-4">
      Clear data
    </button>
  {/if}
  </div>

  <style>
    summary {
      cursor: pointer;
    }
  
    details[open] summary {
      font-weight: bold;
    }
  
    table {
      border-collapse: collapse;
      width: 100%;
    }
  
    td {
      border-bottom: 1px solid #000;
    }

    tbody tr:last-child td {
      border-bottom: none;
    }
  
    .font-semibold {
      font-weight: 600;
    }

    .description {
        max-width: 345px;
    }

    .component {
      border-style: dotted;
      border: 2px dotted #000;
    }
  </style>
