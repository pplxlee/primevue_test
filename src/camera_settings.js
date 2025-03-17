import { reactive, ref } from 'vue'

export const camera_settings = reactive({
    error_flag: false,
    error_message: '',
    settings_writable: true,
    settings: [
        // {
        //     type: 'select',
        //     is_advanced: false,
        //     name: 'setting_1',
        //     description: "设置1",
        //     current_description: "设置1_数值_1",
        //     current_value: 'setting_1_value_1',
        //     writable: true,
        //     selections: [
        //         {
        //             description: "设置1_数值_1",
        //             value: 'setting_1_value_1',
        //         },
        //         {
        //             description: "设置1_数值_2",
        //             value: 'setting_1_value_2',
        //         }
        //     ]
        // },
        // {
        //     type: 'select',
        //     is_advanced: false,
        //     name: 'setting_2',
        //     description: "设置2",
        //     current_value: 'setting_2_value_2',
        //     current_description: "设置2_数值_1",
        //     writable: true,
        //     selections: [
        //         {
        //             description: "设置2_数值_1",
        //             value: 'setting_2_value_1',
        //         },
        //         {
        //             description: "设置2_数值_2",
        //             value: 'setting_2_value_2',
        //         }
        //     ]
        // },
        // {
        //     type: 'line',
        //     is_advanced: false,
        //     name: 'setting_3',
        //     description: "设置3",
        //     current_value: 'setting_3_value_1',
        //     current_description: "设置3_数值_1"
        // },
        // {
        //     type: 'line',
        //     is_advanced: true,
        //     name: 'setting_4',
        //     description: "设置4",
        //     current_value: 'setting_4_value_1',
        //     current_description: "设置4_数值_1"
        // },
        // {
        //     type: 'select',
        //     is_advanced: true,
        //     name: 'setting_5',
        //     description: "设置5",
        //     current_value: 'setting_5_value_1',
        //     current_description: "设置5_数值_1",
        //     writable: true,
        //     selections: [
        //         {
        //             description: "设置5_数值_1",
        //             value: 'setting_5_value_1',
        //         },
        //         {
        //             description: "设置5_数值_2",
        //             value: 'setting_5_value_2',
        //         }
        //     ]
        // }
    ]
});

const camera_settings_api_url_get = 'http://py505.local/api/v1/camera_settings/get'
const camera_settings_api_url_random = 'http://py505.local/api/v1/camera_settings/random'
const camera_settings_api_url_set = 'http://py505.local/api/v1/camera_settings/set'

const setCameraSettings = async (settings) => {
    camera_settings.settings_writable = false
    try {
        const response = await fetch(camera_settings_api_url_set, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        })
        console.log(response.text())
    } catch (error) {
        console.error(error)
    }
}

export const onCameraSettingChange = async (name, value) => {
    await setCameraSettings({
        settings: [{
            name: name,
            value: value
        }]
    })
}

const interval_id = ref()

export const cameraSettingGetterSetupFunc = () => {
    interval_id.value = setInterval(() => {
        fetch(camera_settings_api_url_get).catch(error => {
            console.error(error)
            camera_settings.error_flag = true
            camera_settings.error_message = "程序内部错误，请尝试重启设备！"
            camera_settings.settings_writable = false
        }).then(response => {
            try {
                return response.json()
            }
            catch (error) {
                return
            }
        }).then(data => {
            if (data === null)
            {
                camera_settings.error_flag = true
                camera_settings.error_message = "程序内部错误，请尝试重启设备！"
                camera_settings.settings_writable = false
                return
            }
            camera_settings.error_flag = data.error_flag ?? false
            camera_settings.error_message = data.error_message ?? ""
            camera_settings.settings_writable = data.settings_writable ?? true
            camera_settings.settings = data.settings ?? []
            console.log(data)
        })
    }, 1000)
}

export const cameraSettingGetterCleanupFunc = () => {
    clearInterval(interval_id.value)
}
