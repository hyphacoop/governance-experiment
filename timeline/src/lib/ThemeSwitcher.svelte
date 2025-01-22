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
    <!-- Sun Icon -->
    <i class="fas fa-sun"></i>
  {:else}
    <!-- Moon Icon -->
    <i class="fas fa-moon"></i>
  {/if}
  </button>
  
  <style>
    button {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      cursor: pointer;
      color: var(--emoji-color);
      border: 2px solid var(--border-color);
      background-color: var(--background-color);
    }
  
    button:hover {
        border-color: var(--emoji-color);
    }
  </style>