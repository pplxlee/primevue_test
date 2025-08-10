import { reactive, ref } from 'vue'

export const camera_settings = reactive({
    error_flag: false,
    error_message: '',
    settings_writable: true,
    settings: [
        // {
        //     "current_description": "M手动曝光",
        //     "current_value": 1,
        //     "description": "曝光模式",
        //     "is_advanced": false,
        //     "name": "exposure_mode",
        //     "selections": [
        //         {
        //             "description": "自动",
        //             "value": 32768
        //         },
        //         {
        //             "description": "P程序自动",
        //             "value": 2
        //         },
        //         {
        //             "description": "A光圈优先",
        //             "value": 3
        //         },
        //         {
        //             "description": "S快门优先",
        //             "value": 4
        //         },
        //         {
        //             "description": "M手动曝光",
        //             "value": 1
        //         }
        //     ],
        //     "type": "select",
        //     "writable": true
        // },
        // {
        //     "current_description": "ISO 自动",
        //     "current_value": 16777215,
        //     "description": "ISO",
        //     "is_advanced": false,
        //     "name": "ISO",
        //     "selections": [
        //         {
        //             "description": "ISO 自动",
        //             "value": 16777215
        //         },
        //         {
        //             "description": "ISO 50",
        //             "value": 268435506
        //         },
        //         {
        //             "description": "ISO 64",
        //             "value": 268435520
        //         },
        //         {
        //             "description": "ISO 80",
        //             "value": 268435536
        //         },
        //         {
        //             "description": "ISO 100",
        //             "value": 100
        //         },
        //         {
        //             "description": "ISO 125",
        //             "value": 125
        //         },
        //         {
        //             "description": "ISO 160",
        //             "value": 160
        //         },
        //         {
        //             "description": "ISO 200",
        //             "value": 200
        //         },
        //         {
        //             "description": "ISO 250",
        //             "value": 250
        //         },
        //         {
        //             "description": "ISO 320",
        //             "value": 320
        //         },
        //         {
        //             "description": "ISO 400",
        //             "value": 400
        //         },
        //         {
        //             "description": "ISO 500",
        //             "value": 500
        //         },
        //         {
        //             "description": "ISO 640",
        //             "value": 640
        //         },
        //         {
        //             "description": "ISO 800",
        //             "value": 800
        //         },
        //         {
        //             "description": "ISO 1000",
        //             "value": 1000
        //         },
        //         {
        //             "description": "ISO 1250",
        //             "value": 1250
        //         },
        //         {
        //             "description": "ISO 1600",
        //             "value": 1600
        //         },
        //         {
        //             "description": "ISO 2000",
        //             "value": 2000
        //         },
        //         {
        //             "description": "ISO 2500",
        //             "value": 2500
        //         },
        //         {
        //             "description": "ISO 3200",
        //             "value": 3200
        //         },
        //         {
        //             "description": "ISO 4000",
        //             "value": 4000
        //         },
        //         {
        //             "description": "ISO 5000",
        //             "value": 5000
        //         },
        //         {
        //             "description": "ISO 6400",
        //             "value": 6400
        //         }
        //     ],
        //     "type": "select",
        //     "writable": true
        // },
        // {
        //     "current_description": "1/1000",
        //     "current_value": 66536,
        //     "description": "快门时间",
        //     "is_advanced": false,
        //     "name": "shutter",
        //     "selections": [
        //         {
        //             "description": "1\"",
        //             "value": 655370
        //         },
        //         {
        //             "description": "0.8\"",
        //             "value": 524298
        //         },
        //         {
        //             "description": "0.6\"",
        //             "value": 393226
        //         },
        //         {
        //             "description": "0.5\"",
        //             "value": 327690
        //         },
        //         {
        //             "description": "0.4\"",
        //             "value": 262154
        //         },
        //         {
        //             "description": "1/3",
        //             "value": 65539
        //         },
        //         {
        //             "description": "1/4",
        //             "value": 65540
        //         },
        //         {
        //             "description": "1/5",
        //             "value": 65541
        //         },
        //         {
        //             "description": "1/6",
        //             "value": 65542
        //         },
        //         {
        //             "description": "1/8",
        //             "value": 65544
        //         },
        //         {
        //             "description": "1/10",
        //             "value": 65546
        //         },
        //         {
        //             "description": "1/13",
        //             "value": 65549
        //         },
        //         {
        //             "description": "1/15",
        //             "value": 65551
        //         },
        //         {
        //             "description": "1/20",
        //             "value": 65556
        //         },
        //         {
        //             "description": "1/25",
        //             "value": 65561
        //         },
        //         {
        //             "description": "1/30",
        //             "value": 65566
        //         },
        //         {
        //             "description": "1/40",
        //             "value": 65576
        //         },
        //         {
        //             "description": "1/50",
        //             "value": 65586
        //         },
        //         {
        //             "description": "1/60",
        //             "value": 65596
        //         },
        //         {
        //             "description": "1/80",
        //             "value": 65616
        //         },
        //         {
        //             "description": "1/100",
        //             "value": 65636
        //         },
        //         {
        //             "description": "1/125",
        //             "value": 65661
        //         },
        //         {
        //             "description": "1/160",
        //             "value": 65696
        //         },
        //         {
        //             "description": "1/200",
        //             "value": 65736
        //         },
        //         {
        //             "description": "1/250",
        //             "value": 65786
        //         },
        //         {
        //             "description": "1/320",
        //             "value": 65856
        //         },
        //         {
        //             "description": "1/400",
        //             "value": 65936
        //         },
        //         {
        //             "description": "1/500",
        //             "value": 66036
        //         },
        //         {
        //             "description": "1/640",
        //             "value": 66176
        //         },
        //         {
        //             "description": "1/800",
        //             "value": 66336
        //         },
        //         {
        //             "description": "1/1000",
        //             "value": 66536
        //         },
        //         {
        //             "description": "1/1250",
        //             "value": 66786
        //         },
        //         {
        //             "description": "1/1600",
        //             "value": 67136
        //         },
        //         {
        //             "description": "1/2000",
        //             "value": 67536
        //         },
        //         {
        //             "description": "1/2500",
        //             "value": 68036
        //         },
        //         {
        //             "description": "1/3200",
        //             "value": 68736
        //         },
        //         {
        //             "description": "1/4000",
        //             "value": 69536
        //         }
        //     ],
        //     "type": "select",
        //     "writable": true
        // },
        // {
        //     "current_description": "自动",
        //     "current_value": 0,
        //     "description": "白平衡",
        //     "is_advanced": false,
        //     "name": "white_balance",
        //     "selections": [
        //         {
        //             "description": "自动",
        //             "value": 0
        //         },
        //         {
        //             "description": "日光",
        //             "value": 17
        //         },
        //         {
        //             "description": "阴影",
        //             "value": 18
        //         },
        //         {
        //             "description": "阴天",
        //             "value": 19
        //         },
        //         {
        //             "description": "白炽灯",
        //             "value": 20
        //         },
        //         {
        //             "description": "荧光灯: 暖白色",
        //             "value": 33
        //         },
        //         {
        //             "description": "荧光灯: 冷白色",
        //             "value": 34
        //         },
        //         {
        //             "description": "荧光灯: 日光白",
        //             "value": 35
        //         },
        //         {
        //             "description": "荧光灯: 日光",
        //             "value": 36
        //         },
        //         {
        //             "description": "水下自动",
        //             "value": 1
        //         },
        //         {
        //             "description": "ColorTemp",
        //             "value": 256
        //         }
        //     ],
        //     "type": "select",
        //     "writable": true
        // },
        // {
        //     "current_description": "大",
        //     "current_value": 1,
        //     "description": "影像尺寸",
        //     "is_advanced": false,
        //     "name": "image_size",
        //     "selections": [
        //         {
        //             "description": "大",
        //             "value": 1
        //         },
        //         {
        //             "description": "中",
        //             "value": 2
        //         },
        //         {
        //             "description": "小",
        //             "value": 3
        //         }
        //     ],
        //     "type": "select",
        //     "writable": true
        // },
        // {
        //     "current_description": "3:2",
        //     "current_value": 1,
        //     "description": "纵横比",
        //     "is_advanced": false,
        //     "name": "aspect_ratio",
        //     "selections": [
        //         {
        //             "description": "3:2",
        //             "value": 1
        //         },
        //         {
        //             "description": "4:3",
        //             "value": 3
        //         },
        //         {
        //             "description": "16:9",
        //             "value": 2
        //         },
        //         {
        //             "description": "1:1",
        //             "value": 4
        //         }
        //     ],
        //     "type": "select",
        //     "writable": true
        // },
        // {
        //     "current_description": "精细",
        //     "current_value": 3,
        //     "description": "图像精细度",
        //     "is_advanced": true,
        //     "name": "image_quality",
        //     "selections": [
        //         {
        //             "description": "超精细",
        //             "value": 4
        //         },
        //         {
        //             "description": "精细",
        //             "value": 3
        //         },
        //         {
        //             "description": "标准",
        //             "value": 2
        //         },
        //         {
        //             "description": "小",
        //             "value": 1
        //         }
        //     ],
        //     "type": "select",
        //     "writable": true
        // },
        // {
        //     "current_description": "JPEG",
        //     "current_value": 1,
        //     "description": "图像格式",
        //     "is_advanced": true,
        //     "name": "image_format",
        //     "selections": [
        //         {
        //             "description": "RAW",
        //             "value": 2
        //         },
        //         {
        //             "description": "RAW&JPEG",
        //             "value": 3
        //         },
        //         {
        //             "description": "JPEG",
        //             "value": 1
        //         }
        //     ],
        //     "type": "select",
        //     "writable": true
        // },
        // {
        //     "current_description": "0 EV",
        //     "current_value": 0,
        //     "description": "EV",
        //     "is_advanced": true,
        //     "name": "EV",
        //     "selections": [
        //         {
        //             "description": "+5 EV",
        //             "value": 5000
        //         },
        //         {
        //             "description": "+4.7 EV",
        //             "value": 4700
        //         },
        //         {
        //             "description": "+4.3 EV",
        //             "value": 4300
        //         },
        //         {
        //             "description": "+4 EV",
        //             "value": 4000
        //         },
        //         {
        //             "description": "+3.7 EV",
        //             "value": 3700
        //         },
        //         {
        //             "description": "+3.3 EV",
        //             "value": 3300
        //         },
        //         {
        //             "description": "+3 EV",
        //             "value": 3000
        //         },
        //         {
        //             "description": "+2.7 EV",
        //             "value": 2700
        //         },
        //         {
        //             "description": "+2.3 EV",
        //             "value": 2300
        //         },
        //         {
        //             "description": "+2 EV",
        //             "value": 2000
        //         },
        //         {
        //             "description": "+1.7 EV",
        //             "value": 1700
        //         },
        //         {
        //             "description": "+1.3 EV",
        //             "value": 1300
        //         },
        //         {
        //             "description": "+1 EV",
        //             "value": 1000
        //         },
        //         {
        //             "description": "+0.7 EV",
        //             "value": 700
        //         },
        //         {
        //             "description": "+0.3 EV",
        //             "value": 300
        //         },
        //         {
        //             "description": "0 EV",
        //             "value": 0
        //         },
        //         {
        //             "description": "-0.3 EV",
        //             "value": -300
        //         },
        //         {
        //             "description": "-0.7 EV",
        //             "value": -700
        //         },
        //         {
        //             "description": "-1 EV",
        //             "value": -1000
        //         },
        //         {
        //             "description": "-1.3 EV",
        //             "value": -1300
        //         },
        //         {
        //             "description": "-1.7 EV",
        //             "value": -1700
        //         },
        //         {
        //             "description": "-2 EV",
        //             "value": -2000
        //         },
        //         {
        //             "description": "-2.3 EV",
        //             "value": -2300
        //         },
        //         {
        //             "description": "-2.7 EV",
        //             "value": -2700
        //         },
        //         {
        //             "description": "-3 EV",
        //             "value": -3000
        //         },
        //         {
        //             "description": "-3.3 EV",
        //             "value": -3300
        //         },
        //         {
        //             "description": "-3.7 EV",
        //             "value": -3700
        //         },
        //         {
        //             "description": "-4 EV",
        //             "value": -4000
        //         },
        //         {
        //             "description": "-4.3 EV",
        //             "value": -4300
        //         },
        //         {
        //             "description": "-4.7 EV",
        //             "value": -4700
        //         },
        //         {
        //             "description": "-5 EV",
        //             "value": -5000
        //         }
        //     ],
        //     "type": "select",
        //     "writable": true
        // },
        // {
        //     "current_description": "自动",
        //     "current_value": 32,
        //     "description": "动态范围",
        //     "is_advanced": true,
        //     "name": "dynamic_range",
        //     "selections": [
        //         {
        //             "description": "关",
        //             "value": 0
        //         },
        //         {
        //             "description": "自动",
        //             "value": 32
        //         },
        //         {
        //             "description": "1级",
        //             "value": 17
        //         },
        //         {
        //             "description": "2级",
        //             "value": 18
        //         },
        //         {
        //             "description": "3级",
        //             "value": 19
        //         },
        //         {
        //             "description": "4级",
        //             "value": 20
        //         },
        //         {
        //             "description": "5级",
        //             "value": 21
        //         }
        //     ],
        //     "type": "select",
        //     "writable": true
        // },
        // {
        //     "current_description": "0000000000000000",
        //     "current_value": "0000000000000000",
        //     "description": "序列号",
        //     "is_advanced": false,
        //     "name": "SN",
        //     "type": "line",
        //     "writable": false
        // },
        // {
        //     "current_description": "0000000000000000",
        //     "current_value": "0000000000000000",
        //     "description": "序列号",
        //     "is_advanced": true,
        //     "name": "SN",
        //     "type": "line",
        //     "writable": false
        // }
    ]
});

const camera_settings_api_url_get = 'http://pr1.local/api/v1/camera_settings/get'
const camera_settings_api_url_random = 'http://pr1.local/api/v1/camera_settings/random'
const camera_settings_api_url_set = 'http://pr1.local/api/v1/camera_settings/set'

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

export const sendCameraCommand = async (name, value) => {
    try {
        const response = await fetch(camera_settings_api_url_set, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commands: [{
                    name: name,
                    value: value
                }]
            })
        })
        console.log(response.text())
    } catch (error) {
        console.error(error)
    }
}

const interval_id = ref()

export const cameraSettingGetterSetupFunc = () => {
    interval_id.value = setInterval(() => {
        fetch(camera_settings_api_url_get).catch(error => {
            console.error(error)
            camera_settings.error_flag = true
            camera_settings.error_message = ""
            camera_settings.settings_writable = false
        }).then(response => {
            try {
                return response.json()
            }
            catch (error) {
                return
            }
        }).then(data => {
            if (data === null) {
                camera_settings.error_flag = true
                camera_settings.error_message = ""
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
