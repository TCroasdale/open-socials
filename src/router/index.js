import { createRouter, createWebHashHistory } from 'vue-router'
import Post from '../views/Post.vue'
import Feed from '../views/Feed.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Post',
    component: Post
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
