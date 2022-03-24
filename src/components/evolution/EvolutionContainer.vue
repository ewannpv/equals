<template>
  <ContainerLayout :background="require('@/assets/images/evolution.jpg')" class="pa-3">
    <CardLayout>
      <v-card-title>
        <v-icon large left> mdi-cash-multiple </v-icon>
        <span class="text-h3">Evolution</span>
      </v-card-title>
      <v-card-text>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, quod, mollitia corrupti minima
        sint magni consequuntur assumenda nihil ad exercitationem distinctio sunt possimus adipisci
        iure doloremque consectetur et eligendi hic?
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12" md="4" class="d-flex">
              <EvolutionCard
                title="Evolution de la Femme"
                description="lorem ipsum..."
                :value="parseInt(30, 10)"
              />
            </v-col>
            <v-col cols="12" md="4" class="d-flex">
              <GapCard
                title="Evolution ecart Homme / Femme"
                description="lorem ipsum..."
                :value="parseInt(30, 10)"
              />
            </v-col>
            <v-col cols="12" md="4" class="d-flex">
              <EvolutionCard
                title="Nombre d'annee avant equite"
                description="lorem ipsum..."
                :value="parseInt(30, 10)"
              />
            </v-col>
          </v-row>
          <div class="my-3">
            <v-row class="text-h5"> Options </v-row>
            <v-row>
              <v-col md="6" cols="12">
                <v-range-slider
                  v-model="range"
                  :max="max"
                  :min="min"
                  hide-details
                  class="align-center"
                >
                  <template v-slot:prepend>
                    {{ range[0] }}
                  </template>
                  <template v-slot:append>
                    {{ range[1] }}
                  </template>
                </v-range-slider>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-card-text>
    </CardLayout>
  </ContainerLayout>
</template>

<script>
import ContainerLayout from '@/components/layout/ContainerLayout.vue';
import CardLayout from '@/components/layout/CardLayout.vue';
import EvolutionCard from '@/components/evolution/EvolutionCard.vue';
import GapCard from '@/components/evolution/GapCard.vue';

export default {
  components: {
    ContainerLayout,
    CardLayout,
    EvolutionCard,
    GapCard,
  },
  data() {
    return {
      min: 2000,
      max: 2020,
      lastEstimatedYear: 2050,
      range: [0, 0],
    };
  },
  mounted() {
    this.range = [this.min, this.max];
  },
  methods: {},
};
</script>

<style></style>
