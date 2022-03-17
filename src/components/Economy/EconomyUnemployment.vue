<template>
  <CardLayout v-if="loaded" color="white">
    <v-card-title>{{chartData.source.title}}</v-card-title>
    <v-card-text>
      {{chartData.description}}
    </v-card-text>
    <LineChart :fetchedChartData="chartData" :key="loaded" />
    <v-card-text>
      {{chartData.lecture}}<br/>
      Source : <a :href="chartData.source.link">{{chartData.source.title}}</a>
    </v-card-text>
  </CardLayout>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue';
import CardLayout from '@/components/layout/CardLayout.vue';
import { getExample } from '@/utils/service';

export default {
  components: { LineChart, CardLayout },
  data() {
    return {
      chartData: undefined,
      loaded: false,
    };
  },
  // actions
  methods: {
    setChartData(data) {
      this.chartData = data;
      this.loaded = true;
    },
  },
  mounted() {
    getExample().then((data) => this.setChartData(data));
  },
};
</script>

<style></style>
