import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import roteador from './roteador'
import { key as keyProjeto, store as storeProject } from './store/indexProjeto'
import { key as keyTarefa, store as storeTarefa } from './store/indexTarefa'

createApp(App)
    .use(roteador)
    .use(storeProject, keyProjeto)
    .use(storeTarefa, keyTarefa)
    .mount('#app')
