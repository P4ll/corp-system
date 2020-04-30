<template>
    <q-page class="fit column wrap  items-center">
        <div class="row q-pa-md">
            <div class="col"></div>
            <div class="col-12">
                <graph :chartData="dataCollection" />
            </div>
            <div class="col"></div>
        </div>
        <div class="row q-pa-md">
            <div class="col">
                <q-badge color="secondary">Масштаб по X: {{ xScale }} </q-badge>
                <q-slider
                    v-model="xScale"
                    :min="1"
                    :max="100"
                    :step="1"
                    label
                    color="light-green"
                    style="width: 300px"
                />
            </div>
        </div>
        <div class="row q-pa-md">
            <div class="col">
                <q-badge color="secondary">Масштаб по Y: {{ yScale }} </q-badge>
                <q-slider
                    v-model="yScale"
                    :min="1"
                    :max="100"
                    :step="1"
                    label
                    color="light-green"
                    style="width: 300px"
                />
            </div>
        </div>
        <div class="row justify-between">
            <div class="col">
                <q-btn @click="updateDialog = true" label="Редактировать" />
            </div>
            <div class="col"></div>
            <div class="col">
                <q-btn @click="addDialog = true" label="Добавить" />
            </div>
        </div>
        <q-dialog v-model="addDialog">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h5">Добавить функцию</div>
                </q-card-section>
                <q-card-section>
                    <q-input label="Имя функции" v-model="curFuncName" hint="Можно оставить пустым"/>
                </q-card-section>
                <q-card-section>
                    <div class="text-h7">Параметры функции</div>

                    <div id="formula">
                        <q-input
                            v-model="aCoef"
                            label="A"
                            class="coef-inp"
                            :error="aIsWrong"
                            error-message="Не числовое значение"
                        />
                        <q-input
                            v-model="bCoef"
                            label="B"
                            class="coef-inp"
                            :error="bIsWrong"
                            error-message="Не числовое значение"
                        />
                        <q-input
                            v-model="cCoef"
                            label="C"
                            class="coef-inp"
                            :error="cIsWrong"
                            error-message="Не числовое значение"
                        />
                    </div>
                </q-card-section>
                <q-card-section>
                    <katex-element :expression="resExp" />
                </q-card-section>
                <q-card-section>
                    <q-input
                        label="Цвет"
                        v-model="curFuncColor"
                        :error="colorIsWrong"
                        error-message="Неправильный цвет"
                        hint="Цвет в HEX формате"
                    >
                        <template v-slot:append>
                            <q-icon name="colorize" class="cursor-pointer">
                                <q-popup-proxy :breakpoint="600">
                                    <q-color
                                        v-model="curFuncColor"
                                        style="max-width: 250px"
                                    />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                        <template v-slot:prepend>
                            <q-icon name="label" :style="funcLabelColor" />
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-section>
                    <q-btn
                        label="Добавить"
                        class="full-width"
                        @click="addChart()"
                        color="primary"
                    />
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="updateDialog">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">Update</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    Click/Tap on the backdrop.
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import Graph from "../components/Graph.vue";

export default {
    components: {
        Graph,
    },

    data() {
        return {
            dataCollection: null,
            addDialog: false,
            updateDialog: false,
            curFuncColor: "#e0b279",
            aCoef: null,
            bCoef: null,
            cCoef: null,
            curFuncName: null,
            xScale: 0,
            yScale: 0,
            funcs: [],
        };
    },

    computed: {
        funcLabelColor() {
            return `color: ${this.curFuncColor}`;
        },

        resExp() {
            let out = "f(x)=";

            if (this.aCoef !== null) out += `${this.aCoef}`;
            out += "x^3+";
            if (this.bCoef !== null) out += `${this.bCoef}`;
            out += "x";
            if (this.cCoef !== null && this.cCoef !== "")
                out += `+${this.cCoef}`;

            return out;
        },

        aIsWrong() {
            return isNaN(this.aCoef) || this.aCoef == "";
        },

        bIsWrong() {
            return isNaN(this.bCoef) || this.bCoef == "";
        },

        cIsWrong() {
            return isNaN(this.cCoef) || this.cCoef == "";
        },

        colorIsWrong() {
            const regExColor = RegExp("^#[0-9a-fA-F]{6}$");
            return !regExColor.test(this.curFuncColor);
        },
    },

    watch: {
        // aCoef(newVal) {
        //     if (!isNaN(newVal)) {
        //         this.$refs.aCoef.error = false;
        //     } else {
        //         this.$refs.aCoef.error = true;
        //     }
        // },
    },

    created() {
        this.dataCollection = {};
    },

    methods: {
        updateChart() {},

        addChart() {
            if (this.aCoef === null) this.aCoef = "";
            if (this.bCoef === null) this.bCoef = "";
            if (this.cCoef === null) this.cCoef = "";

            if (
                !this.aIsWrong &&
                !this.bIsWrong &&
                !this.cIsWrong &&
                !this.colorIsWrong
            ) {
                this.addDialog = false;
                this.funcs.push({
                    name: this.curFuncName,
                    color: this.curFuncColor,
                    parms: [this.aCoef, this.bCoef, this.cCoef]
                });
                this.dataCollection = {
                    labels: [-20, 0, 10],
                    datasets: [
                        {
                            label: "first dataset",
                            data: [
                                {
                                    x: -10,
                                    y: 0,
                                },
                                {
                                    x: 0,
                                    y: 10,
                                },
                                {
                                    x: 10,
                                    y: 5,
                                },
                            ],
                        },
                    ],
                };
            }
        },
    },
};
</script>

<style scoped>
#formula {
    display: flex;
    flex-flow: column;
}

.coef-inp {
    margin: 1%;
}
</style>
