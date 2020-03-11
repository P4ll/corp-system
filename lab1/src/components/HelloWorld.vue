<template>
  <div class="small">
    <div id="formula">
      <h6>f(x) = </h6>
      <q-input v-model="text" label="A" class="coef-inp" />
      <h6> x^3 + </h6>
      <q-input v-model="text" label="B" class="coef-inp" />
      <h6> * x + </h6>
      <q-input v-model="text" label="C" class="coef-inp" />
    </div>
    <q-input v-model="digit" label="C" />
    <div id="main">
      <line-chart :chart-data="datacollection" :options="options"></line-chart>
      <q-color v-model="hex" no-header no-footer class="color-picker" />
    </div>
    <q-btn color="primary" label="Rand" @click="fillData()"></q-btn>
    <div class="q-pa-md">
      <q-badge color="secondary">Model: {{ value }} (-20 to 20, step 1)</q-badge>
      <q-slider v-model="value" :min="-20" :max="20" :step="1" label color="light-green" />
    </div>
    <div class="q-pa-md">
      <q-badge color="secondary">Model: {{ value }} (-20 to 20, step 1)</q-badge>
      <q-slider v-model="value" :min="-20" :max="20" :step="1" label color="light-green" />
    </div>
  </div>
</template>

<style>
#formula {
  display: flex;
}

#main {
  display: flex;
  flex-grow: 1;
}

.coef-inp {
  margin: 1%;
  width: 5%;
}

.color-picker {
  flex: 0 0 5vw;
  height: 10%;
}

.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>

<script>
import LineChart from "../components/LineCharts.js";
import { QBtn } from "quasar";
export default {
  components: {
    LineChart,
    QBtn
  },
  data() {
    return {
      datacollection: null,
      option: null
    };
  },

  created() {
    this.datacollection = {};
    this.option = {
      responsive: true,
      title: {
        display: true,
        text: "Line Chart"
      },
      tooltip: {
        mode: "index",
        intersect: false
      },
      hover: {
        mode: "nearest",
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Value"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Value"
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "my dataset",
            backgroundColor: "#F00",
            borderColor: "#F00",
            data: [
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor()
            ],
            fill: false
          },
          {
            label: "my 2 dataset",
            fill: false,
            backgroundColor: "#0F0",
            borderColor: "#0F0",
            data: [
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor(),
              this.randomScalingFactor()
            ]
          }
        ]
      };
    },
    randomScalingFactor() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>
