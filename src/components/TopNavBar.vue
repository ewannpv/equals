<template>
  <v-app-bar app dense :src="require('@/assets/images/banner.jpg')">
    <v-toolbar-title class="custom-title">Equals</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon @click="openWhereIsLove">mdi-heart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    openWhereIsLove() {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley');
    },
    openINSEE() {
      window.open('https://www.insee.fr/fr/accueil');
    },
  },
};
</script>

<style>
.custom-title {
  font-size: 2.2rem !important;
  font-weight: bolder;
  color: white;
}
</style>
