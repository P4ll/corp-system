<template>
  <div class="small">
    <line-chart :chart-data="datacollection" :options="options"></line-chart>
    <q-btn color="primary" label="Rand" @click="fillData()"></q-btn>
  </div>
</template>

<style>
  .small {
    max-width: 600px;
    margin: 150px auto;
  }
</style>

<script>
import LineChart from '../components/LineCharts.js'
import { QBtn } from 'quasar'
export default {
  components: {
    LineChart,
    QBtn
  },
  data() {
    return {
      datacollection: null,
      option: null
    }
  },

  created() {
    this.datacollection = {}
    this.option = {
      responsive: true,
      title: {
        display: true,
        text: 'Line Chart'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'my dataset',
          backgroundColor: '#F00',
          borderColor: '#F00',
          data: [
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor()
          ],
          fill: false,
        }, {
          label: 'my 2 dataset',
          fill: false,
          backgroundColor: '#0F0',
          borderColor: '#0F0',
          data: [
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor(),
            this.randomScalingFactor()
          ]
        }]
      }
    },
    randomScalingFactor() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>
