<template>
  <CardLayout v-if="chartData" color="white" width="100%">
    <v-card-title>{{ chartData.source.title }}</v-card-title>
    <v-card-text>
      {{ chartData.description }}
    </v-card-text>
    <BarChart :fetchedChartData="chartData" />
  </CardLayout>
</template>

<script>
import BarChart from '@/components/charts/BarChart.vue';
import CardLayout from '@/components/layout/CardLayout.vue';

export default {
  props: {
    chartData: {},
  },
  components: { BarChart, CardLayout },
};
</script>
