<template>
  <CardLayout v-if="chartData" color="white" width="100%">
    <v-card-title>{{ chartData.source.title }}</v-card-title>
    <v-card-text>
      {{ chartData.description }}
    </v-card-text>
    <GenericChart :chartData="chartData" :type="chartType" />
  </CardLayout>
</template>

<script>
import GenericChart from '@/components/charts/GenericChart.vue';
import CardLayout from '@/components/layout/CardLayout.vue';
import { chartTypes } from '@/utils/chart';

export default {
  props: {
    chartData: {},
  },
  data() {
    return {
      chartType: chartTypes.BAR,
    };
  },
  components: { GenericChart, CardLayout },
};
</script>
