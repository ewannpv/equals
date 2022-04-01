<template>
  <CardLayout color="white" width="100%">
    <v-card-text class="full-height">
      <v-col cols="12" class="flex-evolution-card">
        <v-row justify="center" class="text-h5 mb-1"> {{ title }} </v-row>
        <v-row justify="center" align="center" class="ma-0">
          <v-btn x-large outlined rounded :color="circularColor">
            <div v-if="displayedValue">
              <h1>{{ displayedValue }}</h1>
            </div>
            <div v-else>
              <v-icon large>mdi-database-remove</v-icon>
            </div>
          </v-btn>
        </v-row>
        <v-row v-if="value > 0" justify="center" class="mb-2 text-button">
          Soit {{ displayedSub }}
        </v-row>
        <v-row justify="center">
          {{ description }}
        </v-row>
      </v-col>
    </v-card-text>
  </CardLayout>
</template>

<script>
import CardLayout from '@/components/layout/CardLayout.vue';

export default {
  props: {
    title: String,
    description: String,
    value: Number,
    range: Number,
  },
  components: { CardLayout },
  computed: {
    circularColor() {
      if (this.value == null) return 'grey';
      if (this.value <= 0) return 'green';
      if (this.value < 2) return 'amber';
      if (this.value < 5) return 'orange';
      return 'red';
    },
    displayedValue() {
      if (this.value == null) return null;
      if (this.value <= 0) return 'Équité atteinte';
      if (Number.isNaN(this.value)) return 0;
      if (!Number.isFinite(this.value)) return 'Jamais';
      return this.range + this.value;
    },
    displayedSub() {
      if (!Number.isFinite(this.value)) return 'jamais';
      return `${this.value} ans à compter de ${this.range}`;
    },
  },
};
</script>

<style></style>
