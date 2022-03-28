<template>
  <ContainerLayout color="#97d3d3" class="pa-3">
    <CardLayout>
      <v-card-title>
        <v-icon large left> mdi-cash-multiple </v-icon>
        <span class="text-h3">Évolution</span>
      </v-card-title>
      <v-card-text>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, quod, mollitia corrupti minima
        sint magni consequuntur assumenda nihil ad exercitationem distinctio sunt possimus adipisci
        iure doloremque consectetur et eligendi hic?
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12" md="4" class="d-flex">
              <EvolutionCard
                title="Évolution de la situation de la Femme"
                :description="descriptionFirstChart"
                :value="evolution"
                :key="needUpdate"
              />
            </v-col>
            <v-col cols="12" md="4" class="d-flex">
              <GapCard
                title="Évolution écart Homme / Femme"
                :description="descriptionSecondChart"
                :value="evolutionGap"
                :key="needUpdate"
              />
            </v-col>
            <v-col cols="12" md="4" class="d-flex">
              <EquityCard
                title="Année de l'équité"
                :description="descriptionThirdChart"
                :value="equity"
                :range="equityRange"
                :key="needUpdate"
              />
            </v-col>
          </v-row>
          <EvolutionOption
            @updateEvolution="updateEvolution"
            @updateEvolutionGap="updateEvolutionGap"
            @updateOptionCard="updateOptionCard"
            @updateEquity="updateEquity"
          />
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
import EquityCard from '@/components/evolution/EquityCard.vue';

export default {
  components: {
    ContainerLayout,
    CardLayout,
    EvolutionCard,
    GapCard,
    EvolutionOption,
    EquityCard,
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
      evolutionGap: [0, 0],
      descriptionFirstChart:
        'Évolution de la situation de la Femme en pourcentage. Si le chiffre est négatif, cela represente une amélioration.',
      descriptionSecondChart:
        "Comparatif de l'évolution de l'écart entre les hommes et les femmes. Le chiffre de gauche représente la situation à la date de début et le chiffre de droite représente la situation à la date de fin.",
      descriptionThirdChart:
        "Nombre d'années nécessaires avant d'atteindre une situation équitable ou avantageuse pour la Femme",
      equity: 0,
      equityRange: 0,
    };
  },
  mounted() {
    this.range = [this.min, this.max];
  },
  methods: {
    updateEvolution(value) {
      this.evolution = parseFloat(value.toFixed(2), 10);
    },
    updateEvolutionGap(value) {
      if (value.length) {
        this.evolutionGap = [
          parseFloat(value[0].toFixed(2), 10),
          parseFloat(value[1].toFixed(2), 10),
        ];
      } else {
        this.evolutionGap = [0, 0];
      }
    },
    updateOptionCard() {
      this.needUpdate = !this.needUpdate;
    },
    updateEquity(value) {
      this.equity = +value[0];
      this.equityRange = +value[1];
    },
  },
};
</script>

<style>
.full-height {
  height: 100%;
}
.flex-evolution-card {
  flex-direction: column;
  justify-content: space-around;
  display: flex;
  height: 100%;
}
</style>
