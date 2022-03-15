<template>
  <CardLayout color="white">
    <v-card-title> Chomage </v-card-title>

    <v-card-text>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam quidem hic, dolorum
      explicabo et aliquid, animi enim quaerat sequi ab eveniet delectus autem? Nobis,
      reprehenderit? Temporibus quos corrupti aliquid dolorum.
    </v-card-text>
    <LineChart />
  </CardLayout>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue';
import CardLayout from '@/components/layout/CardLayout.vue';

export default {
  components: { LineChart, CardLayout },
};
</script>

<style></style>
