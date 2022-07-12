import {createRouter, createWebHistory} from "vue-router";
import ExampleComponent from '../components/ExampleComponent.vue'

const routes = [
    {
        path : "/",
        name: "index",
        component: ExampleComponent
    }
]

export default createRouter({
    history : createWebHistory(import.meta.env.VITE_BASE_URL),
    routes
})
