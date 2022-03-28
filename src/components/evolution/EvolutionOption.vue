<template>
  <div :v-if="this.treeViewItems.length > 0" class="my-3">
    <v-row>
      <v-col md="6" cols="12">
        <v-row class="text-h5 my-2 mx-0"> Année de référence </v-row>
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
      <v-col md="6" cols="12">
        <v-row class="text-h5 my-2 mx-2"> Informations </v-row>

        <v-row class="text-body-2 mx-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus iusto provident quod
          omnis at, magni fuga asperiores maiores laboriosam doloremque iure necessitatibus, qui cum
          perspiciatis exercitationem reiciendis in veritatis veniam!</v-row
        >
      </v-col>
    </v-row>
    <v-row class="text-h5 my-2 mx-0"> Source de données </v-row>

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
      this.$emit('updateEquity', [equity, this.range[1]]);
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
      this.$emit('updateEquity', [equity, this.range[1]]);
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
