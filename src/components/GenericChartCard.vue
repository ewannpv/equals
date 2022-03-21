<template>
  <CardLayout v-if="filteredChartData" color="white" width="100%">
    <v-card-title>{{ filteredChartData.source.title }}</v-card-title>
    <v-card-text>
      {{ filteredChartData.description }}
    </v-card-text>
    <LineChart :fetchedChartData="filteredChartData" :key="refresh" />
    <v-row>
      <v-col class="px-4">
        <v-range-slider
          v-model="range"
          :max="max"
          :min="min"
          hide-details
          class="align-center"
          @end="filterChartData"
        >
          <template v-slot:prepend>
            {{ range[0] }}
          </template>
          <template v-slot:append>
            {{ range[1] }}
          </template>
        </v-range-slider>
      </v-col>
    </v-row>
    <v-card-text>
      {{ filteredChartData.lecture }}<br />
      Source : <a :href="filteredChartData.source.link">{{ filteredChartData.source.title }}</a>
    </v-card-text>
  </CardLayout>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue';
import CardLayout from '@/components/layout/CardLayout.vue';

export default {
  mounted() {
    this.filteredChartData = JSON.parse(JSON.stringify(this.chartData));
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
    filterChartData() {
      this.filteredChartData = JSON.parse(JSON.stringify(this.chartData));
      for (let index = this.chartData.labels.length - 1; index >= 0; index -= 1) {
        const value = this.chartData.labels[index];

        if (value < this.range[0] || value > this.range[1]) {
          this.filteredChartData?.labels.splice(index, 1);

          this.filteredChartData?.datasets.forEach((dataset) => {
            dataset.data.splice(index, 1);
          });
        }
      }
      this.refresh = !this.refresh;
    },
  },
  data() {
    return {
      refresh: false,
      min: 0,
      max: 0,
      range: [0, 0],
      filteredChartData: undefined,
    };
  },
};
</script>

<style></style>
