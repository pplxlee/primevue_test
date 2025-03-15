import { createMemoryHistory, createRouter } from 'vue-router'

import CameraBaseSettings from './components/CameraBaseSettings.vue'
import CameraAdvancedSettings from './components/CameraAdvancedSettings.vue';

const routes = [
  { path: '/', component: CameraBaseSettings },
  { path: '/CameraAdvancedSettings', component: CameraAdvancedSettings },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router