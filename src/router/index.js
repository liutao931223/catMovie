import Vue from 'vue'
import Router from 'vue-router'
import Info from '@/components/info/info.vue'
import Login from '@/components/login/login.vue'
import Reg from '@/components/reg/reg.vue'
import AddMovie from '../components/info/movie/addMovie/addMovie.vue'
import MovieList from '../components/info/movie/movieList/movieList.vue'
import AddStudio from '../components/info/studio/addStudio/addStudio.vue'
import StudioList from '../components/info/studio/studioList/studioList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'info',
      component: Info
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/reg',
      name: 'reg',
      component: Reg
    },{
      path: '/addMovie',
      name: 'addMovie',
      component: AddMovie
    },{
      path: '/movieList',
      name: 'movieList',
      component: MovieList
    },{
      path: '/addStudio',
      name: 'addStudio',
      component: AddStudio
    },{
      path: '/studioList',
      name: 'studioList',
      component: StudioList
    },
  ]
})
