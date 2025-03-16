<template>
    <div class="card space-y-8">
        <div class="setting-header text-2xl font-bold">
            高级设置
        </div>
        <!-- 错误信息 -->
        <Message severity="error" v-if="camera_settings.error_flag" class="setting-error">
            {{ camera_settings.error_message }}
        </Message>
        <!-- 设置内容 -->
        <div class="setting-body flex flex-col space-y-4">
            <CameraSetting v-for="setting in camera_advanced_settings" :key="setting.name" :setting="setting"
                :setting_writable="camera_settings.settings_writable" :onSettingChange="onCameraSettingChange" />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { camera_settings, onCameraSettingChange, cameraSettingGetterSetupFunc, cameraSettingGetterCleanupFunc } from '../camera_settings'
import CameraSetting from './CameraSetting.vue'

const camera_advanced_settings = computed(() => {
    return camera_settings.settings.filter(setting => setting.is_advanced)
})

onMounted(cameraSettingGetterSetupFunc)
onUnmounted(cameraSettingGetterCleanupFunc)
</script>