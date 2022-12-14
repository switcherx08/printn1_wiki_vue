import { createApp } from 'vue'
import { createPinia } from 'pinia'
// @ts-ignore
import debounce from '@/debounce.js'

import App from './App.vue'
import './assets/scss/app.scss'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
// @ts-ignore
import VueFinder from 'vuefinder'

// Components
import AuthLayout from '@/layouts/auth_layout/AuthLayout.vue'
import SidebarLayout from '@/layouts/sidebar_layout/SidebarLayout.vue'
import ErrorLayout from '@/layouts/error_layout/ErrorLayout.vue'
import BaseSimpleButton from '@/components/base/button/BaseSimpleButton.vue'
import AvatarUser from "@/components/base/avatar/AvatarUser.vue";
import PagesNavigationItem from "@/components/navigation/pages/PagesNavigationItem.vue"
import draggable from "vuedraggable";


// App
const app = createApp(App)
// Use
app.use(createPinia())
app.use(router)
app.use(Notifications)
app.use(VueFinder)
// Layouts
app.component('BaseSimpleButton', BaseSimpleButton)
app.component('AuthLayout', AuthLayout)
app.component('SidebarLayout', SidebarLayout)
app.component('ErrorLayout', ErrorLayout)
app.component('PagesNavigationItem', PagesNavigationItem)
app.component('draggable', draggable)

// Components
app.component('AvatarUser', AvatarUser)
// directive
app.directive('debounce', (el,binding) => debounce(el,binding))
// Mount
app.mount('#app')
