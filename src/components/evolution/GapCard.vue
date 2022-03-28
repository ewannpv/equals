<template>
  <CardLayout color="white" width="100%">
    <v-card-text>
      <v-col cols="12">
        <v-row justify="center" class="text-h5"> {{ title }} </v-row>
        <v-row justify="center" align="center">
          <v-btn class="ma-2" x-large outlined rounded :color="circularColor">
            <h1>{{ displayedValue[0] }}%</h1>
          </v-btn>
          <v-icon>mdi-arrow-right-bold </v-icon>

          <v-btn class="ma-2" x-large outlined rounded :color="circularColor">
            <h1>{{ displayedValue[1] }}%</h1>
          </v-btn>
        </v-row>
        <v-row justify="center"> {{ description }} </v-row>
      </v-col>
    </v-card-text>
  </CardLayout>
</template>

<script>
import CardLayout from '@/components/layout/CardLayout.vue';

export default {
  props: { title: String, description: String, value: Array },
  components: { CardLayout },
  data() {
    return {
      displayedValue: this.value,
    };
  },
  computed: {
    circularColor() {
      const diff = this.displayedValue[0] - this.displayedValue[1];
      if (diff > 5) return 'green';
      if (diff > 2) return 'amber';
      if (diff > 0) return 'orange';
      return 'red';
    },
  },
};
</script>

<style></style>
