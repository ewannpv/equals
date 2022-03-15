<template>
  <v-card class="ma-0 rounded-0" dark :color="color" :img="background">
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  props: {
    color: String,
    background: String,
  },
};
</script>

<style></style>
