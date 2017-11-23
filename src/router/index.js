import Vue from 'vue'
import Router from 'vue-router'
import Info from '@/components/info/info.vue'
import Login from '@/components/login/login.vue'
import Reg from '@/components/reg/reg.vue'
import AddMovie from '../components/info/movie/addMovie.vue'
import MovieList from '../components/info/movie/movieList.vue'
import Images from "../components/info/movie/images.vue"
import AddStudio from '../components/info/studio/addStudio.vue'
import StudioList from '../components/info/studio/studioList.vue'
import AddTheater from '../components/info/theater/addTheater.vue'
import TheaterList from '../components/info/theater/theaterList.vue'
import ScheduleList from "../components/info/schedule/scheduleList.vue"
import AddSchedule from "../components/info/schedule/addSchedule.vue"
import AddNews from "../components/info/news/addNews.vue"
import NewsList from "../components/info/news/newsList.vue"

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
        },
        {
          path: 'images',
          component: Images
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
          path: 'addNews',
          component: AddNews
        },
        {
          path: 'newsList',
          component: NewsList
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
