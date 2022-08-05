import {createRouter, createWebHistory} from "vue-router";
import GlobeComponent from '../components/GlobeComponent.vue'

const routes = [
    {
        path : "/",
        name: "index",
        component: GlobeComponent
    }
]

export default createRouter({
    history : createWebHistory(import.meta.env.VITE_BASE_URL),
    routes
})
