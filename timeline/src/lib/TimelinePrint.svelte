<script>
    import { onMount } from "svelte";
    import "@fortawesome/fontawesome-free/css/all.css";
    import { theme } from "../stores/theme";
  
    let groupedTimeline = {};
    let currentTheme;
  
    $: theme.subscribe(value => {
      currentTheme = value;
    });
  
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
  
    onMount(() => {
      loadTimeline();
    });
  
    function printTimeline() {
      window.print();
    }
  </script>
  
  <div class="print-container">
    <div class="print-controls">
      <button on:click={printTimeline} class="print-button">
        Print Timeline
      </button>
    </div>
    <h1>Hypha Worker Co-operative</h1>
    <!-- Static Legend at the top -->
    <div class="print-legend">
      <p>{staticLegend}</p>
    </div>
    
    <!-- Timeline with all events and descriptions visible -->
    <div class="timeline-content">
      {#each Object.entries(groupedTimeline) as [year, events]}
        <div class="year-section">
          <h3 class="year-header">{year}</h3>
          <div class="year-events">
            {#each events as event}
              <div class="event-container">
                <div class="event-icon">
                  <i class={`fas ${event.id}`}></i>
                </div>
                <div class="event-description">
                  <p>{event.legend}</p>
                  {#if event.link}
                    <span class="event-link">🔗 {event.link}</span>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <style>
    .print-container {
      max-width: 80%;
      margin: 0 auto;
      font-family: 'Work Sans', sans-serif;
    }
  
    .print-legend {
      margin-bottom: 2rem;
      padding: 1rem;
      border: 2px solid var(--border-color);
      border-radius: 0.5rem;
    }
  
    .year-section {
      margin-bottom: 2rem;
    }
  
    .year-header {
      font-weight: bold;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
  
    .year-events {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    .event-container {
      display: flex;
      border: 2px solid var(--border-color);
      border-radius: 0.5rem;
      overflow: hidden;
    }
  
    .event-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      background-color: var(--background-color);
      color: var(--emoji-color);
      font-size: 1.5rem;
      border-right: 1px solid var(--border-color);
    }
  
    .event-description {
      padding: 1rem;
      flex: 1;
    }
  
    .event-link {
      display: block;
      margin-top: 0.5rem;
      font-style: italic;
    }
  
    .print-controls {
      margin-bottom: 1rem;
    }
  
    .print-button {
      padding: 0.5rem 1rem;
      background-color: var(--background-color);
      border: 2px solid var(--border-color);
      color: var(--color);
      cursor: pointer;
    }
  
    /* Print-specific styles */
    @media print {
      /* Hide any navigation or UI elements not needed for print */
      nav, button, .theme-switcher {
        display: none !important;
      }

      h1 {
        margin-bottom: 2rem;
      }

      h3 {
        font-size: 2rem !important;
      }

      .print-legend,
      .event-icon,
      .event-container {
        border: none !important;
      }

      h3, .event-description, .print-legend {
        text-align: left !important;
      }
      /* Ensure proper page breaks */
      .year-section {
        page-break-inside: avoid;
      }
      
      /* Adjust colors for printing */
      :root {
        --emoji-color: #333 !important;
        --border-color: #666 !important;
        --color: #000 !important;
        --background-color: #fff !important;
      }
      
      /* Adjust font sizes for print */
      body {
        font-size: 12pt;
      }
      
      /* Ensure all content is visible */
      .event-container {
        break-inside: avoid;
        margin-bottom: 10pt;
      }
      
      .print-controls {
        display: none;
      }
      
      /* Force background printing */
      :root {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      body {
        width: 100%;
        margin: 0;
        padding: 0;
      }
      
      .print-container {
        width: 100%;
        max-width: 80%;
        padding: 0;
        margin: 0 auto;
      }
      
      /* Ensure proper page breaks */
      .year-section {
        page-break-before: auto;
        page-break-after: auto;
      }
      
      /* Avoid breaking event descriptions across pages */
      .event-container {
        page-break-inside: avoid;
      }
      
      /* Improved visuals for print */
      .event-icon {
        font-size: 1.2rem;
        padding: 0.5rem;
      }
    }
  </style>