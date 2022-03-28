<template>
  <ContainerLayout class="py-3 econmy-container">
    <CardLayout color="white" class="mx-3 mb-5">
      <v-card-title>
        <v-icon large left color="#fee3ab"> mdi-cash-multiple </v-icon>
        <span class="text-h4">Économie</span>
      </v-card-title>
    </CardLayout>

    <v-container fluid class="px-3">
      <v-row color="white">
        <v-col
          v-for="(chartData, index) in chartsData"
          :key="index"
          cols="12"
          md="6"
          class="d-flex"
        >
          <GenericChartCard :chartData="chartData" :chartType="chartType" />
        </v-col>
      </v-row>
    </v-container>
  </ContainerLayout>
</template>

<script>
import GenericChartCard from '@/components/charts/GenericChartCard.vue';
import ContainerLayout from '@/components/layout/ContainerLayout.vue';
import { getTravail } from '@/utils/service';
import CardLayout from '@/components/layout/CardLayout.vue';
import { chartTypes } from '@/utils/chart';

export default {
  components: { ContainerLayout, GenericChartCard, CardLayout },
  data() {
    return {
      chartsData: {},
      chartType: chartTypes.LINE,
      loaded: false,
    };
  },
  methods: {
    setChartsData(data) {
      this.chartsData = data;
      this.loaded = true;
    },
  },
  mounted() {
    getTravail().then((data) => this.setChartsData(data));
  },
};
</script>

<style>
.econmy-container {
  background: linear-gradient(#fee3ab, #fe9292);
}
</style>
