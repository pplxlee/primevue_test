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
            <Button type="button" @click="reboot_dialog_visible = true" class="w-full" :disabled="camera_settings.error_flag">
                重启相机</Button>
        </div>
    </div>
    <Dialog v-model:visible="reboot_dialog_visible" modal header="重启相机" :style="{ width: '25rem' }" @keyup.enter="onRebootButtonClicked">
        <div class="flex items-center gap-4 mb-4">
            <label class="font-semibold w-24">是否重启相机</label>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="取消" severity="secondary" @click="reboot_dialog_visible = false"></Button>
            <Button type="button" label="确定" @click="onRebootButtonClicked"></Button>
        </div>
    </Dialog>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { camera_settings, onCameraSettingChange, sendCameraCommand, cameraSettingGetterSetupFunc, cameraSettingGetterCleanupFunc } from '../camera_settings'
import CameraSetting from './CameraSetting.vue'

const reboot_dialog_visible = ref(false);

const onRebootButtonClicked = async () => {
    reboot_dialog_visible.value = false;
    await sendCameraCommand('reboot', true);
}

const camera_advanced_settings = computed(() => {
    return camera_settings.settings.filter(setting => setting.is_advanced)
})

onMounted(cameraSettingGetterSetupFunc)
onUnmounted(cameraSettingGetterCleanupFunc)
</script>