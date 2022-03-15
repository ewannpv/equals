<template>
  <CardWidget color="white">
    <v-card-title> Mariage </v-card-title>

    <v-card-text>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam quidem hic, dolorum
      explicabo et aliquid, animi enim quaerat sequi ab eveniet delectus autem? Nobis,
      reprehenderit? Temporibus quos corrupti aliquid dolorum.
    </v-card-text>

    <LineChart />
  </CardWidget>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue';
import CardWidget from '@/components/layout/CardWidget.vue';

export default {
  components: { LineChart, CardWidget },
};
</script>

<style></style>
