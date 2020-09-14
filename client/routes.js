import Router from 'vue-router'

import Home from '@pages/Home.vue'
import Login from '@pages/Login.vue'
import Register from '@pages/Register.vue'
import EmailConfirm from '@pages/EmailConfirm.vue'
import ResetPassword from '@pages/ResetPassword.vue'
import ForgotPassword from '@pages/ForgotPassword.vue'
import SinglePost from '@pages/SinglePost.vue'
import CreatePost from '@pages/CreatePost.vue'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth/login',
      component: Login,
    },
    {
      path: '/auth/register',
      component: Register,
    },
    {
      path: '/new',
      component: CreatePost,
    },
    {
      path: '/',
      component: Home,
    },
    {
      name: 'post', 
      path: '/post/:id',
      component: SinglePost,
      props: true,
    },
    {
      path: '/auth/passwords/email',
      component: ForgotPassword,
    },
    {
      path: '/auth/passwords/reset/:token',
      component: ResetPassword,
    },
    {
      path: '/auth/emails/confirm/:token',
      component: EmailConfirm,
    },
  ],
})
