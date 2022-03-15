<template>
  <v-card class="mx-auto" color="red lighten-3" dark>
    <v-card-title>
      <v-icon large left> mdi-cash-multiple </v-icon>
      <span class="text-h4">Economie</span>
    </v-card-title>

    <v-card-text class="text-h5">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam quidem hic, dolorum
      explicabo et aliquid, animi enim quaerat sequi ab eveniet delectus autem? Nobis,
      reprehenderit? Temporibus quos corrupti aliquid dolorum.
    </v-card-text>
    <v-container fluid class="px-3">
      <v-row color="white">
        <v-col cols="12" sm="6" class="d-flex">
          <EconomyUnemployment />
        </v-col>
        <v-col cols="12" sm="3" class="d-flex">
          <EconomyUnemployment />
        </v-col>
        <v-col cols="12" sm="3" class="d-flex">
          <EconomyUnemployment />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import EconomyUnemployment from '@/components/Economy/EconomyUnemployment.vue';

export default {
  components: { EconomyUnemployment },
};
</script>

<style></style>
