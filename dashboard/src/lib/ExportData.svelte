<script>
    import { exportData } from '../stores.js';
  </script>
  
<div class="flex flex-col items-start">
  <button on:click={exportData} class="rounded">
    Export Data
  </button>
</div>
  <style>
    button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #000;
    background-color: #f5f5f5;
    margin: 2rem 0;
  }

  button:hover {
    background-color: black;
    color: white;
  }
  </style>