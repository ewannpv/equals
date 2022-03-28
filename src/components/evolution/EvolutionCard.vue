<template>
  <CardLayout color="white" width="100%">
    <v-card-text>
      <v-col cols="12">
        <v-row justify="center" class="text-h5"> {{ title }} </v-row>
        <v-row justify="center" align="center" class="py-3">
          <v-progress-circular
            :rotate="360"
            :size="150"
            :width="18"
            :value="Math.abs(displayedValue)"
            :color="circularColor"
          >
            <h1>{{ displayedValue }}%</h1>
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
      displayedValue: 0,
    };
  },
  mounted() {
    this.displayedValue = this.value;
  },
  computed: {
    circularColor() {
      if (this.displayedValue < 0) return 'green';
      if (this.displayedValue < 5) return 'orange';
      return 'red';
    },
  },
};
</script>

<style></style>
