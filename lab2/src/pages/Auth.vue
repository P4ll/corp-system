<template>
    <q-page class="flex flex-center column">
        <div>
            <q-input
                label="Логин"
                v-model="login"
                :error="!isLoginValid"
                :error-message="loginMess"
            />
            <q-input
                label="Имя"
                v-model="name"
                :error="!isNameValid"
                :error-message="nameMess"
            />
            <q-input
                label="Пароль"
                v-model="pass"
                type="password"
                :error="!isPassValid"
                :error-message="passMess"
            />
            <q-input
                label="Повторите пароль"
                v-model="repPass"
                type="password"
                :error="!isRepPassValid"
                error-message="Пароли должны совпадать"
            />
            <q-select
                label="Страна"
                v-model="country"
                :options="countries"
                :error="!isCountryValid"
                error-message="Страна не была выбрана"
            />
            <q-input
                label="Возраст"
                v-model="age"
                :error="!isAgeValid"
                :error-message="ageMess"
            />
            <q-btn
                @click="register()"
                label="Зарегистрироваться"
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
            countries: ["Россия", "Украина", "Белорусь", "Казахстан"],
        };
    },

    watch: {
        login() {
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
            if (this.name.length < 3) {
                this.nameMess = "Введено меньше 3-х символов";
                this.isNameValid = false;
            } else {
                this.isNameValid = true;
            }
        },

        pass() {
            if (/[а-яА-ЯёЁ]/i.test(this.pass)) {
                this.passMess = "Нельзя использовать кириллицу";
                this.isPassValid = false;
            } else if (this.pass.length < 3) {
                this.passMess = "Введено меньше 3-х символов";
                this.isPassValid = false;
            } else {
                this.isPassValid = true;
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
            console.log(this.age);
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
        emptyIfNull(str) {
            if (str == null) return "";
        },

        register() {
            if (this.login == null) return;
            if (this.age == null) this.age = "";
            if (this.country == null) this.country = "";

            if (
                this.isLoginValid &&
                this.isPassValid &&
                this.isRepPassValid &&
                this.isNameValid &&
                this.isCountryValid &&
                this.isAgeValid
            ) {
                this.$q.notify({
                    color: "positive",
                    message: "Пользователь успешно зарегистрирован",
                });
                // TODO рега
                this.login = null;
                this.pass = null;
                this.repPass = null;
                this.age = null;
                this.country = null;
                this.name = null;
            } else {
                this.$q.notify({
                    color: "negative",
                    message: "Какие-то поля заполнены неверно",
                });
            }
        },
    },
};
</script>
