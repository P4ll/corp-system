<template>
    <q-page class="flex flex-center column">
        <q-form @submit="logIn()" v-if="!this.$store.getters.getAuthState">
            <q-input
                v-model="login"
                :label="this.$t('auth.login')"
                :error="!isLoginValid"
                :error-message="loginMess"
            />
            <q-input
                v-model="pass"
                :label="this.$t('auth.pass')"
                type="password"
                :error="!isPassValid"
                :error-message="passMess"
            />
            <q-btn type="submit" label="Войти" class="full-width q-mt-md" />
        </q-form>
        <div v-else>
            <q-btn
                color="primary"
                @click="logOut()"
                :label="this.$t('menu.exit')"
            />
        </div>
    </q-page>
</template>
<script>
export default {
    data() {
        return {
            isLoginValid: true,
            isPassValid: true,
            login: null,
            pass: null,
            loginMess: null,
            passMess: null,
        };
    },

    meta() {
        return {
            title: this.$t("log.title"),
        };
    },

    watch: {
        login(newVal) {
            if (newVal == null) {
                this.isLoginValid = true;
                return;
            }
            if (newVal.length < 3) {
                this.loginMess = this.$t("auth.formErrors.less3sym");
                this.isLoginValid = false;
            } else if (/[a-zA-Z]/i.test(newVal)) {
                this.isLoginValid = true;
            } else {
                this.loginMess = this.$t("auth.formErrors.latinOnly");
                this.isLoginValid = false;
            }
        },

        pass(newVal) {
            if (newVal == null) {
                this.isPassValid = true;
                return;
            }
            if (/[а-яА-ЯёЁ]/i.test(newVal)) {
                this.passMess = this.$t("auth.formErrors.noCyr");
                this.isPassValid = false;
            } else if (newVal.length < 3) {
                this.passMess = this.$t("auth.formErrors.less3sym");
                this.isPassValid = false;
            } else {
                this.isPassValid = true;
                if (this.repPass == newVal) {
                    this.isRepPassValid = true;
                }
            }
        },
    },

    methods: {
        logOut() {
            this.$store.dispatch("logOut");
            this.$router.push("/login");
            this.$q.notify({
                color: "warning",
                message: this.$t("log.nt.succExit"),
            });
        },

        logIn() {
            if (this.pass == null) this.isPassValid = false;
            if (this.login == null) this.isLoginValid = false;

            if (this.isLoginValid && this.isPassValid) {
                let sha256 = require("js-sha256").sha256;
                let hashed = sha256(this.pass);

                let users = this.$store.getters.getAllUsers;
                for (let i = 0; i < users.length; ++i) {
                    if (
                        users[i].login == this.login &&
                        users[i].pass == hashed
                    ) {
                        this.$router.push("/chart");
                        this.$store.dispatch("logIn", users[i]);

                        this.$q.notify({
                            color: "positive",
                            message: this.$t("log.nt.succEnter"),
                        });
                        return;
                    }
                    if (users[i].login == this.login) {
                        this.$q.notify({
                            color: "negative",
                            message: this.$t("log.nt.wrPass"),
                        });

                        return;
                    }
                }

                this.$q.notify({
                    color: "negative",
                    message: this.$t("log.nt.wrPass"),
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
