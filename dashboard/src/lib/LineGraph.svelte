<script>
  import { lineGraphData } from "../stores";
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  let chart;

  let labels, values;

  // Subscribe to store data
  $: lineGraphData.subscribe(data => {
    labels = data.labels;
    values = data.values;
  });

  onMount(() => {
    const ctx = document.getElementById("participationChart").getContext("2d");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels, // This controls the X-axis labels
        datasets: [{
          
          label: '',
          data: values,
          borderColor: '#9900FC', 
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          x: {
            grid: {
              color: 'lightgrey', 
              lineWidth: 0.5,    
            },
            title: { // X-axis label (legend)
              display: true,
              text: '',  // Customize this text
              color: 'black',                    // Customize color
              font: {
                family: 'Work Sans', 
                size: 14,
                weight: 'bold'
              }
            },
            ticks: {  // Customize X-axis tick labels
              color: 'black',
              font: {
                family: 'Work Sans', 
                size: 12,
              }
            }
          },
          y: {
            grid: {
              color: 'lightgrey',
              lineWidth: 0.5,    
            },
            min: 0, // Minimum value for Y-axis
            max: 12, // Maximum value for Y-axis
            title: { // Y-axis label (legend)
              display: true,
              text: '',   // Customize this text
              color: 'black',
              font: {
                family: 'Work Sans', 
                size: 14,
                weight: 'bold'
              }
            },
            ticks: {            // Maximum value for Y-axis
              stepSize: 1,         // Step size between tick marks
              color: 'black',
              font: {
                family: 'Work Sans', 
                size: 12,
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false, // Hide legend
            labels: {
              color: 'black',  // Customize legend text color
              font: {
                family: 'Work Sans', 
                size: 14,
              }
            }
          }
        }
      }
    });
  });
</script>

<div class="flex flex-col items-start component">
  <h2>
    Votes for Proposals
  </h2>
  <canvas id="participationChart"></canvas>
</div>
