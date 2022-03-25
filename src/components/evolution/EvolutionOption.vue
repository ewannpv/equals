<template>
  <div class="my-3">
    <v-row class="text-h5"> Options </v-row>
    <v-row>
      <v-col md="6" cols="12">
        <v-range-slider v-model="range" :max="max" :min="min" hide-details class="align-center">
          <template v-slot:prepend>
            {{ range[0] }}
          </template>
          <template v-slot:append>
            {{ range[1] }}
          </template>
        </v-range-slider>
      </v-col>
    </v-row>
    <template>
      <v-treeview selectable :items="treeViewItems"></v-treeview>
    </template>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      checkbox: true,
      min: 2000,
      max: 2020,
      lastEstimatedYear: 2050,
      range: [0, 0],
      treeViewItems: [
        {
          id: 1,
          name: 'Economie :',
        },
      ],
    };
  },
  mounted() {
    this.range = [this.min, this.max];
  },
  methods: {},
};
</script>

<style></style>
