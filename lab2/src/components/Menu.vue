<template>
    <div>
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
    </div>
</template>
<script>
export default {
    data() {
        return {
            left: false,
        }
    }
}
</script>