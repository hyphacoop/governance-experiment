<script>
    import { demoMode, githubIssues, decisionLogData, isDecisionLogLoaded, lineGraphData, barChartData, proposalsData, votedCount, voteDataLoaded, clearDecisionLog, clearVoteData } from "../stores";
  
    const dummyIssues = [
        {
            content: {
                url: "https://github.com/hyphacoop/governance-experiment/issues/12",
                title: "Improve Dashboard documentation"
            }
        },
        {
            content: {
                url: "https://github.com/hyphacoop/handbook/issues/331",
                title: "Should we make some NFTs?"
            }
        }
    ];
  
    const pastDecisions = [
        {
            short_title: "Give Roo access to an LLM API endpoint",
            date: "2024-Nov-19",
            description: "Allocated GPU resources to Roo for development of an LLM API endpoint.",
            deciding_groups: "Infrastructure",
            resolution: "Passed"
        },
        {
            short_title: "Should we bridge Lifeform 168 to Ethereum mainnet?",
            date: "2024-Nov-13",
            description: "Discuss the implications and potential outcomes of bridging lifeform 168 to the Ethereum mainnet.",
            deciding_groups: "Governance",
            resolution: "Pending"
        },
        {
            short_title: "Adopt a pet policy",
            date: "2022-Apr-9",
            description: "Add a pet policy and roobot to the handbook",
            deciding_groups: "Operations",
            resolution: "<a href='https://github.com/hyphacoop/handbook/commit/84d7577a48631e1a7765ec36cb1dbca42062c3b4'>Committed 🔗</a>"
        }
    ];
  
    const dummyLineGraph = {
        labels: ["A", "B", "C"],
        values: [5, 10, 7]
    };
  
    const dummyBarChart = {
        labels: ["A", "B", "C"],
        values: [0, 11, 1]
    };
  
    const dummyProposals = [
        { vote: "A", proposal: "Yes", title: "Unpopular proposal", count: 0 },
        { vote: "B", proposal: "No", title: "Excellent proposal", count: 11 },
        { vote: "C", proposal: "Abstain", title: "", count: 1 }
    ];
  
    function loadDummyData() {
        console.log("Loading dummy data...");
        if (!$demoMode) {
            $demoMode = true;
            console.log("Demo mode enabled.");
            // Set GitHub issues
            githubIssues.set(dummyIssues);
  
            // Set decision log data
            decisionLogData.set(pastDecisions);
            isDecisionLogLoaded.set(true);

            // Set voting data
            lineGraphData.set(dummyLineGraph);
            barChartData.set(dummyBarChart);
            proposalsData.set(dummyProposals);
            votedCount.set(12); // Total votes counted
            voteDataLoaded.set(true);
            return;
        } else {
            $demoMode = false;
            clearDecisionLog();
            clearVoteData();
            decisionLogData.set([]);
            voteDataLoaded.set(false);
            githubIssues.set([]);

            console.log("Demo mode disabled.");
            return;
        }

       
    }
    $: console.log('outatte', $demoMode);
</script>
<div class="file-upload my-4 flex {$demoMode ? "flex-row" : "flex-col" } border-2 border-purple rounded p-2 items-baseline {$demoMode ? 'component' : ''}">
    <h2 class="text-left mt-6">Public Preview</h2>
    <div class="flex flex-col items-start ml-12">
<button on:click={loadDummyData} >
    { $demoMode ? "Reset view" : "Preview Dashboard" }
</button>

    </div>
</div>
<style>
    .component {
      border-style: dotted;
      border: 2px dotted #000;
    }
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