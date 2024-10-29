<script>
    import { loadDecisionLog } from '../stores';
  
    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        await loadDecisionLog(file);
      }
    };
  </script>
  
  <div class="file-upload my-4 flex flex-col border-2 border-purple rounded p-2">
    <h2 class="text-left">Upload CSV for Decision Log</h2>
    <br>
    <input type="file" accept=".csv" on:change={handleFileUpload} />
  </div>