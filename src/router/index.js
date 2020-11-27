import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import DashboardMembers from '../views/dashboard/views/Members.vue'
import CreatePoll from '../views/dashboard/views/CreatePoll.vue'
import Home from '../views/dashboard/views/Home.vue'
import Vote from '../views/vote/Vote.vue'
import VotePlaced from '../views/vote/VotePlaced.vue'
import Polls from '../views/dashboard/views/Polls.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/vote/:pollId/:memberId',
    name: 'vote',
    component: Vote
  },
  {
    path: '/vote/finish',
    name: 'vote-placed',
    component: VotePlaced
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      { path: '', name: 'dash-home', component: Home },
      { path: 'members', name: 'dash-members', component: DashboardMembers },
      { path: 'create_poll', name: 'dash-create-poll', component: CreatePoll },
      { path: 'polls', name: 'polls-list', component: Polls }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
