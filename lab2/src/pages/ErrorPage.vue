<template>
    <q-page class="fit column wrap items-center">
        <img src="../assets/oops.jpg" @click="getBack()" class="cursor-pointer"/>
        <p>
            {{this.$t('errorPage.error404')}}
        </p>
        <p>
            {{this.$t('errorPage.pageNF')}}
        </p>
        <q-btn :label="this.$t('errorPage.onMain')" @click="getBack()"/>
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
