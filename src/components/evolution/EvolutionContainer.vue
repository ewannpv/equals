<template>
  <ContainerLayout color="#97d3d3" class="pa-3">
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
                :value="evolution"
                :key="needUpdate"
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
          <EvolutionOption @updateEvolution="updateEvolution" />
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
import EvolutionOption from '@/components/evolution/EvolutionOption.vue';

export default {
  components: {
    ContainerLayout,
    CardLayout,
    EvolutionCard,
    GapCard,
    EvolutionOption,
  },
  data() {
    return {
      checkbox: true,
      needUpdate: false,
      min: 2000,
      max: 2020,
      lastEstimatedYear: 2050,
      range: [0, 0],
      evolution: 0,
    };
  },
  mounted() {
    this.range = [this.min, this.max];
  },
  methods: {
    updateEvolution(value) {
      this.evolution = parseFloat(value.toFixed(2), 10);
      this.needUpdate = !this.needUpdate;
    },
  },
};
</script>

<style></style>
