import { reactive } from 'vue'

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