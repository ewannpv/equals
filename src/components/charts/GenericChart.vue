<template>
  <LineChart v-if="type === chartTypes.LINE" :chart-data="chartData" :options="options"/>
  <BarChart v-else-if="type === chartTypes.BAR" :chart-data="chartData" :options="options"/>
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
