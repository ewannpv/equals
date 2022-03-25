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
      item-disabled="locked"
      selectable
      :items="treeViewItems"
      :v-model="selectedItems"
      @input="onUpdateItems"
      selection-type="independent"
    />
  </div>
</template>

<script>
import { getTreeViewFromNetwork } from '@/utils/service';
import { generateTreeView, getEvolution, updateTreeView } from '@/utils/treeView';

export default {
  components: {},
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
      this.treeViewItems = updateTreeView(this.treeViewItems, this.selectedItems, this.range);
      console.log('2', getEvolution(this.treeViewItems, this.range, this.selectedItems));
    },
    onUpdateItems(items) {
      this.treeViewItems = updateTreeView(this.treeViewItems, this.selectedItems, this.range);
      this.selectedItems = items;
      console.log(this.treeViewItems);
      console.log('3', getEvolution(this.treeViewItems, this.selectedItems, this.range, items));
    },
    async setTreeView() {
      const tmpTree = await generateTreeView();
      this.treeViewItems = updateTreeView(tmpTree, this.selectedItems, this.range);
      console.log('1', this.treeViewItems);
    },
  },
};
</script>

<style></style>
