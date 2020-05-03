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
                    Лабораторная работа
                </q-toolbar-title>
                <div class="flex" v-if="!this.$store.getters.getAuthState">
                    <div class="q-mx-md cursor-pointer" @click="goLogIn()">
                        Войти
                    </div>
                    <div class="q-mx-md cursor-pointer" @click="goSignUp()">
                        Зарегистрироваться
                    </div>
                </div>
                <div class="flex" v-else>
                    <div>Вы вошли как</div>
                    <div class="q-ml-sm cursor-pointer" @click="goProfile()">
                        {{ $store.getters.getCurrentUser.login }}
                    </div>
                    <div class="q-mx-md cursor-pointer" @click="logOut()">
                        Выйти
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
                        <q-icon name="shuffle" color="primary"/>
                    </q-item-section>
                    <q-item-section>
                        График функции
                    </q-item-section>
                </q-item>
                <q-item clickable @click="$router.push('/userdata')">
                    <q-item-section avatar>
                        <q-icon name="account_circle" color="primary"/>
                    </q-item-section>
                    <q-item-section>
                        Профиль пользователя
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
            this.$$router.push("/login");
            this.$q.notify({
                color: "warning",
                message: "Вы успешно вышли из системы",
            });
        },
    },
};
</script>
