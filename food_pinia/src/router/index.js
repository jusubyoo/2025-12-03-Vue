import { createRouter,createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import FoodDetailView from "@/views/FoodDetailView.vue";
// Spring => @Controller
const routes=[
    {
        path:'/',
        name:'home',
        component:HomeView
    },
    {
        path:'/food/detail/:fno',
        name:'food_detail',
        component:FoodDetailView
    }
]
const router=createRouter({
    history:createWebHistory(process.env.BASE_URL),
    routes
})
export default router