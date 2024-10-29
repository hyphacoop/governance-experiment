<script>
    import { loadDecisionLog } from '../stores';
  
    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        await loadDecisionLog(file);
      }
    };
  </script>
  
  <div class="file-upload my-4 flex flex-col border-2 border-purple rounded p-2 items-baseline">
    <h2 class="text-left">Decision Log</h2>
    <label>
    <p class="text-left purple">Load CSV</p>
    <input type="file" accept=".csv" on:change={handleFileUpload} />
  </label>
  </div>