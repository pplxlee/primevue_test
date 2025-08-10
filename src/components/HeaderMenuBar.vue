<template>
    <div class="header">
        <Menubar :model="items" breakpoint="40rem" class="header-menubar">
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
                    </a>
                </div>
            </template>
            <template #end>
                <div class="flex items-center">
                    <ThemeSwitcher v-show="false" class="hidden-theme-switcher" />
                    <LanguageSwitcher class="language-switcher" />
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './LanguageSwitcher.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';

const { t } = useI18n();

const title = ref('PY505');
const items = computed(() => [
    {
        label: t('camera.base_settings'),
        route: '/',
    },
    {
        label: t('camera.advanced_settings'),
        route: '/CameraAdvancedSettings',
    },
    // {
    //     label: t('menu.wifi'),
    //     route: '/WifiConnection',
    // }
]);
</script>