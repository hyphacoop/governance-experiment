<script>
    import FetchVotes from './FetchVotes.svelte';
    import { decisionLogData, clearDecisionLog, isDecisionLogLoaded } from '../stores';
    import { revokeGoogleToken } from '../stores/auth';
    let decisions = [];
    let isCsvLoaded;

    // Define table fields for dynamic rendering
    const tableFields = [
        { label: 'Date', key: 'date' },
        { label: 'Description', key: 'description', class: 'description' },
        { label: 'Deciding Group(s)', key: 'deciding_groups' },
        { label: 'Resolution', key: 'resolution' },
        { label: 'Supplemental Materials', key: 'supplemental_materials' },
        { label: 'Other Notes', key: 'other_notes' }
    ];

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

    // Handle clearing data
    const handleClearToken = () => {
        revokeGoogleToken();
    };
</script>

  <div class="flex flex-col items-start component">
    <h2>Decision Log</h2>
    <div class="flex flex-row flex-wrap items-start	content-start">
    {#each decisions as decision}
      <details class="my-2 p-2 border border-purple rounded-lg">
        <summary class="font-semibold text-md text-left">{decision.short_title}</summary>

        <div class="mt-2">
          <table class="table-auto text-left max-w-xl">
            <tbody>
              {#each tableFields as field}
              {#if decision[field.key]}
              <tr>
                  <td class="font-semibold px-2 py-1">{field.label}</td>
                  <td class={`px-2 py-1 ${field.class || ''}`}>
                      {decision[field.key]}
                  </td>
              </tr>
              {/if}
              {/each}

              {#if decision.vote_results}
              <tr>
                  <td class="font-semibold px-2 py-1">Vote Results</td>
                  <td class="px-2 py-1">
                      <FetchVotes hash={decision.vote_results} />
                  </td>
              </tr>
              {/if}
          </tbody>
          </table>
        </div>
      </details>
    {/each}
    </div>
    {#if isCsvLoaded}
    <div class='flex flex-row'>
    <button on:click={handleClearToken} class="text-white px-4 py-2 rounded mt-4 ml-2">
      Sign out
    </button>
    </div>
  {/if}
  </div>

  <style>
    summary {
      cursor: pointer;
    }

    details {
      margin-right: 1rem;
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
