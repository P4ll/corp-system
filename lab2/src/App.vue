<template>
    <q-layout view="hHh lpR fFf">
        <q-header bordered class="bg-primary text-white">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="left = !left" />

                <q-toolbar-title>
                    Лабораторная работа
                </q-toolbar-title>
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
                <q-item>
                    123
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
    mounted() {
      document.title = "Лабораторная работа";
    },

    data() {
        return {
            left: false,
        };
    },
};
</script>
