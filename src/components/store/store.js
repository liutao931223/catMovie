import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import scheduleStore from "../info/schedule/scheduleStore.js"
import movieStore from "../info/movie/store/movieStore.js"
import studioStore from "../info/studio/Store.js"
import theaterStore from "../info/theater/Store.js"
import seatStore from "../info/seat/Store.js"
import movieStore from "../info/movie/movieStore.js"
export default new Vuex.Store({
	modules:{
		scheduleStore,
        movieStore,
        studioStore,
        theaterStore,
        seatStore
	}
})