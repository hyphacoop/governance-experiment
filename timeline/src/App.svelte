<script>
  import { onMount } from "svelte";

  import ThemeSwitcher from './lib/ThemeSwitcher.svelte';

  let groupedTimeline = {};

  async function loadTimeline() {
    const response = await fetch("timeline.json");
    const data = await response.json();

    // Group events by year
    groupedTimeline = data.reduce((acc, event) => {
      acc[event.year] = acc[event.year] || [];
      acc[event.year].push(event);
      return acc;
    }, {});
  }

  // Static legend for the timeline
  const staticLegend = "This timeline represents the official lore of Hypha Worker Co-operative. It contains significant events that have been collectively agreed upon by the members, showcasing our journey, milestones, and key decisions in our cooperative's history.";
  
  let selectedEvent = null;
  
  function selectEvent(event) {
    selectedEvent = event;
  }

  onMount(() => {
    loadTimeline();
  });
</script>


<div class="content-container flex flex-row min-[888px]:flex-col items-center justify-between max-w-full">
    <!-- Static Legend -->
    <div class="legend flex flex-col items-end border p-4 mb-12 ml-8 min-[456px]:ml-16 min-[888px]:ml-0 rounded w-full max-w-60 min-[888px]:max-w-md text-center">
      <span class='w-full'>
        {staticLegend}
      </span>
    </div>
  <div class="flex flex-col min-[888px]:flex-row items-center gap-1 min-[888px]:gap-4 timeline-container">
    {#each Object.entries(groupedTimeline) as [year, events]}
      <div class="flex flex-col items-start">


        <!-- Events for the Year -->
        <div class="flex flex-col min-[888px]:flex-row gap-1 min-[888px]:gap-4 yearly-events-container">

          {#each events as event}
            <button 
              class="event flex justify-center items-center relative z-10 flex-shrink-0 text-center px-4 py-2 border rounded-full hover:bg-purple {selectedEvent === event ? 'active' : ''}"
              on:click={() => selectEvent(event)}
            >
              <span>{event.id}</span>
        </button>
          {/each}
        </div>
        <!-- Year Header -->
        <div class="year-header ml-2 mb-1">{year}</div>
      </div>
    {/each}
  </div>
    {#if selectedEvent}
    <div class="legend flex flex-col items-end border p-4 mt-8 ml-8 min-[456px]:ml-16 min-[888px]:ml-0 rounded w-full max-w-60 min-[888px]:max-w-md text-center">
      <span class='w-full'>
        {selectedEvent.legend}
      </span>
      {#if selectedEvent.link}
        <a href="{selectedEvent.link}" target="_blank" rel="noopener noreferrer" class="p-2 hover:bg-purple rounded w-fit">
          🔗
        </a>
      {/if}
    </div>
  {/if}

</div>
<ThemeSwitcher />
<style>
  .content-container {
    margin-top: 15vh;
  }
  }
  .event {
    width: 3.5rem;
    height: 3.5rem;
    border-color: var(--border-color);
    color: var(--text-color);
    border-width: 2px;
    background-color: var(--background-color);
    transition: all 0.2s ease-in-out;
    border-radius: 50%;
  }
  .event:hover {
    background-color: #9900FC;
    border-color: #9900FC;
  }
  .event:focus,
  .event:focus-visible {
    outline: 2px dashed var(--border-color);
    border: 2px solid transparent;
  }
  .active {
    border-width: 4px;
    border-style: solid;
    border-color: var(--border-color) !important;  
  }
 event.active:focus,
.event.active:focus-visible {
  outline: 3px dashed var(--border-color); 
  border-color: var(--active-border-color);
}
  .legend {
    border-width: 2px;
  }
  .event::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    width: calc(100% + 1rem);
    height: 2px;
    background-color: var(--border-color);
    transform: translateY(-50%);
    z-index: -1;
  }
  .year-header {
      display:none;
      font-family: 'Work Sans', sans-serif;
    }
  @media (min-width: 480px) {
    .year-header {
      display: block;
    }
  }  
  @media (max-width: 887px) {
    .content-container {
      margin-top: 0;
    }
    .event::before {
      top: 102%;
      left: 50%;
      width: 2px;
      height: calc(100% + 0.5rem);
      transform: translateX(-50%);
    }
    .year-header {
      position: absolute;
      transform: translate(-150%, 60%);
    }
  }

  .timeline-container > .items-start:last-of-type .yearly-events-container .event:last-of-type::before {
  display: none;
}

</style>
