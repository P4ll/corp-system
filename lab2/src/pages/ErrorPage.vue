<template>
    <q-page class="fit column wrap items-center">
        <img src="../assets/oops.jpg" @click="getBack()" class="cursor-pointer"/>
        <p>
            Ошибка 404
        </p>
        <p>
            Страница не нашлась
        </p>
        <q-btn label="На главную" @click="getBack()"/>
    </q-page>
</template>
<script>
export default {
    data() {
        return {};
    },

    methods: {
        getBack() {
            this.$router.push({
                path: "/login",
            });
        },
    },
};
</script>
