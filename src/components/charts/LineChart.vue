<script>
import { Line } from 'vue-chartjs';
import { getBestFitLineExpValues, getBestFitLineValues } from '@/utils/computing';

export default {
  props: {
    fetchedChartData: Object,
  },
  extends: Line,
  data() {
    return {
      chartData: {
        labels: this.fetchedChartData?.labels,
        datasets: this.fetchedChartData?.datasets.map((dataset) => ({
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
    const { datasets, labels } = this.chartData;
    datasets.forEach((dataset) => {
      const linearValues = getBestFitLineValues(labels, dataset.data);
      const expValues = getBestFitLineExpValues(labels, dataset.data);
      datasets.push({
        ...dataset,
        data: linearValues,
        label: `${dataset.label} linéaire`,
        hidden: true,
      });
      datasets.push({
        ...dataset,
        data: expValues,
        label: `${dataset.label} exponential`,
        hidden: true,
      });
    });
    this.renderChart(this.chartData, this.options);
  },
};
</script>
