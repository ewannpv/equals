<script>
import { Line } from 'vue-chartjs';
import { findLineByLeastSquares } from '@/utils/computing';

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
      /* compute average linear coefficient from data points */
      let coeffLinear = 0;
      const computed = findLineByLeastSquares(labels, dataset.data);
      const coefficiens = [];
      for (let i = 1; i < dataset.data.length; i += 1) {
        /* sum up gaps */
        const step = dataset.data[i] - dataset.data[i - 1] / (labels[i] - labels[i - 1]);
        coeffLinear += step;
        console.log(coeffLinear);
        coefficiens.push(step);
      }
      /* division to get average */
      coeffLinear /= dataset.data.length - 1; // get average gap between 2 data points
      const sorted = coefficiens.sort();
      const median = sorted[Math.floor(sorted.length / 2)];
      console.log(`Median: ${median}`);
      /* construct approximated linear dataset from effective dataset */
      const linearData = new Array(dataset.length);
      [linearData[0]] = dataset.data;
      for (let i = 1; i < dataset.data.length; i += 1) {
        linearData[i] = linearData[0] + median * (labels[i] - labels[0]);
      }
      datasets.push({
        ...dataset,
        data: computed,
        label: `${dataset.label} linéaire`,
        hidden: true,
      });
    });
    this.renderChart(this.chartData, this.options);
  },
};
</script>
