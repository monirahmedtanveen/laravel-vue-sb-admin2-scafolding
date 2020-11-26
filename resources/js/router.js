import Vue from 'vue'
import Router from 'vue-router'

import Login from './components/authentication/Login'
import Signup from './components/authentication/Signup'
import ForgotPassword from './components/authentication/ForgotPassword'

import Dashboard from './components/views/Dashboard'
import Categories from './components/views/Categories'

Vue.use(Router)

const routes = [
    // Authentication Routes
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup,
    },
    {
        path: '/forgot-password',
        name: 'forgotpassword',
        component: ForgotPassword,
    },

    // View Page Routes 
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/categories',
        name: 'categories',
        component: Categories,
    }
]

export default new Router({
    mode: 'history',
    routes
})