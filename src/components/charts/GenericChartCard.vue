<template>
  <CardLayout v-if="filteredChartData" color="white" width="100%">
    <v-card-title>{{ filteredChartData.title }}</v-card-title>
    <v-card-text>
      {{ filteredChartData.description }}
    </v-card-text>
    <GenericChart :chartData="filteredChartData" :type="chartType" />
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
      <v-row class="pb-2">
        <v-col md="6">
          <v-btn depressed @click="displayEstimation">
            {{ displayEstimationBtn ? 'Cacher les prévisions' : 'Afficher les prévisions' }}
          </v-btn>
        </v-col>
        <v-col md="6" v-if="displayEstimationBtn">
          <v-btn outlined color="warning"> {{ previsionsInfo() }} </v-btn>
        </v-col>
      </v-row>
      <div v-if="displayEstimationBtn">
        Le mode prévision est activé. Vous pouvez consulter les données prédictives de
        {{ +chartData.labels[chartData.labels.length - 1] + 1 }} jusqu'à {{ lastEstimatedYear }}.
        Cette évolution a été estimée grâce à un modèle mathématique que vous pouvez également
        reparamétrer pour étudier une évolution différente.
        <v-container>
          <v-row>
            <v-col md="6">
              <v-select
                v-model="selectedDataset"
                :items="completedChartData.datasets.map((dataset) => dataset.label)"
                label="Selectionnez un dataset"
                messages="Courbe à parametrer"
                single-line
                @change="onChangeSelectedDatasetForPrevision"
              ></v-select>
            </v-col>
            <v-col md="6">
              <v-select
                v-model="selectedEstimationType"
                messages="Type de modèle"
                @change="onChangeEstimationType"
                :items="estimationTypes"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              Nous avons détecté que le modèle le plus proche des données effectives est de type
              {{ getSelectedDataset().previsions.bestType }} avec pour coefficients a =
              {{ getSelectedDataset().previsions[getSelectedDataset().previsions.bestType].bestA }}
              et b =
              {{ getSelectedDataset().previsions[getSelectedDataset().previsions.bestType].bestB }}
            </v-col>
            <v-col md="6">
              <div>
                La formule utilisée pour estimer les données futures est <br />
                {{ getCurrentFormula() }}
              </div>
            </v-col>
            <v-col md="6"> </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <v-btn depressed @click="resetPrevisions"> Restaurer </v-btn>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="textFieldCoefficientA"
                prefix="a = "
                :rules="[validateCoefficientInput]"
                @change="onChangeTextCoefficientA"
              />
              <v-container>
                <v-row>
                  <v-text-field
                    v-model="textFieldCoefficientB"
                    prefix="b = "
                    :rules="[validateCoefficientInput]"
                    @change="onChangeTextCoefficientB"
                    :disabled="switchAutoB"
                  />
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <div v-bind="attrs" v-on="on">
                        <v-switch
                          v-model="switchAutoB"
                          label="auto"
                          @change="onChangeSwitchAutoB"
                        />
                      </div>
                    </template>
                    <div>
                      Mettre automatiquement à jour le coefficient b en fonction de a pour
                      positionner la courbe sur les dernières données connues
                    </div>
                  </v-tooltip>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-card-text>
    <v-card-text>
      Lecture : {{ filteredChartData.lecture }}<br />
      Source : <a :href="filteredChartData.source.link">{{ filteredChartData.source.title }}</a>
    </v-card-text>
  </CardLayout>
</template>

<script>
import GenericChart from '@/components/charts/GenericChart.vue';
import CardLayout from '@/components/layout/CardLayout.vue';
import {
  estimationTypes,
  getBestFitLineExpValues,
  getBestFitLineLogValues,
  getBestFitLineValues,
  getCoefficientBToMatchValue,
  getEstimatedValuesFromCoefficients,
  getMeanSquaredDeviation,
} from '@/utils/computing';

