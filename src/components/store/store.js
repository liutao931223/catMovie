import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import scheduleStore from "../info/schedule/scheduleStore.js"
import scheduleStore from "../info/movie/store/movieStore.js"

export default new Vuex.Store({
	modules:{
		scheduleStore,
        movieStore
	}
})