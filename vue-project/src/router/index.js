import { createRouter, createWebHistory } from 'vue-router'
import { authMiddleware } from '@/middleware/auth'
import { useAuthStore } from '@/stores/auth'
import { useUserDetails } from '@/stores/score'
// import HomePage from '../views/HomePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: ()=> import ('@/views/HomePage.vue'),
      //  meta: { requiresAuth: true }
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/signup.vue'),
      meta: { hideNavbar: true }
    },
    {
      path:'/sample',
      name:'sample',
      component:()=> import('../views/scoreboard.vue')
    },
     {
      path:'/table',
      name:'table',
      component:()=> import('../views/viewtable.vue'),
      meta: { requiresAuth: true }
    },{
      path :"/login",
      name:'Loginpage',
      component:()=> import ('@/views/loginpage.vue'),
      meta: { hideNavbar: true }

    },{
      path:"/user/edit/:id",
      name:'edituser',
      component:() => import ('../views/editpage.vue'),
      meta: { requiresAuth: true }
    },{
     path:"/checkout",
      name:'checkout',
      component:() => import ('../views/checkout.vue')
    },
  // this below section for chat application
    {
      path:"/apphome",
      name:"HomePage",
      component:()=> import ('../views/chat_home.vue')
    }
  ],
})

router.beforeEach((to, from) => {
  const store = useUserDetails()
  const user = store.currentuser
  const middlewares = [authMiddleware]

  for (const middleware of middlewares) {
    const result = middleware(to, user.data.id)
    if (result) return result
  }
})

export default router
