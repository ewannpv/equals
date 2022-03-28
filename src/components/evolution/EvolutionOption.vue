<template>
  <div :v-if="this.treeViewItems.length > 0" class="my-3">
    <v-row class="text-h5"> Options </v-row>
    <v-row>
      <v-col md="6" cols="12">
        <v-range-slider
          v-model="range"
          :max="max"
          :min="min"
          @input="onUpdateSlider"
          hide-details
          class="align-center"
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
    <v-treeview
      open-all
      item-disabled="locked"
      selectable
      :items="treeViewItems"
      :v-model="selectedItems"
      @input="onUpdateItems"
      selection-type="leaf"
    />
  </div>
</template>

<script>
import { getTreeViewFromNetwork } from '@/utils/service';
// eslint-disable-next-line object-curly-newline
import {
  generateTreeView,
  getEvolution,
  getEvolutionGap,
  updateTreeView,
  getEquity,
} from '@/utils/treeView';

export default {
  data() {
    return {
      checkbox: true,
      min: 2000,
      max: 2020,
      lastEstimatedYear: 2050,
      range: [0, 0],
      treeViewItems: [],
      selectedItems: [],
    };
  },
  mounted() {
    this.range = [this.min, this.max];
    getTreeViewFromNetwork().then((data) => this.setTreeView(data));
  },
  methods: {
    onUpdateSlider() {
      this.treeViewItems = updateTreeView(this.treeViewItems, this.range);

      const evolution = getEvolution(this.treeViewItems, this.range, this.selectedItems);
      const evolutionGap = getEvolutionGap(this.treeViewItems, this.range, this.selectedItems);
      const equity = getEquity(evolutionGap, this.range);

      this.$emit('updateEvolution', evolution);
      this.$emit('updateEvolutionGap', evolutionGap);
      this.$emit('updateEquity', equity);
      this.$emit('updateOptionCard');
    },
    onUpdateItems(items) {
      this.treeViewItems = updateTreeView(this.treeViewItems, this.range);
      this.selectedItems = items;

      const evolution = getEvolution(this.treeViewItems, this.range, this.selectedItems);
      const evolutionGap = getEvolutionGap(this.treeViewItems, this.range, this.selectedItems);
      const equity = getEquity(evolutionGap, this.range);

      this.$emit('updateEvolution', evolution);
      this.$emit('updateEvolutionGap', evolutionGap);
      this.$emit('updateEquity', equity);
      this.$emit('updateOptionCard');
    },
    async setTreeView() {
      const tmpTree = await generateTreeView();
      this.treeViewItems = updateTreeView(tmpTree, this.range);
    },
  },
};
</script>

<style></style>
