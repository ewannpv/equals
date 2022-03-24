<template>
  <CardLayout color="white" width="100%">
    <v-card-text>
      <v-col cols="12">
        <v-row justify="center" class="text-h4"> {{ title }} </v-row>
        <v-row justify="center" align="center">
          <div class="text-h4">
            {{ displayedValue }} <v-icon> mdi-arrow-right-bold </v-icon> {{ +value + 10 }}
          </div>
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
