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
      <v-btn depressed @click="displayEstimation">
        {{ displayEstimationBtn ? 'Cacher les prévisions' : 'Afficher les prévisions' }}
      </v-btn>
      <div v-if="displayEstimationBtn">
        Ceci est une prévision
        <v-container>
          <v-row>
            <v-col md="6">
              <v-select
                v-model="selectedDataset"
                :items="completedChartData.datasets.map((dataset) => dataset.label)"
                label="Selectionnez un dataset"
                single-line
                @change="onChangeSelectedDatasetForPrevision"
              ></v-select>
            </v-col>
            <v-col md="6">
              <v-select
                v-model="selectedEstimationType"
                @change="onChangeEstimationType"
                :items="estimationTypes"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </div>
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
  estimationTypes,
  getBestFitLineExpValues,
  getBestFitLineLogValues,
  getBestFitLineValues,
  getEstimatedValuesFromCoefficients,
  getMeanSquaredDeviation,
} from '@/utils/computing';

export default {
  data() {
    return {
      displayEstimationBtn: false,
      estimationTypes,
      refresh: false,
      min: 0,
      max: 0,
      lastEstimatedYear: 2050,
      range: [0, 0],
      completedChartData: undefined,
      filteredChartData: undefined,
      selectedDataset: undefined,
      selectedEstimationType: undefined,
    };
  },
  mounted() {
    [this.min, this.max] = [
      this.chartData.labels[0],
      this.chartData.labels[this.chartData.labels.length - 1],
    ];
    this.range = [this.min, this.max];
    this.filteredChartData = JSON.parse(JSON.stringify(this.chartData));
    this.completedChartData = JSON.parse(JSON.stringify(this.chartData));
  },
  components: {
    LineChart,
    CardLayout,
  },
  props: {
    chartData: {},
  },
  methods: {
    displayEstimation() {
      this.displayEstimationBtn = !this.displayEstimationBtn;
      if (this.displayEstimationBtn) {
        this.completeDatasetWithPrevision();
        this.max = this.lastEstimatedYear;
      } else {
        const lastYear = +this.chartData.labels[this.chartData.labels.length - 1];
        this.range[1] = lastYear;
        this.max = lastYear;
      }
      this.filterChartData();
    },
    filterChartData() {
      this.filteredChartData = JSON.parse(JSON.stringify(this.completedChartData));
      for (let index = this.completedChartData.labels.length - 1; index >= 0; index -= 1) {
        const value = this.completedChartData.labels[index];

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
      this.completedChartData = {
        ...this.chartData,
      };

      const completionLength = this.lastEstimatedYear - this.max;
      const futureYears = new Array(completionLength);
      for (let i = 0; i < completionLength; i += 1) {
        futureYears[i] = +this.max + i + 1;
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
            bestType = estimationTypes.at(0);
            estimatedValues = getEstimatedValuesFromCoefficients(
              futureYears,
              linearValues.a,
              linearValues.b,
              estimationTypes[0],
            );
            break;
          case expDeviation:
            bestType = estimationTypes.at(1);
            estimatedValues = getEstimatedValuesFromCoefficients(
              futureYears,
              expValues.a,
              expValues.b,
              estimationTypes[1],
            );
            break;
          case logDeviation:
            bestType = estimationTypes.at(2);
            estimatedValues = getEstimatedValuesFromCoefficients(
              futureYears,
              logValues.a,
              logValues.b,
              estimationTypes[2],
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

      this.selectedDataset = this.chartData.datasets[0].label;
      this.selectedEstimationType = this.getSelectedDataset().previsions.selectedType;
    },
    getSelectedDataset() {
      return this.completedChartData.datasets.find(
        (dataset) => dataset.label === this.selectedDataset,
      );
    },
    onChangeSelectedDatasetForPrevision() {
      this.selectedEstimationType = this.getSelectedDataset()?.previsions.selectedType;
    },
    onChangeEstimationType() {
      this.getSelectedDataset().previsions.selectedType = this.selectedEstimationType;
    },
  },
};
</script>

<style></style>
