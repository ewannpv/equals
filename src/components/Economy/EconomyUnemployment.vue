<template>
  <v-card title light elevation="6" outlined class="rounded-xl">
    <v-card-title> Chomage </v-card-title>

    <v-card-text>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam quidem hic, dolorum
      explicabo et aliquid, animi enim quaerat sequi ab eveniet delectus autem? Nobis,
      reprehenderit? Temporibus quos corrupti aliquid dolorum.
    </v-card-text>

    <LineChart />
  </v-card>
</template>

<script>
import LineChart from '@/charts/LineChart.vue';

export default {
  components: { LineChart },
};
</script>

<style></style>
