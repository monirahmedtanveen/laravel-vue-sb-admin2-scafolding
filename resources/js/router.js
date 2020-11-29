import Vue from 'vue'
import Router from 'vue-router'

import Login from './components/authentication/Login'
import Signup from './components/authentication/Signup'
import ForgotPassword from './components/authentication/ForgotPassword'

import Dashboard from './components/views/Dashboard'
import Categories from './components/views/Categories'

import store from './store/store'

Vue.use(Router)

const routes = [
    // Authentication Routes
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (store.getters['auth/authenticated']) {
                return next({
                    name: 'dashboard'
                })
            }

            next()
        }
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
        beforeEnter: (to, from, next) => {
            if (store.getters['auth/authenticated']) {
                return next({
                    name: 'dashboard'
                })
            }

            next()
        }
    },
    {
        path: '/forgot-password',
        name: 'forgotpassword',
        component: ForgotPassword,
        beforeEnter: (to, from, next) => {
            if (store.getters['auth/authenticated']) {
                return next({
                    name: 'dashboard'
                })
            }

            next()
        }
    },

    // View Page Routes 
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'login'
                })
            }

            next()
        }
    },
    {
        path: '/categories',
        name: 'categories',
        component: Categories,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'login'
                })
            }

            next()
        }
    },
]

export default new Router({
    mode: 'history',
    routes
})