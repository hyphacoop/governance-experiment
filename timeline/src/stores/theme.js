import { writable } from 'svelte/store';

// Get theme from URL or localStorage
const urlParams = new URLSearchParams(window.location.search);
const urlTheme = urlParams.get('theme'); // Get `theme` param from URL

const storedTheme = urlTheme || localStorage.getItem('theme') || 'light';

export const theme = writable(storedTheme);

theme.subscribe(value => {
  localStorage.setItem('theme', value);
  document.documentElement.setAttribute('data-theme', value);
});
