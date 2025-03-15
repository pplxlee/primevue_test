import { reactive, ref } from 'vue'

export const camera_settings = reactive({
    settings: [
        {
            type: 'select',
            is_advanced: false,
            name: 'setting_1',
            description: "设置1",
            current_description: "设置1_数值_1",
            current_value: 'setting_1_value_1',
            selections: [
                {
                    description: "设置1_数值_1",
                    value: 'setting_1_value_1',
                },
                {
                    description: "设置1_数值_2",
                    value: 'setting_1_value_2',
                }
            ]
        },
        {
            type: 'select',
            is_advanced: false,
            name: 'setting_2',
            description: "设置2",
            current_value: 'setting_2_value_2',
            current_description: "设置2_数值_1",
            selections: [
                {
                    description: "设置2_数值_1",
                    value: 'setting_2_value_1',
                },
                {
                    description: "设置2_数值_2",
                    value: 'setting_2_value_2',
                }
            ]
        },
        {
            type: 'line',
            is_advanced: false,
            name: 'setting_3',
            description: "设置3",
            current_value: 'setting_3_value_1',
            current_description: "设置3_数值_1"
        },
        {
            type: 'line',
            is_advanced: true,
            name: 'setting_4',
            description: "设置4",
            current_value: 'setting_4_value_1',
            current_description: "设置4_数值_1"
        },
        {
            type: 'select',
            is_advanced: true,
            name: 'setting_5',
            description: "设置5",
            current_value: 'setting_5_value_1',
            current_description: "设置5_数值_1",
            selections: [
                {
                    description: "设置5_数值_1",
                    value: 'setting_5_value_1',
                },
                {
                    description: "设置5_数值_2",
                    value: 'setting_5_value_2',
                }
            ]
        }
    ]
})

const camera_settings_api_url = 'http://127.0.0.1:5000/api/v1/camera_settings'
const camera_settings_api_url_get = 'http://127.0.0.1:5000/api/v1/camera_settings/get'
const camera_settings_api_url_set = 'http://127.0.0.1:5000/api/v1/camera_settings/set'

const setCameraSettings = async (settings) => {
    try {
        const response = await fetch(camera_settings_api_url_set, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        })
        const data = await response.json()
        console.log(data)
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
        try {
            fetch(camera_settings_api_url_get)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    camera_settings.settings = data
                })
        }
        catch (error) {
            console.error(error)
        }
    }, 1000)
}

export const cameraSettingGetterCleanupFunc = () => {
    clearInterval(interval_id.value)
}
