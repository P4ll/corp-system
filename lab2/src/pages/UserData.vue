<template>
    <q-page class="fit column wrap items-center">
        <div class="q-mt-md">
            <div class="row">
                <div class="col">
                    <q-input
                        label="Логин"
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
                        label="Редактировать"
                        class="full-width q-mt-md"
                    />
                    <q-btn
                        color="primary"
                        v-else
                        @click="saveUserData()"
                        label="Закончить редактирование"
                        class="full-width q-mt-md"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <q-input
                        label="Имя"
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
                        label="Изменить пароль"
                        class="full-width q-mt-md"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <q-select
                        label="Страна"
                        v-model="country"
                        :options="countries"
                        :error="!isCountryValid"
                        error-message="Страна не была выбрана"
                        :disable="!canWrite"
                    />
                </div>
                <div class="col"></div>
            </div>
            <div class="row">
                <div class="col">
                    <q-input
                        label="Возраст"
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
                    <div class="text-h5">Изменить пароль</div>
                </q-card-section>
                <q-card-section>
                    <q-input
                        v-model="oldPass"
                        label="Старый пароль"
                        type="password"
                    />
                </q-card-section>
                <q-card-section>
                    <q-input
                        v-model="pass"
                        type="password"
                        :error="!isPassValid"
                        :error-message="passMess"
                        label="Новый пароль"
                    />
                </q-card-section>
                <q-card-section>
                    <q-input
                        v-model="repPass"
                        type="password"
                        :error="!isRepPassValid"
                        error-message="Пароли не совпадают"
                        label="Повторите пароль"
                    />
                </q-card-section>
                <q-card-section
                    class="fit row  justify-center items-center content-center"
                >
                    <q-btn
                        color="primary"
                        label="Отмена"
                        @click="canChangePass = false"
                        class="q-mr-xl"
                    />
                    <q-btn
                        color="primary"
                        label="Сохранить"
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
            countries: ["Россия", "Украина", "Белорусь", "Казахстан"],
        };
    },

    meta() {
        return {
            title: "Панель настройки пользователя",
        };
    },

    beforeCreate() {
        if (!this.$store.getters.getAuthState) {
            this.$router.push("/errorpage");
        }
    },

    beforeMount() {
        let curUser = this.$store.getters.getCurrentUser;
        this.login = curUser.login;
        this.name = curUser.name;
        this.age = curUser.age;
        this.country = curUser.country;
    },

    watch: {
        login() {
            if (this.login == null) {
                this.isLoginValid = true;
                return;
            }
            if (this.login.length < 3) {
                this.loginMess = "Введено меньше 3-х символов";
                this.isLoginValid = false;
            } else if (/[a-zA-Z]/i.test(this.login)) {
                this.isLoginValid = true;
            } else {
                this.loginMess = "Только латинские символы";
                this.isLoginValid = false;
            }
        },

        name() {
            if (this.name == null) {
                this.isNameValid = true;
                return;
            }
            if (this.name.length < 3) {
                this.nameMess = "Введено меньше 3-х символов";
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
                this.passMess = "Нельзя использовать кириллицу";
                this.isPassValid = false;
            } else if (this.pass.length < 3) {
                this.passMess = "Введено меньше 3-х символов";
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
                this.ageMess = "Введите возраст";
            } else if (isNaN(this.age)) {
                this.isAgeValid = false;
                this.ageMess = "Введено не число";
            } else if (Number(this.age) < 1 || Number(this.age) > 150) {
                this.isAgeValid = false;
                this.ageMess = "Возраст не принадлежит отрезку [1, 150]";
            } else if (/[.,]/.test(this.age)) {
                this.isAgeValid = false;
                this.ageMess = "Введен нецелочисленный возраст";
            } else {
                this.isAgeValid = true;
            }
        },
    },

    methods: {
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
                    this.$store.getters.getCurrentUser.login == this.login
                ) {
                    let usr = this.$store.getters.getCurrentUser;
                    usr.name = this.name;
                    usr.login = this.login;
                    usr.age = this.age;
                    usr.country = this.country;
                    this.$store.dispatch("updateUser", usr);
                    this.canWrite = false;
                } else {
                    this.$q.notify({
                        color: "negative",
                        message: "Такой логин уже используется",
                    });
                }
            } else {
                this.$q.notify({
                    color: "negative",
                    message: "Какие-то поля не заполнены / заполнены неверно",
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
                    message: "Введите старый пароль",
                });
                return;
            }
            let usr = this.$store.getters.getCurrentUser;
            let sha256 = require("js-sha256").sha256;
            let oldHash = sha256(this.oldPass);
            if (oldHash != usr.pass) {
                this.$q.notify({
                    color: "negative",
                    message: "Старый пароль неверен",
                });
                return;
            }
            if (this.isPassValid && this.isRepPassValid) {
                usr.pass = sha256(this.pass);
                this.$store.dispatch("updateUser", usr);
                this.canChangePass = false;
                this.$q.notify({
                    color: "positive",
                    message: "Пароль успешно сменен",
                });
            }
        },
    },
};
</script>
