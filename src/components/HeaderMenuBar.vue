<template>
    <div class="header">
        <Menubar :model="items" breakpoint="500px" class="header-menubar">
            <template #start>
                <div class="header-title flex m-4 mr-12 text-4xl font-bold items-center">
                    {{ title }}
                </div>
            </template>
            <template #item="{ item, props }">
                <div class="flex mr-4 ml-4 items-center">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span>{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span>{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
                </a></div>
            </template>
            <template #end>
                <ThemeSwitcher class="hidden-theme-switcher"/>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";
const title = ref('PY505');
const items = ref([
    {
        label: '基础设置',
        route: '/',
    },
    {
        label: '高级设置',
        route: '/CameraAdvancedSettings',
    }
]);
</script>
