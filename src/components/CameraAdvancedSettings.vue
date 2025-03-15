<template>
    <div class="card space-y-8">
        <div class="card-header text-2xl font-bold">
            高级设置
        </div>
        <dev class="setting-body flex flex-col gap-4">
            <div v-for="(setting, index) in camera_settings" :key="index">
                <div v-if="setting.is_advanced" class="setting-item flex items-center justify-between">
                    <div class="setting-item-left flex items-center w-4/12">
                        {{ setting.description }}
                    </div>
                    <div class="setting-item-right flex items-center w-8/12 min-w-48">
                        <div v-if="setting.type === 'select'">
                            <Select v-model="setting.current_value" :options="setting.selections"
                                optionLabel="description" optionValue="value" class="setting-item-right-select">
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
        </dev>
    </div>
</template>

<script setup>
import { camera_settings } from '../camera_settings'

// TODO: 从 api 获取更新 camera_settings
</script>