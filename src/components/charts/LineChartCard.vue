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
    <v-card-text v-if="range[1] > lastDataYear">
      Ceci est une prévision
      <v-container>
        <v-row>
          <v-col>
            <v-select
              :items="completedChartData.datasets.map((dataset) => dataset.label)"
              label="Selectionnez un dataser"
              single-line
              @change="onChangeSelectedDatasetForPrevision"
            ></v-select>
            <v-radio-group
              v-model="completedChartData.datasets[0].previsions.selectedType"
              @change="changeEstimationType"
            >
              <v-radio label="Linéaire" value="linear"></v-radio>
              <v-radio label="Exponentielle" value="exponential"></v-radio>
              <v-radio label="Logarithmique" value="logarithmic"></v-radio>
            </v-radio-group>
            <hr />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-text>
      {{ filteredChartData.lecture }}<br />
      Source : <a :href="filteredChartData.source.link">{{ filteredChartData.source.title }}</a>
    </v-card-text>
  </CardLayout>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue';
import CardLayout from '@/components/layout/CardLayout.vue';
import {
  getBestFitLineExpValues,
  getBestFitLineLogValues,
  getBestFitLineValues,
  getEstimatedValuesFromCoefficients,
  getMeanSquaredDeviation,
} from '@/utils/computing';

export default {
  data() {
    return {
      refresh: false,
      min: 0,
      max: 0,
      lastDataYear: 0,
      range: [0, 0],
      completedChartData: undefined,
      filteredChartData: undefined,
      selectedDataset: 0,
    };
  },
  mounted() {
    [this.min, this.max, this.lastDataYear] = [
      parseInt(this.chartData.labels[0], 10),
      2050,
      parseInt(this.chartData.labels[this.chartData.labels.length - 1], 10),
    ];
    this.range = [this.min, this.lastDataYear];
    this.completeDatasetWithPrevision();
    this.filteredChartData = JSON.parse(JSON.stringify(this.chartData));
  },
  components: { LineChart, CardLayout },
  props: {
    chartData: {},
  },
  methods: {
    filterChartData() {
      this.filteredChartData = JSON.parse(JSON.stringify(this.completedChartData));
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
    completeDatasetWithPrevision() {
      this.completedChartData = { ...this.chartData };

      const completionLength = this.max - this.lastDataYear;
      const futureYears = new Array(completionLength);
      for (let i = 0; i < completionLength; i += 1) {
        futureYears[i] = this.lastDataYear + i + 1;
      }

      this.completedChartData.labels = this.chartData.labels.concat(futureYears);

      const { datasets, labels } = this.chartData;
      const valuesX = labels.map((x) => parseInt(x, 10));

      this.completedChartData.datasets = datasets.map((dataset) => {
        /* compute estimated model linear, exponential and logarithmic */
        const linearValues = getBestFitLineValues(valuesX, dataset.data);
        const expValues = getBestFitLineExpValues(valuesX, dataset.data);
        const logValues = getBestFitLineLogValues(valuesX, dataset.data);

        /* compute standard error associated with each models */
        const linearDeviation = getMeanSquaredDeviation(dataset.data, linearValues.resultValuesY);
        const expDeviation = getMeanSquaredDeviation(dataset.data, expValues.resultValuesY);
        const logDeviation = getMeanSquaredDeviation(dataset.data, logValues.resultValuesY);

        /* check closest model */
        const minDeviation = Math.min(linearDeviation, expDeviation, logDeviation);

        let estimatedValues;
        let bestType;
        switch (minDeviation) {
          case linearDeviation:
            bestType = 'linear';
            estimatedValues = getEstimatedValuesFromCoefficients(
              futureYears,
              linearValues.a,
              linearValues.b,
              'linear',
            );
            break;
          case expDeviation:
            bestType = 'exponential';
            estimatedValues = getEstimatedValuesFromCoefficients(
              futureYears,
              expValues.a,
              expValues.b,
              'exponential',
            );
            break;
          case logDeviation:
            bestType = 'logarithmic';
            estimatedValues = getEstimatedValuesFromCoefficients(
              futureYears,
              logValues.a,
              logValues.b,
              'logarithmic',
            );
            break;
          default:
            break;
        }

        return {
          ...dataset,
          data: dataset.data.concat(estimatedValues),
          previsions: {
            bestType,
            selectedType: bestType,
            linearCoefficients: {
              a: linearValues.a,
              b: linearValues.b,
              standardSquaredDeviation: linearDeviation,
            },
            expCoefficients: {
              a: expValues.a,
              b: expValues.b,
              standardSquaredDeviation: expDeviation,
            },
            logCoefficients: {
              a: logValues.a,
              b: logValues.b,
              standardSquaredDeviation: logDeviation,
            },
          },
        };
      });
    },
    onChangeSelectedDatasetForPrevision(arg) {
      console.log(this.selectedDataset);
      console.log(arg);
    },
    changeEstimationType() {},
  },
};
</script>

<style></style>
