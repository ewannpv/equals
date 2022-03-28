<template>
  <LineChart v-if="type === chartTypes.LINE" :chartData="completeChartData" :options="options"/>
  <BarChart v-else-if="type === chartTypes.BAR" :chartData="completeChartData" :options="options"/>
  <div v-else>Error</div>
</template>

<script>
import { chartTypes } from '@/utils/chart';
import LineChart from './LineChart.vue';
import BarChart from './BarChart.vue';

export default {
  props: {
    chartData: Object,
    type: undefined,
  },
  data() {
    return {
      chartTypes,
      completeChartData: {
        labels: this.chartData?.labels,
        datasets: this.chartData?.datasets.map((dataset) => ({
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
  components: {
    LineChart,
    BarChart,
  },
};
</script>
