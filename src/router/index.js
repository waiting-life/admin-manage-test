import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
// vuerouter更新后出现得问题  解决方法 https://my.oschina.net/u/4390738/blog/4547080
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import Layout from 'layout' 

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('views/Login')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('views/Dashboard'),
        meta: {
          title: 'Dashboard',
          icon: 'dashboard'
        }
      },
      {
        path: 'userlist',
        name: 'userlist',
        component: () => import('views/UserList'),
        meta: {
          title: 'UserList',
          icon: 'userlist'
        }
      }
    ]
  },
   {
    path: '*',
    component: () => import('views/404')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
