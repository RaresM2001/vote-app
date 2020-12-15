import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import DashboardMembers from '../views/dashboard/views/Members.vue'
import CreatePoll from '../views/dashboard/views/AddPoll.vue'
import Home from '../views/dashboard/views/Home.vue'
import PollsList from '../views/vote/PollsList.vue'
import Vote from '../views/vote/Vote.vue'
import VotePlaced from '../views/vote/VotePlaced.vue'
import AlreadyVoted from '../views/vote/AlreadyVoted.vue'
import PollClosed from '../views/vote/PollClosed.vue'

import Polls from '../views/dashboard/views/Polls.vue'
import AddMember from '../views/dashboard/views/AddMember.vue'
import VoteError from '../views/vote/VoteError.vue'
import SendMessage from '../views/dashboard/views/SendMessage.vue'
import PollView from '../views/vote/PollView.vue'

Vue.use(VueRouter);

const redirectToList = (to, from, next) => {
 router.push('polls-list-user');
 console.log('rares');
 next();
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'polls-list-user',
    component: PollsList
  },
  {
    path: '/polls/:id',
    name: 'polls-view',
    component: PollView
  },
  {
    path: '/vote/:pollId/:memberId',
    name: 'vote',
    component: Vote
  },
  {
    path: '/vote/finish',
    name: 'vote-placed',
    component: VotePlaced,
    beforeLeage:redirectToList
  },
  {
    path: '/vote/already-voted',
    name: 'already-voted',
    component: AlreadyVoted,
    beforeLeave: redirectToList
  },
  {
    path: '/poll-closed',
    name: 'poll-closed',
    component: PollClosed
  },
  {
    path: '/vote/error',
    name: 'vote-error',
    component: VoteError
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      { path: '', name: 'dash-home', component: Home },
      { path: 'members', name: 'dash-members', component: DashboardMembers },
      { path: 'add_member', name: 'add-member', component: AddMember },
      { path: 'create_poll', name: 'dash-create-poll', component: CreatePoll },
      { path: 'polls', name: 'polls-list', component: Polls },
      { path: 'send_message', name: 'send-message', component: SendMessage }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
