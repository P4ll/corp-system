<template>
    <q-page class="flex flex-center column">
        <q-form @submit="logIn()">
            <q-input v-model="login" label="Логин" :error="!isLoginValid" :error-message="loginMess"/>
            <q-input v-model="pass" label="Пароль" type="password" :error="!isPassValid" :error-message="passMess"/>
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
                            message: "Вы успешно вошли в систему",
                        });
                        return;
                    }
                }
            } else {
                this.$q.notify({
                    color: "negative",
                    message: "Какие-то поля не заполнены / заполнены неверно",
                });
            }
        },
    },
};
</script>
