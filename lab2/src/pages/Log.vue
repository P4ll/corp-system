<template>
    <q-page class="flex flex-center column">
        <q-form @submit="logIn()">
            <q-input label="Логин" />
            <q-input label="Пароль" />
            <q-btn type="submit" label="Войти" class="full-width q-mt-md" />
        </q-form>
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
            title: "Вход",
        };
    },

    watch: {
        login(newVal) {
            if (newVal == null) {
                this.isLoginValid = true;
                return;
            }
            if (newVal.length < 3) {
                this.loginMess = "Введено меньше 3-х символов";
                this.isLoginValid = false;
            } else if (/[a-zA-Z]/i.test(newVal)) {
                this.isLoginValid = true;
            } else {
                this.loginMess = "Только латинские символы";
                this.isLoginValid = false;
            }
        },

        pass(newVal) {
            if (newVal == null) {
                this.isPassValid = true;
                return;
            }
            if (/[а-яА-ЯёЁ]/i.test(newVal)) {
                this.passMess = "Нельзя использовать кириллицу";
                this.isPassValid = false;
            } else if (newVal.length < 3) {
                this.passMess = "Введено меньше 3-х символов";
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
        logIn() {},
    },
};
</script>
