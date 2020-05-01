<template>
    <q-page class="flex flex-center column">
        <q-form @submit="register()">
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
                :error="!isPassValid"
                :error-message="passMess"
            />
            <q-input
                label="Повторите пароль"
                v-model="repPass"
                :error="!isRepPassValid"
                error-message="Пароли должны совпадать"
            />
            <q-input
                label="Страна"
                v-model="country"
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
                type="submit"
                label="Зарегистрироваться"
                class="full-width"
            />
        </q-form>
    </q-page>
</template>
<script>
export default {
    /**
     * TODO
     * 1. Использовать watch на обычных свойствах
     * 2. Все computed переместить в data
     */
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
            ageMEss: null,
        };
    },

    computed: {
        isLoginValid() {
            if (this.login.length < 3) {
                this.loginMess = "Введено меньше 3-х символов";
                return false;
            }
            if (/[a-zA-Z]/i.test(this.login)) {
                return true;
            } else {
                this.loginMess = "Только латинские символы";
                return false;
            }
        },

        isNameValid() {
            if (this.name.length < 3) {
                this.nameMess = "Введено меньше 3-х символов";
                return false;
            }
            return true;
        },

        isPassValid() {
            if (/[а-яА-ЯёЁ]/i.test(this.pass)) {
                this.passMess = "Нельзя использовать кириллицу";
                return false;
            }
            if (this.pass.length < 3) {
                this.passMess = "Введено меньше 3-х символов";
                return false;
            }
            return true;
        },

        isRepPassValid() {},

        isCountryValid() {},

        isAgeValid() {},
    },

    methods: {
        register() {},
    },
};
</script>
