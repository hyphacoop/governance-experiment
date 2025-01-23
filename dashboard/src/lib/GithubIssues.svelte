<script>
  import { githubIssues } from "../stores";

    // Reactive statement to update class based on githubIssues length
    $: topDivClass = $githubIssues.length > 0 
      ? "my-4 flex flex-col border-2 border-purple rounded p-2 items-baseline component" 
      : "my-4 flex flex-col border-2 border-purple rounded p-2 items-baseline";

</script>

<div class={topDivClass}>
  <h2>Provide Feedback</h2>
  <blockquote class='my-4 p-4 pl-0 purple max-w-8xl text-left'>Below are the issues currently marked with a status of <span class='underline'>Feedback Required</span> on the project board.</blockquote>
  {#if $githubIssues.length > 0}
    <ul class="flex flex-row flex-wrap max-w-8xl">
      {#each $githubIssues as issue}
        <li class="border border-purple rounded-lg my-2 p-2">
          <a href="{issue.content.url}" target="_blank" rel="noopener noreferrer">
            <strong>{issue.content.title} 🔗</strong>
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No issues found in Feedback Required category.</p>
  {/if}
</div>

<style>
  ul {
    list-style-type: none;
    padding-left: 0;
  }

  li {
    margin-bottom: 1rem;
    text-align: left;
  }
  li:hover {
    background-color: #9900fc;  
  }

  li:not(:last-child) {
    margin-right: 1rem;
  }

  a {
    text-decoration: none;
    color: black;
  }

  li:hover a {
    color: white;
  }

  .component {
      border-style: dotted;
      border: 2px dotted #000;
    }
</style>
