<template>
  <ContainerLayout color="amber lighten-3">
    <v-card-title>
      <v-icon large left> mdi-cash-multiple </v-icon>
      <span class="text-h4">Sociale</span>
    </v-card-title>

    <v-card-text class="text-h5">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam quidem hic, dolorum
      explicabo et aliquid, animi enim quaerat sequi ab eveniet delectus autem? Nobis,
      reprehenderit? Temporibus quos corrupti aliquid dolorum.
    </v-card-text>
    <v-container fluid class="px-3">
      <v-row color="white">
        <v-col
          v-for="(chartData, index) in chartsData"
          :key="index"
          cols="12"
          md="6"
          class="d-flex"
        >
          <BarChartCard :chartData="chartData" />
        </v-col>
      </v-row>
    </v-container>
  </ContainerLayout>
</template>

<script>
import BarChartCard from '@/components/charts/BarChartCard.vue';
import ContainerLayout from '@/components/layout/ContainerLayout.vue';
import { getSocial } from '@/utils/service';

export default {
  components: { ContainerLayout, BarChartCard },
  data() {
    return {
      chartsData: {},
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

<style></style>
