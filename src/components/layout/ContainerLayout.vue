<template>
  <v-card class="ma-0 rounded-0" dark :color="color">
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  props: {
    color: String,
  },
};
</script>

<style></style>
