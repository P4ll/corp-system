<template>
  <div class="small">
    <div id="formula">
      <h6>f(x) = </h6>
      <q-input v-model="aCoef" label="A" class="coef-inp" @change="fillData()"/>
      <h6> x^3 + </h6>
      <q-input v-model="bCoef" label="B" class="coef-inp" @change="fillData()"/>
      <h6> * x + </h6>
      <q-input v-model="cCoef" label="C" class="coef-inp" @change="fillData()"/>
    </div>
    <div id="main">
      <line-chart :chart-data="datacollection" :options="options" width="500px" height="500px"></line-chart>
      <q-color v-model="colorInHex" no-header no-footer class="color-picker" @change="fillData()"/>
    </div>
    <div class="q-pa-md">
      <q-badge color="secondary">Масштаб по X: {{ xScale }} </q-badge>
      <q-slider v-model="xScale" :min="1" :max="100" :step="1" label color="light-green" @change="fillData()" />
    </div>
    <div class="q-pa-md">
      <q-badge color="secondary">Масштаб по Y: {{ yScale }} </q-badge>
      <q-slider v-model="yScale" :min="1" :max="100" :step="1" label color="light-green" @change="fillData()"/>
    </div>
    {{test}}
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
//import { QBtn } from "quasar";
export default {
  components: {
    LineChart,
    //QBtn
  },
  data() {
    return {
      datacollection: null,
      option: null,
      aCoef: 0,
      bCoef: 0,
      cCoef: 0,
      xScale: 50,
      yScale: 50,
      colorInHex: "#ed1b0c",
      test: null,
      //test2: null
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
      let xlBound = -5 - 100 + this.xScale;
      let xrBound = Math.abs(xlBound);
      let ylBound = -5 - 100 + this.yScale;
      let yrBound = Math.abs(ylBound);
      let add = (xrBound - xlBound) / 10;
      add /= (yrBound / 3);

      let data = [];
      let xx = [];
      let minX = xrBound, maxX = xlBound;
      let a = this.aCoef, b = this.bCoef, c = this.cCoef;
      for (let i = xlBound; i <= xrBound; i += add) {
        let calcVal = a * Math.pow(i, 3) + b * i + c;
        if (calcVal >= ylBound && calcVal <= yrBound) {
          data.push({x: i, y: calcVal});
          minX = Math.min(minX, i);
          maxX = Math.max(maxX, i);
          xx.push((i).toFixed(2));
        }
      }
      //minX = Math.floor(minX);
      //maxX = Math.ceil(maxX);
      //for (let i = minX; i <= maxX; ++i) {
      //  xx.push(i);
      //}

      this.test = [xlBound, xrBound];
      this.datacollection = {
        labels: xx,
        datasets: [
          {
            label: "1",
            backgroundColor: this.colorInHex,
            pointStyle: "line",
            borderColor: this.colorInHex, 
            data: data,
            fill: false
          }
        ]
      };
    }
  }
};
</script>
