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
        }
      }
    ]
  },
  {
    path: '/usermanage',
    name: 'usermanage',
    component: Layout,
    meta: {
      title: '用户管理'
    },
    redirect: '/usermanage/userlist',
    children: [
      {
        path: 'userlist',
        name: 'userlist',
        component: () => import('views/UserList'),
        meta: {
          title: '用户列表',
        }
      },
      {
        path: 'questionlist',
        name: 'questionlist',
        component: () => import('views/QuestionList'),
        meta: {
          title: '问题列表',
        }
      },
      {
        path: 'answerlist',
        name: 'answerlist',
        component: () => import('views/AnswerList'),
        meta: {
          title: '回答列表'
        }
      },
      {
        path: 'commentlist',
        name: 'commentlist',
        component: () => import('views/CommentList'),
        meta: {
          title: '评论列表',
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
