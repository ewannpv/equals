<template>
  <v-app-bar app dense :src="require('@/assets/images/banner.jpg')">
    <v-toolbar-title class="custom-title">Equals</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style>
.custom-title {
  font-size: 7.5rem;
  font-weight: bolder;
  color: white;
}
</style>
