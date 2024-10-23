<script>
    import { decisionLogData, clearDecisionLog, csvLoaded } from '../stores';
    let decisions = [];
    let isCsvLoaded;

    // Subscribe to the decision log data from the store
    $: decisionLogData.subscribe(data => {
      decisions = data;
    });

    // Subscribe to csvLoaded to track if the CSV is loaded
    $: csvLoaded.subscribe(value => {
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
      <details class="my-2 p-4 border border-gray-300 rounded-lg max-w-2xl">
        <summary class="font-semibold text-md text-left">{decision['Short title']}</summary>
  
        <div class="mt-2">
          <table class="table-auto text-left max-w-xl">
            <tbody>
              <tr>
                <td class="font-semibold px-2 py-1">Date</td>
                <td class="px-2 py-1">{decision['Date']}</td>
              </tr>
              <tr>
                <td class="font-semibold px-2 py-1">Description</td>
                <td class="px-2 py-1 description">{decision['Description']}</td>
              </tr>
              <tr>
                <td class="font-semibold px-2 py-1">Deciding Group</td>
                <td class="px-2 py-1">{decision['Deciding group']}</td>
              </tr>
              <tr>
                <td class="font-semibold px-2 py-1">Resolution</td>
                <td class="px-2 py-1">{decision['Resolution']}</td>
              </tr>
              {#if decision['Supplemental materials']}
                <tr>
                  <td class="font-semibold px-2 py-1">Supplemental Materials</td>
                  <td class="px-2 py-1">{decision['Supplemental materials']}</td>
                </tr>
              {/if}
              {#if decision['Other notes']}
                <tr>
                  <td class="font-semibold px-2 py-1">Other Notes</td>
                  <td class="px-2 py-1">{decision['Other notes']}</td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </details>
    {/each}
    </div>
    {#if isCsvLoaded}
    <button on:click={handleClearData} class="bg-red-500 text-white px-4 py-2 rounded my-8">
      Clear Data
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
      border-bottom: 1px solid #ddd;
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
  </style>
  