<template>
  <v-app id="inspire">
    <TopNavBar />
    <v-main class="pt-2">
      <v-container
        ><line-chart></line-chart>
        <line-chart></line-chart>
        <line-chart></line-chart>
        <line-chart></line-chart>
        <line-chart></line-chart>
        <line-chart></line-chart>
        <line-chart></line-chart>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LineChart from '@/charts/LineChart.vue';
import TopNavBar from '@/components/layout/TopNavBar.vue';

export default {
  components: {
    LineChart,
    TopNavBar,
  },
};
</script>
