import Vue from 'vue'
import Router from 'vue-router'
import Info from '@/components/info/info.vue'
import Login from '@/components/login/login.vue'
import Reg from '@/components/reg/reg.vue'
import AddMovie from '../components/info/movie/addMovie.vue'
import MovieList from '../components/info/movie/movieList.vue'
import AddStudio from '../components/info/studio/addStudio.vue'
import StudioList from '../components/info/studio/studioList.vue'
import AddTheater from '../components/info/theater/addTheater.vue'
import SeatList from '../components/info/seat/seatList.vue'
import TheaterList from '../components/info/theater/theaterList.vue'
import ScheduleList from "../components/info/schedule/scheduleList.vue"
import AddSchedule from "../components/info/schedule/addSchedule.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/info',
      name: 'info',
      component: Info,
      children: [
        {
          path: 'addMovie',
          component: AddMovie
        },
        {
          path: 'movieList',
          component: MovieList
        },{
          path: 'addStudio',
          component: AddStudio
        },
        {
          path: 'studioList',
          component: StudioList

        },{
          path: 'addTheater',
          component: AddTheater
        },
        {
          path: 'theaterList',
          component: TheaterList
        },
        {
          path: 'scheduleList',
          component: ScheduleList
        },
        {
          path: 'addSchedule',
          component: AddSchedule
        },
        {
          path: 'seatList',
          component: SeatList
        }
      ]
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/reg',
      name: 'reg',
      component: Reg
    }
  ]
})
