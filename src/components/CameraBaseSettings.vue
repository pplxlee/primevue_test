<template>
    <div class="card space-y-8">
        <div class="setting-header text-2xl font-bold">
            {{ $t('camera.base_settings') }}
        </div>
        <!-- 错误信息 -->
        <Message severity="error" v-if="camera_settings.error_flag" class="setting-error">
            {{ camera_settings.error_message ? camera_settings.error_message : $t('error_msg.common_error') }}
        </Message>
        <!-- 设置内容 -->
        <div class="setting-body flex flex-col space-y-4">
            <CameraSetting v-for="setting in camera_base_settings_translated" :key="setting.name" :setting="setting"
                :setting_writable="camera_settings.settings_writable" :onSettingChange="onCameraSettingChange" />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { camera_settings, onCameraSettingChange, cameraSettingGetterSetupFunc, cameraSettingGetterCleanupFunc } from '../camera_settings'
import CameraSetting from './CameraSetting.vue'

const { t } = useI18n();

const camera_base_settings = computed(() => {
    return camera_settings.settings.filter(setting => !setting.is_advanced)
})
const camera_base_settings_translated = computed(() => {
    return camera_base_settings.value.map(setting => {
        const currentDescriptionTranslationKey = `camera.settings.${setting.name}_values.${setting.current_value}`;
        const currentDescriptionTranslatedValue = t(currentDescriptionTranslationKey);
        const currentDescription = currentDescriptionTranslatedValue === currentDescriptionTranslationKey ? setting.current_description : currentDescriptionTranslatedValue;
        // 如果有selections需要翻译
        if (setting.type === 'select' && setting.selections) {
            const translatedSelections = setting.selections.map(selection => {
                // 尝试获取翻译值，如果没有则使用原值
                const translationKey = `camera.settings.${setting.name}_values.${selection.value}`;
                const translatedValue = t(translationKey);

                return {
                    ...selection,
                    description: translatedValue !== translationKey ? translatedValue : selection.description
                };
            });

            return {
                ...setting,
                label: t(`camera.settings.${setting.name}`),
                current_description: currentDescription,
                selections: translatedSelections
            };
        }
        return {
            ...setting,
            current_description: currentDescription,
            label: t(`camera.settings.${setting.name}`)
        }
    })
})

onMounted(cameraSettingGetterSetupFunc)
onUnmounted(cameraSettingGetterCleanupFunc)

</script>