export default {
  data() {
    return {
      displayEstimationBtn: false,
      estimationTypes: Object.values(estimationTypes),
      min: 0,
      max: 0,
      lastEstimatedYear: 2050,
      range: [0, 0],
      completedChartData: undefined,
      filteredChartData: undefined,
      selectedDataset: undefined,
      selectedEstimationType: undefined,
      textFieldCoefficientA: '',
      textFieldCoefficientB: '',
      switchAutoB: false,
    };
  },
  beforeMount() {
    [this.min, this.max] = [
      this.chartData.labels[0],
      this.chartData.labels[this.chartData.labels.length - 1],
    ];
    let index = 0;
    let minValue = 0;

    do {
      minValue = this.chartData.labels[index];
      index += 1;
    } while (minValue < 2000 && this.chartData.labels[index]);
    this.range = [minValue, this.max];

    this.completeDatasetWithPrevision();
    this.filterChartData();
  },
  components: {
    GenericChart,
    CardLayout,
  },
  props: {
    chartData: {},
    chartType: undefined,
  },
  methods: {
    displayEstimation() {
      this.displayEstimationBtn = !this.displayEstimationBtn;
      if (this.displayEstimationBtn) {
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
    },
    getArrayOfYearsToPredict() {
      const lastYearWithEffectiveData = parseInt(
        this.chartData.labels[this.chartData.labels.length - 1],
        10,
      );
      const completionLength = this.lastEstimatedYear - lastYearWithEffectiveData;
      const futureYears = new Array(completionLength);
      for (let i = 0; i < completionLength; i += 1) {
        futureYears[i] = lastYearWithEffectiveData + i + 1;
      }

      return futureYears;
    },
    completeDatasetWithPrevision() {
      this.completedChartData = {
        ...this.chartData,
      };

      const futureYears = this.getArrayOfYearsToPredict();
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
            bestType = estimationTypes.LINEAR;
            estimatedValues = getEstimatedValuesFromCoefficients(
              futureYears,
              linearValues.a,
              linearValues.b,
              estimationTypes.LINEAR,
            );
            break;
          case expDeviation:
            bestType = estimationTypes.EXPONENTIAL;
            estimatedValues = getEstimatedValuesFromCoefficients(
              futureYears,
              expValues.a,
              expValues.b,
              estimationTypes.EXPONENTIAL,
            );
            break;
          case logDeviation:
            bestType = estimationTypes.LOGARITHMIC;
            estimatedValues = getEstimatedValuesFromCoefficients(
              futureYears,
              logValues.a,
              logValues.b,
              estimationTypes.LOGARITHMIC,
            );
            break;
          default:
            break;
        }

        return {
          ...dataset,
          fill: false,
          borderWidth: 1,
          data: dataset.data.concat(estimatedValues),
          previsions: {
            bestType, // type of closest model to the effective data
            selectedType: bestType, // current selected type for prevision
            [estimationTypes.LINEAR]: {
              bestA: linearValues.a, // coefficient a for the closest linear model computed
              currentA: linearValues.a, // current coefficient a of linear model for prevision
              bestB: linearValues.b,
              currentB: linearValues.b,
              autoB: false, // auto compute coefficient b to match last dataset value
            },
            [estimationTypes.EXPONENTIAL]: {
              bestA: expValues.a,
              currentA: expValues.a,
              bestB: expValues.b,
              currentB: expValues.b,
              autoB: false,
            },
            [estimationTypes.LOGARITHMIC]: {
              bestA: logValues.a,
              currentA: logValues.a,
              bestB: logValues.b,
              currentB: logValues.b,
              autoB: false,
            },
          },
        };
      });

      this.selectedDataset = this.chartData.datasets[0].label;
      const { previsions } = this.getSelectedDataset();
      this.selectedEstimationType = previsions.selectedType;
      this.textFieldCoefficientA = previsions[previsions.selectedType].bestA;
      this.textFieldCoefficientB = previsions[previsions.selectedType].bestB;
    },
    previsionsInfo() {
      return `Prévisions à partir de ${this.chartData.labels[this.chartData.labels.length - 1]}`;
    },
    getSelectedDataset() {
      return this.completedChartData.datasets.find(
        (dataset) => dataset.label === this.selectedDataset,
      );
    },
    onChangeSelectedDatasetForPrevision() {
      const { previsions } = this.getSelectedDataset();
      this.selectedEstimationType = previsions.selectedType;
      this.textFieldCoefficientA = previsions[previsions.selectedType].currentA;
      this.textFieldCoefficientB = previsions[previsions.selectedType].currentB;
      this.switchAutoB = previsions[previsions.selectedType].autoB;
    },
    onChangeEstimationType() {
      const { previsions } = this.getSelectedDataset();
      if (previsions.selectedType !== this.selectedEstimationType) {
        /* model for dataset changed -> update computed predicted data */
        previsions.selectedType = this.selectedEstimationType;
        this.textFieldCoefficientA = previsions[previsions.selectedType].currentA;
        this.textFieldCoefficientB = previsions[previsions.selectedType].currentB;
        this.switchAutoB = previsions[previsions.selectedType].autoB;
        this.updateEstimationData();
      }
    },
    onChangeTextCoefficientA(val) {
      // accept comma and dot as decimal separator
      const number = parseFloat(val.replace(',', '.'));
      const dataset = this.getSelectedDataset();
      const { previsions } = dataset;

      if (Number.isNaN(number)) {
        // invalid input
        this.textFieldCoefficientA = previsions[previsions.selectedType].currentA.toString();
      } else {
        previsions[previsions.selectedType].currentA = number;
        if (this.switchAutoB) {
          // auto update b
          const lastDataIndex = this.chartData.labels.length - 1;
          previsions[previsions.selectedType].currentB = getCoefficientBToMatchValue(
            this.chartData.labels[lastDataIndex],
            dataset.data[lastDataIndex], // last known value in this dataset,
            number,
            previsions.selectedType,
          );
          this.textFieldCoefficientB = previsions[previsions.selectedType].currentB;
        }
        this.updateEstimationData();
      }
    },
    onChangeTextCoefficientB(val) {
      const number = parseFloat(val.replace(',', '.'));
      const { previsions } = this.getSelectedDataset();

      if (Number.isNaN(number)) {
        // invalid input
        this.textFieldCoefficientB = previsions[previsions.selectedType].currentB.toString();
      } else {
        previsions[previsions.selectedType].currentB = number;
        this.updateEstimationData();
      }
    },
    onChangeSwitchAutoB() {
      const dataset = this.getSelectedDataset();
      const { previsions } = dataset;
      previsions[previsions.selectedType].autoB = this.switchAutoB;
      if (this.switchAutoB) {
        const lastDataIndex = this.chartData.labels.length - 1;
        previsions[previsions.selectedType].currentB = getCoefficientBToMatchValue(
          this.chartData.labels[lastDataIndex],
          dataset.data[lastDataIndex], // last known value in this dataset,
          previsions[previsions.selectedType].currentA,
          previsions.selectedType,
        );
        this.textFieldCoefficientB = previsions[previsions.selectedType].currentB;

        console.log(
          getEstimatedValuesFromCoefficients(
            [this.chartData.labels[lastDataIndex]],
            previsions[previsions.selectedType].currentA,
            previsions[previsions.selectedType].currentB,
            previsions.selectedType,
          ),
        );
        this.updateEstimationData();
      }
    },
    validateCoefficientInput(val) {
      return !Number.isNaN(parseFloat(val)) || 'Ce champ doit être un nombre';
    },
    updateEstimationData() {
      const dataset = this.getSelectedDataset();
      const futureYears = this.getArrayOfYearsToPredict();

      // get current coefficients
      const { currentA, currentB } = dataset.previsions[dataset.previsions.selectedType];
      const newValues = getEstimatedValuesFromCoefficients(
        futureYears,
        currentA,
        currentB,
        dataset.previsions.selectedType,
      );

      dataset.data.splice(
        dataset.data.length - futureYears.length,
        futureYears.length,
        ...newValues,
      );
      this.filterChartData();
    },
    getCurrentFormula() {
      switch (this.selectedEstimationType) {
        case estimationTypes.LINEAR:
          return 'y = a X x + b';
        case estimationTypes.EXPONENTIAL:
          return 'y = e^b X e^ax';
        case estimationTypes.LOGARITHMIC:
          return 'y = a X ln(x) + b';
        default:
          return '';
      }
    },
    resetPrevisions() {
      const { previsions } = this.getSelectedDataset();

      // auto select best estimation type
      previsions.selectedType = previsions.bestType;
      this.selectedEstimationType = previsions.bestType;

      // reset current coefficients
      Object.values(estimationTypes).forEach((type) => {
        const coeffs = previsions[type];
        coeffs.currentA = coeffs.bestA;
        coeffs.currentB = coeffs.bestB;
        coeffs.autoB = false;
      });

      this.textFieldCoefficientA = previsions[previsions.bestType].bestA;
      this.textFieldCoefficientB = previsions[previsions.bestType].bestB;
      this.switchAutoB = false;

      this.updateEstimationData();
    },
  },
};
</script>

<style></style>
