import Vue from 'vue'
import VueRouter from 'vue-router'
//pages
import Home from '../views/Home.vue'
import GameRoom from "@/views/GameRoom";
import JoinRoom from '@/views/JoinRoom'
import Solo from "@/views/Solo";
import Queue from "@/views/Queue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/join-room',
    name: 'JoinRoom',
    component: JoinRoom
  },
  {
    path: '/game-room',
    name: 'GameRoom',
    component: GameRoom
  },
  {
    path: '/queue',
    name:'Queue',
    component: Queue
  },
  {
    path: '/solo',
    name: 'Solo',
    component: Solo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
