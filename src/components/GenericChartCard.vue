<template>
  <CardLayout v-if="filtredChartData" color="white" width="100%">
    <v-card-title>{{ filtredChartData.source.title }}</v-card-title>
    <v-card-text>
      {{ filtredChartData.description }}
    </v-card-text>
    <LineChart :fetchedChartData.sync="lineChartData" />
    <v-row>
      <v-col class="px-4">
        <v-range-slider
          v-model="range"
          :max="max"
          :min="min"
          hide-details
          class="align-center"
          @end="filterChartData()"
        >
          <template v-slot:prepend>
            <v-text-field
              :value="range[0]"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
              @change="filterChartData()"
            ></v-text-field>
          </template>
          <template v-slot:append>
            <v-text-field
              :value="range[1]"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
              @change="filterChartData()"
            ></v-text-field>
          </template>
        </v-range-slider>
      </v-col>
    </v-row>
    <v-card-text>
      {{ filtredChartData.lecture }}<br />
      Source : <a :href="filtredChartData.source.link">{{ filtredChartData.source.title }}</a>
    </v-card-text>
  </CardLayout>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue';
import CardLayout from '@/components/layout/CardLayout.vue';

export default {
  mounted() {
    this.filtredChartData = this.chartData;
    [this.min, this.max] = [
      this.chartData.labels[0],
      this.chartData.labels[this.chartData.labels.length - 1],
    ];
    this.range = [this.min, this.max];
  },
  components: { LineChart, CardLayout },
  props: {
    chartData: {},
  },
  methods: {
    filterChartData(e) {
      console.log(e);
      this.filtredChartData.labels = this.chartData.labels.filter(
        (label) => this.range[0] && label <= this.range[1],
      );
    },
  },
  computed: {
    lineChartData() {
      console.log('oof :', this.filtredChartData);
      return this.filtredChartData;
    },
  },
  data() {
    return {
      min: 0,
      max: 0,
      range: [0, 0],
      filtredChartData: undefined,
    };
  },
};
</script>

<style></style>
