<template>
  <v-card title light elevation="6" outlined class="rounded-xl" :color="color">
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
