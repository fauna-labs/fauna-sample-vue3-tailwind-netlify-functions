// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import store from './store'

createApp(App).use(store).use(router).mount('#app')