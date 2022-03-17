<template>
  <CardLayout color="white">
    <v-card-title>{{ chartData.source.title }}</v-card-title>
    <v-card-text>
      {{ chartData.description }}
    </v-card-text>
    <LineChart :fetchedChartData="chartData" />
    <v-card-text>
      {{ chartData.lecture }}<br />
      Source : <a :href="chartData.source.link">{{ chartData.source.title }}</a>
    </v-card-text>
  </CardLayout>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue';
import CardLayout from '@/components/layout/CardLayout.vue';

export default {
  components: { LineChart, CardLayout },
  props: {
    chartData: {},
  },
};
</script>

<style></style>
