<template>
    <q-page class="flex flex-center column">
        <div>
            <q-input
                :label="this.$t('auth.login')"
                v-model="login"
                :error="!isLoginValid"
                :error-message="loginMess"
            />
            <q-input
                :label="this.$t('auth.name')"
                v-model="name"
                :error="!isNameValid"
                :error-message="nameMess"
            />
            <q-input
                :label="this.$t('auth.pass')"
                v-model="pass"
                type="password"
                :error="!isPassValid"
                :error-message="passMess"
            />
            <q-input
                :label="this.$t('auth.repPass')"
                v-model="repPass"
                type="password"
                :error="!isRepPassValid"
                :error-message="this.$t('auth.formErrors.passEq')"
            />
            <q-select
                :label="this.$t('auth.country')"
                v-model="country"
                :options="countries"
                :error="!isCountryValid"
                :error-message="this.$t('auth.formErrors.county')"
            />
            <q-input
                :label="this.$t('auth.age')"
                v-model="age"
                :error="!isAgeValid"
                :error-message="ageMess"
            />
            <q-btn
                @click="register()"
                :label="this.$t('auth.reg')"
                class="full-width q-mt-md"
            />
        </div>
    </q-page>
</template>
<script>
export default {
    data() {
        return {
            loginMess: null,
            login: null,
            nameMess: null,
            name: null,
            passMess: null,
            pass: null,
            repPass: null,
            country: null,
            age: null,
            ageMess: null,
            isLoginValid: true,
            isNameValid: true,
            isPassValid: true,
            isRepPassValid: true,
            isCountryValid: true,
            isAgeValid: true,
            countries: this.$t("auth.countries"),
            canLog: true,
        };
    },

    meta() {
        return {
            title: this.$t("auth.title"),
        };
    },

    beforeCreate() {
        if (this.$store.getters.getAuthState) {
            this.$router.push("login");
        }
    },

    watch: {
        login() {
            if (this.login == null) {
                this.isLoginValid = true;
                return;
            }
            if (this.login.length < 3) {
                this.loginMess = this.$t("auth.formErrors.less3sym");
                this.isLoginValid = false;
            } else if (/[a-zA-Z]/i.test(this.login)) {
                this.isLoginValid = true;
            } else {
                this.loginMess = this.$t("auth.formErrors.latinOnly");
                this.isLoginValid = false;
            }
        },

        name() {
            if (this.name == null) {
                this.isNameValid = true;
                return;
            }
            if (this.name.length < 3) {
                this.nameMess = this.$t("auth.formErrors.less3sym");
                this.isNameValid = false;
            } else {
                this.isNameValid = true;
            }
        },

        pass() {
            if (this.pass == null) {
                this.isPassValid = true;
                return;
            }
            if (/[а-яА-ЯёЁ]/i.test(this.pass)) {
                this.passMess = this.$t("auth.formErrors.noCyr");
                this.isPassValid = false;
            } else if (this.pass.length < 3) {
                this.passMess = this.$t("auth.formErrors.less3sym");
                this.isPassValid = false;
            } else {
                this.isPassValid = true;
                if (this.repPass == this.pass) {
                    this.isRepPassValid = true;
                }
            }
        },

        repPass() {
            if (this.pass != this.repPass) {
                this.isRepPassValid = false;
            } else {
                this.isRepPassValid = true;
            }
        },

        country(newVal) {
            if (newVal == "") {
                this.isCountryValid = false;
            } else {
                this.isCountryValid = true;
            }
        },

        age() {
            if (this.age == null) {
                this.isAgeValid = true;
                return;
            }
            if (this.age == "") {
                this.isAgeValid = false;
                this.ageMess = this.$t("auth.formErrors.ageInp");
            } else if (isNaN(this.age)) {
                this.isAgeValid = false;
                this.ageMess = this.$t("auth.formErrors.notANumber");
            } else if (Number(this.age) < 1 || Number(this.age) > 150) {
                this.isAgeValid = false;
                this.ageMess = this.$t("auth.formErrors.wrNumb");
            } else if (/[.,]/.test(this.age)) {
                this.isAgeValid = false;
                this.ageMess = this.$t("auth.formErrors.notAInt");
            } else {
                this.isAgeValid = true;
            }
        },
    },

    methods: {
        emptyIfNull(str) {
            if (str == null) return "";
        },

        register() {
            if (this.login == null) this.isLoginValid = false;
            if (this.name == null) this.isNameValid = false;
            if (this.pass == null) this.isPassValid = false;
            if (this.repPass == null) this.isRepPassValid = false;
            if (this.country == null) this.isCountryValid = false;
            if (this.age == null) this.isAgeValid = false;

            if (
                this.isLoginValid &&
                this.isPassValid &&
                this.isRepPassValid &&
                this.isNameValid &&
                this.isCountryValid &&
                this.isAgeValid
            ) {
                let sha256 = require("js-sha256").sha256;
                if (
                    this.$store.getters.getAllUsersLogins.includes(this.login)
                ) {
                    this.$q.notify({
                        color: "negative",
                        message: this.$t("auth.nt.usedLogin"),
                    });
                    this.loginMess = "";
                    this.isLoginValid = false;
                    return;
                }
                let user = {
                    login: this.login,
                    pass: sha256(this.pass),
                    name: this.name,
                    age: this.age,
                    country: this.country,
                    funcs: [],
                    isAdmin: false,
                };

                this.$store.dispatch("addNewUser", user);

                this.login = null;
                this.pass = null;
                this.repPass = null;
                this.age = null;
                this.country = null;
                this.name = null;
                this.$q.notify({
                    color: "positive",
                    message: this.$t("auth.nt.succesReg"),
                });
                let timer = setTimeout(() => this.$router.push("/login"), 3000);
                this.$q
                    .dialog({
                        title: this.$t("auth.nt.authRed"),
                        message: this.$t("auth.nt.stOnPage"),
                        cancel: true,
                        html: true,
                        parent: this,
                    })
                    .onOk(() => {
                        clearTimeout(timer);
                        this.$router.push("/login");
                    })
                    .onCancel(() => {
                        clearTimeout(timer);
                    })
                    .onDismiss(() => {
                        clearTimeout(timer);
                    });
            } else {
                this.$q.notify({
                    color: "negative",
                    message: this.$t("auth.nt.someInpIsWrong"),
                });
            }
        },
    },
};
</script>
