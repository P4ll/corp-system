<template>
    <q-layout view="hHh lpR fFf">
        <my-menu/>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import MyMenu from './components/Menu.vue'

export default {
    components: {
        MyMenu
    },

    created() {
        document.title = "Лабораторные работы";
    },

    mounted() {
      document.title = "Лабораторная работа";
    },

    data() {
        return {
        };
    },
};
</script>
