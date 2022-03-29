<template>
  <ContainerLayout class="py-3 social-container">
    <CardLayout color="white" class="mx-3 mb-5">
      <v-card-title>
        <v-icon large left color="#fe9292"> mdi-account-circle </v-icon>
        <span class="text-h4">Social</span>
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
          <GenericChartCard
            :chartData="chartData"
            :chartType="chartType"
            :chartHelper="chartData.helper"
          />
        </v-col>
      </v-row>
    </v-container>
  </ContainerLayout>
</template>

<script>
import GenericChartCard from '@/components/charts/GenericChartCard.vue';
import ContainerLayout from '@/components/layout/ContainerLayout.vue';
import { getSocial } from '@/utils/service';
import CardLayout from '@/components/layout/CardLayout.vue';
import { chartTypes } from '@/utils/chart';

export default {
  components: { ContainerLayout, GenericChartCard, CardLayout },
  data() {
    return {
      chartsData: {},
      chartType: chartTypes.BAR,
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
    getSocial().then((data) => this.setChartsData(data));
  },
};
</script>

<style>
.social-container {
  background: linear-gradient(#fe9292, #b39ddb);
}
</style>
