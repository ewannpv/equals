<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  props: {
    chartData: Object,
    options: Object,
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
