<template>
    <q-page class="fit column wrap items-center">
        <div class="row q-pa-md">
            <div class="col"></div>
            <div class="col-12">
                <graph :chartData="dataCollection" />
            </div>
            <div class="col"></div>
        </div>
        <div class="row q-pa-md">
            <div class="col">
                <q-badge color="secondary"
                    >{{ this.$t("graph.scale") }}: {{ xScale }}
                </q-badge>
                <q-slider
                    v-model="xScale"
                    :min="1"
                    :max="100"
                    :step="1"
                    label
                    color="light-green"
                    style="width: 300px"
                    @change="renderFuncs()"
                />
            </div>
        </div>
        <div class="row justify-between">
            <div class="col">
                <q-btn
                    color="primary"
                    @click="updateDialog = true"
                    :label="this.$t('graph.change')"
                />
            </div>
            <div class="col"></div>
            <div class="col">
                <q-btn
                    color="primary"
                    @click="addDialog = true"
                    :label="this.$t('graph.add')"
                />
            </div>
        </div>
        <q-dialog v-model="addDialog">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h5">{{ this.$t("graph.addFunc") }}</div>
                </q-card-section>
                <q-card-section>
                    <q-input
                        :label="this.$t('graph.addDialog.funcName')"
                        v-model="curFuncName"
                        :hint="this.$t('graph.addDialog.addHint')"
                    />
                </q-card-section>
                <q-card-section>
                    <div class="text-h7">
                        {{ this.$t("graph.addDialog.funcsParms") }}
                    </div>

                    <div id="formula">
                        <q-input
                            v-model="aCoef"
                            label="A"
                            class="coef-inp"
                            :error="aIsWrong"
                            :error-message="
                                this.$t('graph.addDialog.notANumber')
                            "
                        />
                        <q-input
                            v-model="bCoef"
                            label="B"
                            class="coef-inp"
                            :error="bIsWrong"
                            :error-message="
                                this.$t('graph.addDialog.notANumber')
                            "
                        />
                        <q-input
                            v-model="cCoef"
                            label="C"
                            class="coef-inp"
                            :error="cIsWrong"
                            :error-message="
                                this.$t('graph.addDialog.notANumber')
                            "
                        />
                    </div>
                </q-card-section>
                <q-card-section>
                    <katex-element :expression="resExp" />
                </q-card-section>
                <q-card-section>
                    <q-input
                        :label="this.$t('graph.addDialog.color')"
                        v-model="curFuncColor"
                        :error="colorIsWrong"
                        :error-message="this.$t('graph.addDialog.colorError')"
                        :hint="this.$t('graph.addDialog.colorHint')"
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
                        :label="this.$t('graph.add')"
                        class="full-width"
                        @click="addChart()"
                        color="primary"
                    />
                </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog v-model="updateDialog" ref="updateDialog">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h5">
                        {{ this.$t("graph.updateDialog.updateFunc") }}
                    </div>
                </q-card-section>
                <q-card-section class="fit row">
                    <q-select
                        class="col-9"
                        v-model="currentSelector"
                        :options="getAllFuncName"
                        :label="this.$t('graph.updateDialog.selectFunc')"
                    />
                    <div class="col-3 q-mt-md">
                        <q-btn
                            :label="this.$t('graph.updateDialog.delFunc')"
                            color="warning"
                            class="full-width"
                            @click="delFunc()"
                        />
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-input
                        :label="this.$t('graph.addDialog.funcName')"
                        v-model="curFuncName"
                        :hint="this.$t('graph.addDialog.addHint')"
                    />
                </q-card-section>
                <q-card-section>
                    <div class="text-h7">
                        {{ this.$t("graph.addDialog.funcsParms") }}
                    </div>

                    <div id="formula">
                        <q-input
                            v-model="aCoef"
                            label="A"
                            class="coef-inp"
                            :error="aIsWrong"
                            :error-message="
                                this.$t('graph.addDialog.notANumber')
                            "
                        />
                        <q-input
                            v-model="bCoef"
                            label="B"
                            class="coef-inp"
                            :error="bIsWrong"
                            :error-message="
                                this.$t('graph.addDialog.notANumber')
                            "
                        />
                        <q-input
                            v-model="cCoef"
                            label="C"
                            class="coef-inp"
                            :error="cIsWrong"
                            :error-message="
                                this.$t('graph.addDialog.notANumber')
                            "
                        />
                    </div>
                </q-card-section>
                <q-card-section>
                    <katex-element :expression="resExp" />
                </q-card-section>
                <q-card-section>
                    <q-input
                        :label="this.$t('graph.addDialog.color')"
                        v-model="curFuncColor"
                        :error="colorIsWrong"
                        :error-message="this.$t('graph.addDialog.colorError')"
                        :hint="this.$t('graph.addDialog.colorHint')"
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
                        :label="this.$t('graph.close')"
                        class="full-width"
                        @click="updateDialog = false"
                        color="primary"
                    />
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

    meta() {
        return {
            title: this.$t("graph.title"),
        };
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
            currentSelector: null,
            xScale: 1,
            yScale: 1,
            funcs: this.$store.getters.getCurrentUser.funcs,
            xMin: 5,
            xMax: 1000,
            yMin: 5,
            yMax: 1000,
        };
    },

    beforeCreate() {
        if (!this.$store.getters.getAuthState) {
            this.$router.push("/errorpage");
        }
    },

    created() {
        this.dataCollection = {};
    },

    mounted() {
        this.renderFuncs();
    },

    computed: {
        getAllFuncName() {
            let out = [];
            this.funcs.forEach((f, i) => {
                out.push({
                    label: `${i}. ${f.name}`,
                    value: i,
                });
            });
            return out;
        },

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
            if (this.aCoef == 0) return false;
            return isNaN(this.aCoef) || this.aCoef == "";
        },

        bIsWrong() {
            if (this.bCoef == 0) return false;
            return isNaN(this.bCoef) || this.bCoef == "";
        },

        cIsWrong() {
            if (this.cCoef == 0) return false;
            return isNaN(this.cCoef) || this.cCoef == "";
        },

        colorIsWrong() {
            const regExColor = RegExp("^#[0-9a-fA-F]{6}$");
            return !regExColor.test(this.curFuncColor);
        },
    },

    watch: {
        funcs(newVal) {
            this.$store.dispatch("setUserFuncs", newVal);
        },

        currentSelector(index) {
            index = index.value;
            this.curFuncName = this.funcs[index].name;
            this.aCoef = Number(this.funcs[index].parms[0]);
            this.bCoef = Number(this.funcs[index].parms[1]);
            this.cCoef = Number(this.funcs[index].parms[2]);
            this.curFuncColor = this.funcs[index].color;
        },

        updateDialog(newVal, oldVal) {
            if (newVal == true && oldVal == false) return;
            if (this.currentSelector == null) return;

            if (this.aCoef === null) this.aCoef = "";
            if (this.bCoef === null) this.bCoef = "";
            if (this.cCoef === null) this.cCoef = "";

            if (
                !this.aIsWrong &&
                !this.bIsWrong &&
                !this.cIsWrong &&
                !this.colorIsWrong
            ) {
                this.funcs[this.currentSelector.value] = {
                    name: this.curFuncName,
                    color: this.curFuncColor,
                    parms: [
                        Number(this.aCoef),
                        Number(this.bCoef),
                        Number(this.cCoef),
                    ],
                };
                this.resetFormData();
                this.renderFuncs();
            } else {
                this.updateDialog = true;
            }
        },
    },

    methods: {
        delFunc() {
            if (this.currentSelector == null) {
                this.$q.notify({
                    color: "negative",
                    message: this.$t("graph.updateDialog.delFuncErr"),
                });
            } else {
                let pos = this.currentSelector.value;
                this.$q.notify({
                    color: "positive",
                    message: `${this.currentSelector.label}\n${this.$t(
                        "graph.updateDialog.delSucc"
                    )}`,
                });
                this.funcs.splice(pos, 1);
                this.$store.dispatch("setUserFuncs", this.funcs);
                this.resetFormData();
                this.renderFuncs();
            }
        },

        getFuncVal(a, b, c, x) {
            return a * x ** 3 + b * x + c;
        },

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
                    parms: [
                        Number(this.aCoef),
                        Number(this.bCoef),
                        Number(this.cCoef),
                    ],
                });
                this.resetFormData();
                this.renderFuncs();
            }
        },

        renderFuncs() {
            let xx = [];
            let xlb = ((this.xMax - 10 * this.xScale) / 2) * -1;
            let xub = Math.abs(xlb);

            for (let i = xlb; i <= xub; i += 10) {
                xx.push(i);
            }

            let ds = []; // datasets
            this.funcs.forEach((f) => {
                let yy = [];
                xx.forEach((x) => {
                    yy.push(
                        this.getFuncVal(f.parms[0], f.parms[1], f.parms[2], x)
                    );
                });
                ds.push({
                    label:
                        f.name !== null && f.name !== ""
                            ? `${f.name}: ${f.parms[0]}x^3 + ${f.parms[1]}x + ${f.parms[2]}`
                            : `${f.parms[0]}x^3 + ${f.parms[1]}x + ${f.parms[2]}`,
                    pointStyle: "line",
                    backgroundColor: f.color,
                    borderColor: f.color,
                    fill: false,
                    data: yy,
                });
            });
            this.dataCollection = {
                labels: xx,
                datasets: ds,
            };
        },

        resetFormData() {
            this.aCoef = null;
            this.bCoef = null;
            this.cCoef = null;
            this.curFuncName = null;
            this.curFuncColor = "#e0b279";
            this.currentSelector = null;
        },

        test() {
            alert("test");
            this.updateDialog = true;
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
