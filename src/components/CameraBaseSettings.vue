<template>
    <div class="card space-y-8">
        <div class="setting-header text-2xl font-bold">
            基础设置
        </div>
        <div class="setting-body flex flex-col space-y-4">
            <CameraSetting v-for="setting in camera_base_settings" :key="setting.name" :setting="setting"
                :onSettingChange="onCameraSettingChange" />
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { camera_settings, onCameraSettingChange, cameraSettingGetterSetupFunc, cameraSettingGetterCleanupFunc } from '../camera_settings'
import CameraSetting from './CameraSetting.vue'

const camera_base_settings = computed(() => {
    return camera_settings.settings.filter(setting => !setting.is_advanced)
})

onMounted(cameraSettingGetterSetupFunc)
onUnmounted(cameraSettingGetterCleanupFunc)

</script>