import './bootstrap';


import {createApp} from 'vue/dist/vue.esm-bundler.js'
import '../sass/app.scss'
import * as bootstrap from 'bootstrap'
import Navbar from "./components/layout/Navbar.vue"
import Foot from "./components/layout/Footer.vue"
import GlobeComponent from "./components/GlobeComponent.vue"
import router from "./router"


createApp({
    components:{
        GlobeComponent,
        Navbar,
        Foot
    }
}).use(router).mount("#app")
