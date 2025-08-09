<template>
    <div class="flex list-none m-4 p-0 gap-2 items-center">
        <Select 
            v-model="currentLocale" 
            :options="availableLocales" 
            option-label="name" 
            option-value="code"
            @change="changeLocale"
            :placeholder="$t('language.select_placeholder')"
            :pt="{
                root: { class: 'language-select' },
                input: { class: 'language-select-input' }
            }"
        >
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                    <span :class="'flag flag-' + getFlagClass(slotProps.value)" class="mr-2"></span>
                    <div>{{ getLanguageName(slotProps.value) }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex items-center">
                    <span :class="'flag flag-' + getFlagClass(slotProps.option.code)" class="mr-2"></span>
                    <div>{{ slotProps.option.name }}</div>
                </div>
            </template>
        </Select>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { setI18nLanguage } from '../i18n';

const { t } = useI18n();

const currentLocale = ref('en');
const availableLocales = ref([
    { name: t('language.english'), code: 'en' },
    { name: t('language.chinese'), code: 'zh' },
    // { name: '日本語', code: 'ja' },
    // { name: 'Español', code: 'es' },
    // { name: 'Français', code: 'fr' }
]);

// 初始化当前语言
onMounted(() => {
    const savedLocale = localStorage.getItem('preferredLocale');
    if (savedLocale && availableLocales.value.some(locale => locale.code === savedLocale)) {
        currentLocale.value = savedLocale;
    } else {
        // 根据浏览器语言设置默认语言
        const browserLocale = navigator.language.split('-')[0];
        if (availableLocales.value.some(locale => locale.code === browserLocale)) {
            currentLocale.value = browserLocale;
        }
    }
    
    // 更新语言显示名称
    updateLocaleNames();
});

const updateLocaleNames = () => {
    availableLocales.value = [
        { name: t('language.english'), code: 'en' },
        { name: t('language.chinese'), code: 'zh' },
    ];
};

const changeLocale = async (event) => {
    const newLocale = event.value;
    currentLocale.value = newLocale;
    localStorage.setItem('preferredLocale', newLocale);
    
    // 设置i18n语言
    await setI18nLanguage(newLocale);
    
    // 更新语言显示名称
    updateLocaleNames();
    
    // 发出语言更改事件，以便其他组件可以监听
    const localeChangeEvent = new CustomEvent('localeChanged', { 
        detail: { locale: newLocale } 
    });
    window.dispatchEvent(localeChangeEvent);
};

const getLanguageName = (code) => {
    const locale = availableLocales.value.find(item => item.code === code);
    return locale ? locale.name : '';
};

const getFlagClass = (code) => {
    // 将语言代码映射到旗帜类
    const flagMap = {
        'en': 'us',
        'zh': 'cn',
        'ja': 'jp',
        'es': 'es',
        'fr': 'fr'
    };
    return flagMap[code] || 'us';
};
</script>

<style scoped>
.flag {
    width: 24px;
    height: 16px;
    display: inline-block;
}

.language-select {
    min-width: 140px;
}
</style>