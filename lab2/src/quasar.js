import Vue from "vue";

import "./styles/quasar.sass";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "@quasar/extras/ionicons-v4/ionicons-v4.css";
import "@quasar/extras/mdi-v4/mdi-v4.css";
import "@quasar/extras/eva-icons/eva-icons.css";
import { Quasar, Notify, Meta, Dialog } from "quasar";

Vue.use(Quasar, {
    config: {
        brand: {
            primary: "#027BE3",
            secondary: "#26A69A",
            accent: "#9C27B0",

            dark: "#1d1d1d",

            positive: "#21BA45",
            negative: "#C10015",
            info: "#31CCEC",
            warning: "#F2C037",
        },
    },
    components: {
        /* not needed if importStrategy is not 'manual' */
    },
    directives: {
        /* not needed if importStrategy is not 'manual' */
    },
    plugins: {
        Notify,
        Meta,
        Dialog
    },
});
