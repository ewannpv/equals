<script>
import { Line } from 'vue-chartjs';

export default {
  props: {
    fetchedChartData: Object,
  },
  extends: Line,
  data() {
    const { fetchedChartData } = this;
    return {
      chartData: {
        labels: fetchedChartData.labels,
        datasets: fetchedChartData.map((dataset) => ({
          fill: false,
          borderColor: '#2554FF',
          backgroundColor: '#2554FF',
          borderWidth: 1,
          ...dataset,
        })),
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
