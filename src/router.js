import { createMemoryHistory, createRouter } from 'vue-router'

import CameraBaseSettings from './components/CameraBaseSettings.vue'
import CameraAdvancedSettings from './components/CameraAdvancedSettings.vue';
import WifiConnection from './components/WifiConnection.vue';

const routes = [
  { path: '/', component: CameraBaseSettings },
  { path: '/CameraAdvancedSettings', component: CameraAdvancedSettings },
  { path: '/WifiConnection', component: WifiConnection },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router