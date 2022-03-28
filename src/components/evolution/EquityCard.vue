<template>
  <CardLayout color="white" width="100%">
    <v-card-text>
      <v-col cols="12">
        <v-row justify="center" class="text-h5"> {{ title }} </v-row>
        <v-row justify="center" align="center" class="py-3">
          <v-btn class="ma-2" x-large outlined rounded color="indigo">
            {{ displayedValue }}
          </v-btn>
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
      displayedValue: this.value,
    };
  },
};
</script>

<style></style>
