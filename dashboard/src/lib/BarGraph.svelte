<script>
  import { barChartData } from "../stores";
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let labels = [];
  let values = [];
  let chart;

  $: barChartData.subscribe(data => {
    labels = data.labels;
    values = data.values;

    // Update chart data if chart is already initialized
    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = values;
      chart.update();
    }
  });

  onMount(() => {
    const canvas = document.getElementById("votesChart");
    if (canvas instanceof HTMLCanvasElement) {
      const ctx = canvas.getContext("2d");

      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            label: 'Votes',
            data: values,
            backgroundColor: ['#9900FC', '#9900FC', '#9900FC'], // Bar colors
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              grid: {
                color: 'black',        // black grid lines for X-axis
                lineWidth: 1,
              },
              ticks: {
                color: 'black',        // black tick labels for X-axis
                font: {
                  family: 'Work Sans', // Apply Work Sans to X-axis tick labels
                  size: 12,
                }
              },
              title: {
                display: true,
                text: '',    // X-axis label
                color: 'black',
                font: {
                  family: 'Work Sans',
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            y: {
              min: 0, // Minimum value for Y-axis
              max: 12,
              grid: {
                color: 'black',        // black grid lines for Y-axis
                lineWidth: 0.1,
              },
              ticks: {
                color: 'black',        // black tick labels for Y-axis
                font: {
                  family: 'Work Sans', // Apply Work Sans to Y-axis tick labels
                  size: 12,
                },
              },
              title: {
                display: true,
                text: '', // Y-axis label
                color: 'black',
                font: {
                  family: 'Work Sans',
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                color: 'black',       // black legend text
                font: {
                  family: 'Work Sans', // Apply Work Sans to legend
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            tooltip: {
              titleFont: {
                family: 'Work Sans',
                size: 14,
                weight: 'bold'
              },
              bodyFont: {
                family: 'Work Sans',
                size: 12
              }
            }
          }
        }
      });
    } else {
      console.error("votesChart element is not a canvas element.");
    }
  });
</script>

<div class="flex flex-col items-start component">
  <h2>
    Results
  </h2>
  <canvas id="votesChart"></canvas>
</div>
