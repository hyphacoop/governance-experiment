<script>
    import GoogleAuth from './GoogleAuth.svelte';

    import { loadDecisionLog } from '../stores';
  
    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        await loadDecisionLog(file);
      }
    };
  </script>
  
  <div class="file-upload my-4 flex flex-col border-2 border-purple rounded p-2 items-baseline">
    <h2 class="text-left ml-12 mt-6">Decision Log</h2>
    <div class="flex flex-col items-start ml-12">
      <GoogleAuth />
      <label class='flex flex-col'>
        <p class="text-left purple mr-2">
          Or load CSV from 
          <a class="purple underline" href="ttps://docs.google.com/spreadsheets/d/16vZwzK3OQmWWtRBtUAlk-ly435fvdj0BqOhLSesHkrY/edit?usp=sharing">
            template
          </a>
        </p>
        <input type="file" accept=".csv" on:change={handleFileUpload} />
      </label>
    </div>
  </div>
  <style>
    label {
      margin-bottom: 1.5rem;
    }
  </style>