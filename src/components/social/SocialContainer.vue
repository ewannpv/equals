<template>
  <ContainerLayout color="#fe9292" class="py-3">
    <CardLayout color="white" class="mx-3 mb-5">
      <v-card-title>
        <v-icon large left> mdi-cash-multiple </v-icon>
        <span class="text-h4">Social</span>
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
import CardLayout from '@/components/layout/CardLayout.vue';

export default {
  components: { ContainerLayout, BarChartCard, CardLayout },
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
