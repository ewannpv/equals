<template>
  <ContainerLayout color="#fee3ab" class="py-3">
    <CardLayout color="white" class="mx-3 mb-5">
      <v-card-title>
        <v-icon large left> mdi-cash-multiple </v-icon>
        <span class="text-h4">Économie</span>
      </v-card-title>

      <v-card-text class="text-h5">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam quidem hic, dolorum
        explicabo et aliquid, animi enim quaerat sequi ab eveniet delectus autem? Nobis,
        reprehenderit? Temporibus quos corrupti aliquid dolorum.
      </v-card-text>
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
          <GenericChartCard :chartData="chartData" :chartType="chartType"/>
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

<style></style>
