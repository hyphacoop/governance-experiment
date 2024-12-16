<script>
    import { theme } from '../stores/theme';
    let currentTheme;
  
    $: theme.subscribe(value => {
      currentTheme = value;
    });
  
    function toggleTheme() {
      theme.set(currentTheme === 'light' ? 'dark' : 'light');
    }
  </script>
  
  <button on:click={toggleTheme} class='rounded-full'>
    {#if currentTheme === 'light'}
        ☀️
    {:else}
        🌙
    {/if}
  </button>
  
  <style>
    button {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      cursor: pointer;
      border: 2px solid var(--border-color);
      background-color: var(--background-color);
    }
  
    button:hover {
        background-color: #9900FC;
        border-color: #9900FC;
    }
  </style>