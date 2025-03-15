<template>
    <div class="card space-y-8">
        <div class="setting-header text-2xl font-bold">
            高级设置
        </div>
        <div class="setting-body flex flex-col space-y-4">
            <div v-for="(setting, index) in camera_advanced_settings" :key="index"
                class="setting-item flex items-center justify-between">
                <div class="setting-item-left flex items-center w-4/12">
                    {{ setting.description }}
                </div>
                <div class="setting-item-right flex items-center w-8/12 min-w-48">
                    <div v-if="setting.type === 'select'">
                        <Select v-model="setting.current_value" :options="setting.selections" optionLabel="description"
                            optionValue="value" @update:modelValue="onSettingChange(setting.name, $event)"
                            class="setting-item-right-select">
                        </Select>
                    </div>
                    <div v-else-if="setting.type === 'line'">
                        <div class="setting-item-right-line">
                            {{ setting.current_description }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { camera_settings } from '../camera_settings'

const camera_advanced_settings = computed(() => {
    return camera_settings.settings.filter(setting => setting.is_advanced)
})

const onSettingChange = (name, value) => {
    fetch('http://127.0.0.1:5000/api/v1/camera_settings/set', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            settings: [{
                name: name,
                value: value
            }]
        })
    })
}

const intervalId = ref()

onMounted(() => {
    intervalId.value = setInterval(() => {
        fetch('http://127.0.0.1:5000/api/v1/camera_settings/get')
            .then(response => response.json())
            .then(data => {
                camera_settings.settings = data
            })
    }, 1000)
})

// 在组件卸载时清除定时器
onUnmounted(() => {
    clearInterval(intervalId.value)
})

</script>