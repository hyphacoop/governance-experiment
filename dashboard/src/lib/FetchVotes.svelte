<script>
    import * as Earthstar from "earthstar";
    import { onMount } from "svelte";
    import settings, { replica, processVoteResults } from "../stores.js";
  
    // Props
    export let hash = "";
  
    // State
    let responses = [];
    let voteCounts = {};
    let voters = [];
  
    // Earthstar cache
    const cache = new Earthstar.ReplicaCache(replica);
  
    /**
     * Initialize peer synchronization for Earthstar
     */
    function startPeerSync() {  
      const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;
      if (!serverAddress) {
        console.error("Server address is not configured");
        return;
      }
  
      const peer = new Earthstar.Peer();
      peer.addReplica(replica);
  
      // Start syncing and register cache update handler
      peer.sync(serverAddress, true);
      settings.addServer(serverAddress);
      cache.onCacheUpdated(fetchVotes);
    }
  
    /**
     * Fetch votes for the given hash
     */
    async function fetchVotes() {
      if (!hash) {
        console.warn("No hash provided for fetching votes.");
        return;
      }
    
      try {
  
        // Fetch documents with the specified hash prefix
        const allDocuments = await cache.queryDocs({
          filter: { pathStartsWith: `/${hash}` },
        });
  
        const documents = allDocuments.filter(doc => doc.text.trim() !== "");
        processVoteResults(documents);
  
        // Update voters and vote counts
        voters = documents.filter(doc => doc.text.includes("Voted"));
  
        if (responses.length > 0) {
          voteCounts = documents.reduce((counts, doc) => {
            const vote = doc.text;
            counts[vote] = (counts[vote] || 0) + 1;
            return counts;
          }, {});
        }
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    }
  
    // Start peer sync on component mount
    onMount(() => {
      startPeerSync();
    });
  </script>
  
  <main>
    {#if hash}
      <button on:click={fetchVotes}>Get vote results</button>
    {:else}
      <p>No hash provided. Please specify a valid hash.</p>
    {/if}
  </main>
  
  
<style>
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 0px;
      border: 1px solid #000;
      background-color: #f5f5f5;
      margin: 2rem 0;
    }
  
    button:hover {
      background-color: black;
      color: white;
    }
  </style>
  