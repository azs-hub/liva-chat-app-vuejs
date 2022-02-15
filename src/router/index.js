import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import AdminPage from '@/views/Admin.vue'
import AdminLogin from '../views/admin/AdminLogin/index.vue'
import AdminDashboard from '../views/admin/AdminDashboard/index.vue'
import AdminChat from '../views/admin/AdminChat/index.vue'

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
      { path: 'login', component: AdminLogin, name: 'adminLogin' },
      { path: 'dashboard', component: AdminDashboard, name: 'adminDashboard', },
      { path: 'chat/:chat_id', component: AdminChat, name: 'adminChat', props: true }
    ],
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/admin/login', '/', '/about'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/admin/login');
  } else {
    next();
  }
  next();
})


export default router
