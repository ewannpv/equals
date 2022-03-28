<template>
  <CardLayout color="white" width="100%">
    <v-card-text>
      <v-col cols="12">
        <v-row justify="center" class="text-h4"> {{ title }} </v-row>
        <v-row justify="center">
          <v-progress-circular
            :rotate="360"
            :size="100"
            :width="15"
            :value="displayedValue"
            color="pink lighten-1"
          >
            <h2>{{ displayedValue }}</h2>
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
};
</script>

<style></style>
