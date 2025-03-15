<template>
    <div class="setting-item flex items-center justify-between">
        <div class="setting-item-left flex items-center w-4/12">
            {{ setting.description }}
        </div>
        <div class="setting-item-right flex items-center w-8/12 min-w-48">
            <div v-if="setting.type === 'select'" class="w-full">
                <Select v-model="setting.current_value" :options="setting.selections" optionLabel="description"
                    optionValue="value" @update:modelValue="onSettingChange(setting.name, $event)"
                    class="setting-item-right-select w-full">
                </Select>
            </div>
            <div v-else-if="setting.type === 'line'" class="w-full ml-3">
                <div class="setting-item-right-line w-full">
                    {{ setting.current_description }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    setting: Object,
    onSettingChange: Function
})
</script>