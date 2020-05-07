<template>
    <q-page class="fit column wrap items-center">
        <div class="q-mt-md">
            <div class="row">
                <div class="col" v-if="this.$store.getters.isAdmin">
                    <q-select
                        v-model="selectedUserLogin"
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        :options="options"
                        @filter="filterFn"
                        :hint="this.$t('usrData.uSel')"
                    >
                        <template v-slot:no-option>
                            <q-item>
                                <q-item-section class="text-grey">
                                    No results
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <q-input
                        :label="this.$t('auth.login')"
                        v-model="login"
                        :error="!isLoginValid"
                        :error-message="loginMess"
                        :disable="!canWrite"
                    />
                </div>
                <div class="col q-pl-lg">
                    <q-btn
                        color="primary"
                        v-if="!canWrite"
                        @click="canWrite = true"
                        :label="this.$t('usrData.update')"
                        class="full-width q-mt-md"
                    />
                    <q-btn
                        color="primary"
                        v-else
                        @click="saveUserData()"
                        :label="this.$t('usrData.endUpdate')"
                        class="full-width q-mt-md"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <q-input
                        :label="this.$t('auth.name')"
                        v-model="name"
                        :error="!isNameValid"
                        :error-message="nameMess"
                        :disable="!canWrite"
                    />
                </div>
                <div class="col q-pl-lg">
                    <q-btn
                        color="primary"
                        v-if="!canWrite"
                        @click="openSavePassMenu()"
                        :label="this.$t('usrData.changePass')"
                        class="full-width q-mt-md"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <q-select
                        :label="this.$t('auth.country')"
                        v-model="country"
                        :options="countries"
                        :error="!isCountryValid"
                        :error-message="this.$t('auth.fromErrors.country')"
                        :disable="!canWrite"
                    />
                </div>
                <div class="col q-pl-lg">
                    <q-btn
                        color="negative"
                        v-if="!canWrite"
                        @click="delUser()"
                        :label="this.$t('usrData.delUser')"
                        class="full-width q-mt-md"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <q-input
                        :label="this.$t('auth.age')"
                        v-model="age"
                        :error="!isAgeValid"
                        :error-message="ageMess"
                        :disable="!canWrite"
                    />
                </div>
                <div class="col"></div>
            </div>
        </div>
        <q-dialog v-model="canChangePass" persistent>
            <q-card style="width: 400px;">
                <q-card-section>
                    <div class="text-h5">
                        {{ this.$t("usrData.changePass") }}
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-input
                        v-model="oldPass"
                        :label="this.$t('usrData.oldPass')"
                        type="password"
                    />
                </q-card-section>
                <q-card-section>
                    <q-input
                        v-model="pass"
                        type="password"
                        :error="!isPassValid"
                        :error-message="passMess"
                        :label="this.$t('usrData.newPass')"
                    />
                </q-card-section>
                <q-card-section>
                    <q-input
                        v-model="repPass"
                        type="password"
                        :error="!isRepPassValid"
                        :error-message="this.$t('auth.formErrors.passEq')"
                        :label="this.$t('auth.repPass')"
                    />
                </q-card-section>
                <q-card-section
                    class="fit row  justify-center items-center content-center"
                >
                    <q-btn
                        color="primary"
                        :label="this.$t('usrData.cancel')"
                        @click="canChangePass = false"
                        class="q-mr-xl"
                    />
                    <q-btn
                        color="primary"
                        :label="this.$t('usrData.save')"
                        @click="savePass()"
                        class="q-ml-xl"
                    />
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
export default {
    data() {
        return {
            currUser: null,
            options: null,
            selectedUserLogin: null,
            oldPass: null,
            canChangePass: false,
            canWrite: false,
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
        };
    },

    meta() {
        return {
            title: this.$t("usrData.title"),
        };
    },

    beforeCreate() {
        if (!this.$store.getters.getAuthState) {
            this.$router.push("/errorpage");
        }
    },

    beforeMount() {
        this.resetToDef();
    },

    computed: {
        allUsersLogins() {
            return this.$store.getters.getAllUsersLogins;
        },
    },

    watch: {
        selectedUserLogin(newVal) {
            this.$store.dispatch("getUserByLogin", newVal).then((val) => {
                this.currUser = val;
                this.login = this.currUser.login;
                this.name = this.currUser.name;
                this.age = this.currUser.age;
                this.country = this.currUser.country;
                this.options = this.allUsersLogins;
            });
        },

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
        delUser() {
            this.$q
                .dialog({
                    title: this.$t("usrData.nt.isOk"),
                    message: this.$t("usrData.nt.delMess"),
                    cancel: true,
                    persistent: true,
                })
                .onOk(() => {
                    this.$store.dispatch("delUser", this.currUser);
                    if (
                        this.$store.getters.getCurrentUser.id ==
                        this.currUser.id
                    ) {
                        this.$router.push("/login");
                    } else {
                        this.resetToDef();
                    }
                });
        },

        saveUserData() {
            if (
                this.isLoginValid &&
                this.isNameValid &&
                this.isCountryValid &&
                this.isAgeValid
            ) {
                if (
                    !this.$store.getters.getAllUsersLogins.includes(
                        this.login
                    ) ||
                    this.currUser.login == this.login
                ) {
                    let usr = this.currUser;
                    usr.name = this.name;
                    usr.login = this.login;
                    usr.age = this.age;
                    usr.country = this.country;
                    this.$store.dispatch("updateUser", usr);
                    this.canWrite = false;
                } else {
                    this.$q.notify({
                        color: "negative",
                        message: this.$t("auth.nt.usedLogin"),
                    });
                }
            } else {
                this.$q.notify({
                    color: "negative",
                    message: this.$t("auth.nt.someInpIsWrong"),
                });
            }
        },

        openSavePassMenu() {
            this.canChangePass = true;
            this.oldPass = null;
            this.pass = null;
            this.repPass = null;
        },

        savePass() {
            if (this.oldPass == null || this.oldPass == "") {
                this.$q.notify({
                    color: "negative",
                    message: this.$t("usrData.nt.inpOldPass"),
                });
                return;
            }
            let usr = this.currUser;
            let sha256 = require("js-sha256").sha256;
            let oldHash = sha256(this.oldPass);
            if (oldHash != usr.pass) {
                this.$q.notify({
                    color: "negative",
                    message: this.$t("usrData.nt.oldPassWrong"),
                });
                return;
            }
            if (this.isPassValid && this.isRepPassValid) {
                usr.pass = sha256(this.pass);
                this.$store.dispatch("updateUser", usr);
                this.canChangePass = false;
                this.$q.notify({
                    color: "positive",
                    message: this.$t("usrData.nt.success"),
                });
            }
        },

        filterFn(val, update) {
            update(() => {
                const needle = val.toLowerCase();
                this.options = this.allUsersLogins.filter(
                    (v) => v.toLowerCase().indexOf(needle) > -1
                );
            });
        },

        resetToDef() {
            this.currUser = this.$store.getters.getCurrentUser;
            this.login = this.currUser.login;
            this.name = this.currUser.name;
            this.age = this.currUser.age;
            this.country = this.currUser.country;
            this.options = this.allUsersLogins;
            this.selectedUserLogin = this.login;
        },

        resetToNull() {
            this.currUser = null;
            this.login = null;
            this.name = null;
            this.age = null;
            this.country = null;
            this.options = null;
            this.selectedUserLogin = null;
        },
    },
};
</script>
