<template>
    <div>
        <q-header bordered class="bg-primary text-white">
            <q-toolbar>
                <q-btn
                    dense
                    flat
                    round
                    icon="menu"
                    @click="left = !left"
                    v-if="this.$store.getters.getAuthState"
                />

                <q-toolbar-title>
                    {{ this.$t("menu.siteTitle") }}
                </q-toolbar-title>
                <div class="q-mr-md">
                    <q-btn-dropdown
                        split
                        class="glossy"
                        color="primary"
                        :label="currLang"
                    >
                        <q-list>
                            <q-item
                                clickable
                                v-close-popup
                                @click="changeLang('ru')"
                            >
                                <q-item-section>
                                    <q-item-label>{{
                                        this.$t("menu.lang.ru")
                                    }}</q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item
                                clickable
                                v-close-popup
                                @click="changeLang('en')"
                            >
                                <q-item-section>
                                    <q-item-label>{{
                                        this.$t("menu.lang.en")
                                    }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </div>
                <div class="flex" v-if="!this.$store.getters.getAuthState">
                    <div class="q-mx-md cursor-pointer" @click="goLogIn()">
                        {{ this.$t("menu.enter") }}
                    </div>
                    <div class="q-mx-md cursor-pointer" @click="goSignUp()">
                        {{ this.$t("menu.reg") }}
                    </div>
                </div>
                <div class="flex" v-else>
                    <div>{{ this.$t("menu.hello") }}</div>
                    <div class="q-ml-sm cursor-pointer" @click="goProfile()">
                        {{ $store.getters.getCurrentUser.login }}
                    </div>
                    <div class="q-mx-md cursor-pointer" @click="logOut()">
                        {{ this.$t("menu.exit") }}
                    </div>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="left"
            side="left"
            overlay
            behavior="desktop"
            bordered
        >
            <!-- drawer content -->
            <q-list>
                <q-item clickable @click="$router.push('/chart')">
                    <q-item-section avatar>
                        <q-icon name="shuffle" color="primary" />
                    </q-item-section>
                    <q-item-section>
                        {{ this.$t("menu.funcChart") }}
                    </q-item-section>
                </q-item>
                <q-item clickable @click="$router.push('/userdata')">
                    <q-item-section avatar>
                        <q-icon name="account_circle" color="primary" />
                    </q-item-section>
                    <q-item-section>
                        {{ this.$t("menu.userProfile") }}
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currLang: this.$store.getters.getLang,
            left: false,
        };
    },

    methods: {
        goLogIn() {
            this.$router.push("/login");
        },

        goSignUp() {
            this.$router.push("/auth");
        },

        goProfile() {
            this.$router.push("/userdata");
        },

        logOut() {
            this.$store.dispatch("logOut");
            this.$router.push("/login");
            this.$q.notify({
                color: "warning",
                message: this.$t("menu.nt.exit"),
            });
        },

        changeLang(lang) {
            this.$i18n.locale = lang;
            this.$store.dispatch("setLang", lang);
            this.currLang = lang;
        },
    },
};
</script>
