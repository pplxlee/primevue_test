<template>
    <div class="card space-y-8">
        <div class="setting-header text-2xl font-bold">
            连接WIFI
        </div>
        <!-- 错误信息 -->
        <Message severity="error" v-if="wifi_connection.error_flag" class="setting-error">
            {{ wifi_connection.error_message }}
        </Message>
        <!-- 设置内容 -->
        <div class="setting-body flex flex-col space-y-4">
            <Listbox v-model="selected_wifi" :options="wifi_connection.wifi_list" optionLabel="ssid"
                class="w-full md:w-full" listStyle="max-height:300px">
                <template #option="slotProps">
                    <div class="w-4/12">{{ slotProps.option.ssid }}</div>
                    <div class="w-4/12">信号强度：{{ slotProps.option.strength }}</div>
                    <!--右对齐-->
                    <div class="w-4/12">
                        <div v-if=slotProps.option.connected>已连接</div>
                        <div v-else>未连接</div>
                    </div>
                </template>
            </Listbox>
            <Button v-if="selected_wifi === null" label="连接" disabled />
            <Button v-else-if="selected_wifi.connected" label="断开" @click="onDisconnectButtonClicked" />
            <Button v-else label="连接" @click="connect_dialog_visible = true" />
        </div>
    </div>
    <Dialog v-model:visible="connect_dialog_visible" modal header="连接WIFI" :style="{ width: '25rem' }" @keyup.enter="onConnectButtonClicked">
        <div class="flex items-center gap-4 mb-4">
            <label class="font-semibold w-24">SSID</label>
            <label class="font-semibold w-24">{{ selected_wifi.ssid }}</label>
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="password" class="font-semibold w-24">密码</label>
            <Password id="password" :feedback="false" toggleMask v-model:modelValue="password" autofocus/>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="取消" severity="secondary" @click="connect_dialog_visible = false"></Button>
            <Button type="button" label="连接" @click="onConnectButtonClicked"></Button>
        </div>
    </Dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'

const connect_dialog_visible = ref(false);
const password = ref('');

const selected_wifi = ref(null);
const wifi_connection = ref({
    error_flag: false,
    error_message: 'some error',
    wifi_list: [
        {
            ssid: 'xxx',
            strength: 4,
            connected: false
        },
        {
            ssid: 'ccccccc',
            strength: 2,
            connected: false
        },
        {
            ssid: 'aa',
            strength: 1,
            connected: false
        },
        {
            ssid: 'rrrvvvvvvv',
            strength: 0,
            connected: false
        },
    ]
});

const onConnectButtonClicked = () => {
    console.log('connect button clicked');
    console.log('ssid:', selected_wifi.value.ssid);
    console.log('password:', password.value);
    connect_dialog_visible.value = false;

    // TODO: 同步的方式请求连接wifi，并获取连接结果

    password.value = '';
}

const onDisconnectButtonClicked = () => {
    console.log('disconnect button clicked');
    console.log(selected_wifi.value);
    selected_wifi.value = null;
}
</script>