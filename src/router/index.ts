import { createRouter, createWebHistory } from 'vue-router'

//import HomeView from '../views/HomeView.vue'
import MoviesIndex from '../components/movies/MoviesIndex.vue'
import MoviesCreate from '../components/movies/MoviesCreate.vue'
import MoviesEdit from '../components/movies/MoviesEdit.vue'
import Login from '../components/login.vue'
import Register from '../components/register.vue'

const routes = [
  {
    path: '/',
    name: 'movies',
    component: MoviesIndex,
    meta: { title: 'Movies',auth: true }
  },
  {
    path: '/movies/create',
    name: 'movies.create',
    component: MoviesCreate,
    meta: { title: 'Movies',auth: true }
  },
 {
    path: '/movies/:id/edit',
    name: 'movies.edit',
    component: MoviesEdit,
    props: true,
    meta: { title: 'Movies',auth: true }
  },
  { 
    path: '/login', 
    component: Login,
    name:'login'
  },
  { 
    path: '/register', 
    component: Register, 
    name:'register'
  },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
/*
routes.beforeEach((to, from, next) => {
    var loggedIn = localStorage.getItem('user')
    if (to.matched.some(record => record.meta.auth)) {
        if (!loggedIn) {
            next({ name: 'login' })
        } else {
            next() // go to wherever I'm going
        }
    }else{
        next()
    }
})
*/