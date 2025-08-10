<template>
    <div class="card space-y-8">
        <div class="setting-header text-2xl font-bold">
            {{ $t('camera.advanced_settings') }}
        </div>
        <!-- 错误信息 -->
        <Message severity="error" v-if="camera_settings.error_flag" class="setting-error">
            {{ camera_settings.error_message ? camera_settings.error_message : $t('error_msg.common_error') }}
        </Message>
        <!-- 设置内容 -->
        <div class="setting-body flex flex-col space-y-4">
            <CameraSetting v-for="setting in camera_advanced_settings_translated" :key="setting.name" :setting="setting"
                :setting_writable="camera_settings.settings_writable" :onSettingChange="onCameraSettingChange" />
            <Button type="button" @click="reboot_dialog_visible = true" class="w-full" :disabled="camera_settings.error_flag">
                {{ $t('camera.reboot') }}</Button>
        </div>
    </div>
    <Dialog v-model:visible="reboot_dialog_visible" modal :header="$t('camera.reboot_camera')" :style="{ width: '25rem' }" @keyup.enter="onRebootButtonClicked">
        <div class="flex items-center gap-4 mb-4">
            <label class="font-semibold w-24">{{ $t('camera.confirm_reboot') }}</label>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" :label="$t('camera.cancel')" severity="secondary" @click="reboot_dialog_visible = false"></Button>
            <Button type="button" :label="$t('camera.confirm')" @click="onRebootButtonClicked"></Button>
        </div>
    </Dialog>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { camera_settings, onCameraSettingChange, sendCameraCommand, cameraSettingGetterSetupFunc, cameraSettingGetterCleanupFunc } from '../camera_settings'
import CameraSetting from './CameraSetting.vue'

const { t } = useI18n();
const reboot_dialog_visible = ref(false);

const onRebootButtonClicked = async () => {
    reboot_dialog_visible.value = false;
    await sendCameraCommand('reboot', true);
}

const camera_advanced_settings = computed(() => {
    return camera_settings.settings.filter(setting => setting.is_advanced)
})
const camera_advanced_settings_translated = computed(() => {
    return camera_advanced_settings.value.map(setting => {
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