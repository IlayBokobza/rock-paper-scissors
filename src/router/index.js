import Vue from 'vue'
import VueRouter from 'vue-router'
//pages
import Home from '../views/Home.vue'
import GameRoom from "@/views/GameRoom";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game-room',
    name: 'GameRoom',
    component: GameRoom
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
