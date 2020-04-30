<template>
    <line-chart
        :chart-data="chartData"
        :option="options"
        width="700px"
        height="500px"
    />
</template>

<script>
import LineChart from "./LineCharts.js";

export default {
    props: {
        chartData: Object,
    },

    components: {
        LineChart,
    },

    data() {
        return {
            options: null,
        };
    },

    created() {
        this.options = {
            // responsive: true,
            // title: {
            //     display: true,
            //     text: "График",
            // },
            // tooltip: {
            //     mode: "index",
            //     intersect: false,
            // },
            // hover: {
            //     mode: "nearest",
            //     intersect: true,
            // },
            scales: {
                xAxes: [
                    {
                        display: true,
                        type: "linear",
                        position: "bottom",
                    },
                ],
            },
        };
    },

    methods: {
    },
};
</script>
