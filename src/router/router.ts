import { createRouter, createWebHistory } from 'vue-router'
import event from '../views/EventHome.vue'
import login from '../views/login.vue'
import trash from '../views/trash.vue'
import { useAppStore } from '../stores/useAppStore'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login, 
  },
  {
    path: '/event',
    name: 'event',
    component: event, 
  },
  {
    path: '/trash',
    name: 'trash',
    component: trash, 
  },
  
 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const store = useAppStore()

  const isLoggedIn = store.currentUser !== null

  if (to.path !== '/login' && !isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    next('/event')
  } else {
    next()
  }
})

export default router
