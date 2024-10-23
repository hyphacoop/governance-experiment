<script>
    import { loadDecisionLog } from '../stores';
  
    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
        await loadDecisionLog(file);
      }
    };
  </script>
  
  <div class="file-upload">
    <h2>Upload CSV for Decision Log</h2>
    <input type="file" accept=".csv" on:change={handleFileUpload} />
  </div>