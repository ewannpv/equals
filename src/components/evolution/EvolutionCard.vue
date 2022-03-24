<template>
  <CardLayout color="white">
    <v-card-text>
      <v-col cols="12">
        <v-row justify="center" class="text-h4"> title here </v-row>
        <v-row justify="center">
          <v-progress-circular :rotate="360" :size="100" :width="15" :value="value" color="teal">
            {{ value }}
          </v-progress-circular>
        </v-row>
        <v-row justify="center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quis, illo laudantium quae
          blanditiis minus cupiditate ea, porro alias eaque fugiat totam rem a! Reprehenderit
          laboriosam veritatis aliquid cumque illo!
        </v-row>
      </v-col>
    </v-card-text>
  </CardLayout>
</template>

<script>
import CardLayout from '@/components/layout/CardLayout.vue';

export default {
  components: { CardLayout },
  data() {
    return { value: 50 };
  },
};
</script>

<style></style>
