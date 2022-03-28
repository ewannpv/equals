<template>
  <CardLayout color="white" width="100%">
    <v-card-text>
      <v-col cols="12">
        <v-row justify="center" class="text-h4"> {{ title }} </v-row>
        <v-row justify="center" align="center">
          <v-btn class="ma-2" x-large outlined color="indigo"> {{ displayedValue[0] }} </v-btn>
          <v-icon>mdi-arrow-right-bold </v-icon>

          <v-btn class="ma-2" x-large outlined color="indigo"> {{ displayedValue[1] }} </v-btn>
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
  props: { title: String, description: String, value: Array },
  components: { CardLayout },
  data() {
    return {
      displayedValue: this.value,
    };
  },
};
</script>

<style></style>
