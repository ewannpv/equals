<script>
import { Line } from 'vue-chartjs';
import { getBestFitLineExpValues, getBestFitLineLogValues, getBestFitLineValues } from '@/utils/computing';

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
    const valuesX = labels.map((x) => parseInt(x, 10));
    datasets.forEach((dataset) => {
      const linearValues = getBestFitLineValues(valuesX, dataset.data);
      const expValues = getBestFitLineExpValues(valuesX, dataset.data);
      const logValues = getBestFitLineLogValues(valuesX, dataset.data);
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
      datasets.push({
        ...dataset,
        data: logValues,
        label: `${dataset.label} logarithmic`,
        hidden: true,
      });
    });
    this.renderChart(this.chartData, this.options);
  },
};
</script>
