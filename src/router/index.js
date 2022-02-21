import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import AdminPage from '@/views/Admin.vue'
import AdminLogin from '../views/admin/AdminLogin/index.vue'
import AdminDashboard from '../views/admin/AdminDashboard/index.vue'
import AdminChatList from '../views/admin/AdminChatList/index.vue'


import { Role } from '../models/role'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
    
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    children: [
      { path: 'login',
        name: 'adminLogin',
        component: AdminLogin
      },
      { path: 'dashboard',
        component: AdminDashboard,
        name: 'adminDashboard',
        meta: { authorize: [Role.Manager, Role.Admin] } 
      },
      { path: 'chatList',
        component: AdminChatList,
        name: 'adminChatList',
        meta: { authorize: [Role.Admin] } 
      }
    ],
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const { authorize } = to.meta;

  if (authorize) {
    if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return next('/admin/login');
    }
    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
        // role not authorised so redirect to home page
        return next({ path: '/' });
    }
  }
  next();
})


export default router
