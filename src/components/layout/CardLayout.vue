<template>
  <v-card title light elevation="6" outlined class="rounded-xl" :color="color" :width="width">
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  props: {
    color: String,
    width: String,
  },
};
</script>

<style></style>
