<template>
  <CardLayout color="white">
    <v-card-title> Chomage </v-card-title>

    <v-card-text>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam quidem hic, dolorum
      explicabo et aliquid, animi enim quaerat sequi ab eveniet delectus autem? Nobis,
      reprehenderit? Temporibus quos corrupti aliquid dolorum.
    </v-card-text>
    <LineChart fetchedChartData="chartData"/>
  </CardLayout>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue';
import CardLayout from '@/components/layout/CardLayout.vue';
import { getExample } from '@/utils/service';

export default {
  components: { LineChart, CardLayout },
  data() {
    return {
      chartData: undefined,
    };
  },
  // actions
  methods: {
    setChartData(data) {
      this.chartData = data;
    },
  },
  mounted() {
    getExample().then((data) => this.setChartData(data));
  },
};
</script>

<style></style>
