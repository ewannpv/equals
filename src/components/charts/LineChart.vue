<script>
import { Line } from 'vue-chartjs';
import {
  getBestFitLineExpValues,
  getBestFitLineLogValues,
  getBestFitLineValues,
  getMeanSquaredDeviation,
} from '@/utils/computing';

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
      /* compute estimated model linear, exponential and logarithmic */
      const linearValues = getBestFitLineValues(valuesX, dataset.data);
      const expValues = getBestFitLineExpValues(valuesX, dataset.data);
      const logValues = getBestFitLineLogValues(valuesX, dataset.data);

      /* compute standard error associated with each models */
      const linearDeviation = getMeanSquaredDeviation(dataset.data, linearValues);
      const expDeviation = getMeanSquaredDeviation(dataset.data, expValues);
      const logDeviation = getMeanSquaredDeviation(dataset.data, logValues);

      /* check closest model */
      const minDeviation = Math.min(linearDeviation, expDeviation, logDeviation);
      console.log(`linear=${linearDeviation} exp=${expDeviation} log=${logDeviation} min=${minDeviation}`);

      /* add the closest model to datasets for prevision */
      const estimatedDataset = {
        ...dataset,
        hidden: true,
      };

      switch (minDeviation) {
        case linearDeviation:
          estimatedDataset.data = linearValues;
          estimatedDataset.label = `${dataset.label} linéaire`;
          break;
        case expDeviation:
          estimatedDataset.data = expValues;
          estimatedDataset.label = `${dataset.label} exponentiel`;
          break;
        case logDeviation:
          estimatedDataset.data = logValues;
          estimatedDataset.label = `${dataset.label} logarithmique`;
          break;
        default:
          break;
      }

      datasets.push(estimatedDataset);
    });
    this.renderChart(this.chartData, this.options);
  },
};
</script>
