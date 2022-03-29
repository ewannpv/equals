<template>
  <CardLayout color="white" width="100%">
    <v-card-text class="full-height">
      <v-col cols="12" class="flex-evolution-card">
        <v-row justify="center" class="text-h5"> {{ title }} </v-row>
        <v-row justify="center" align="center" class="py-3">
          <v-progress-circular
            :rotate="360"
            :size="150"
            :width="18"
            :value="Math.abs(displayedValue)"
            :color="circularColor"
          >
            <div v-if="displayedValue">
              <h1>{{ displayedValue }}%</h1>
            </div>
            <div v-else>
              <v-icon large>mdi-database-remove</v-icon>
            </div>
          </v-progress-circular>
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
  props: { title: String, description: String, value: Number },
  components: { CardLayout },
  data() {
    return {
      displayedValue: this.value ? this.value : 0,
    };
  },
  computed: {
    circularColor() {
      if (this.displayedValue < 0) return 'green';
      if (this.displayedValue < 2) return 'amber';
      if (this.displayedValue < 5) return 'orange';
      return 'red';
    },
  },
};
</script>

<style></style>
