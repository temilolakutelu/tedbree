import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Jobs from '../views/Jobs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            public: true, // Allow access to even if not logged in 
        }
    },
    {
        path: '/jobs',
        name: 'Jobs',
        component: Jobs
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            public: true, // Allow access to even if not logged in
            onlyWhenLoggedOut: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            public: true, // Allow access to even if not logged in
            onlyWhenLoggedOut: true
        }
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router