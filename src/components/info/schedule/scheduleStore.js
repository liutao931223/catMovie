import axios from "axios"
import moment from "moment"
export default {
	namespaced:true,
	state: {
		studio:{
			page:1,
			rows:1,
			count:0,
			allPages:0,
			data:[]
		},
		theater:{
			page:1,
			rows:10,
			count:0,
			allPages:0,
			data:[]
		},
		movies:[],
		studios:[],
		theaters:[]
	},
	mutations: {
		getMovies(state,data){
			state.movies = data.data
		},
		getScheduleListByMovieId(state,data){
			for(let key in data){
				if( key === "page" || key ==="rows"){
					state.studio[key] = ~~data[key];
					continue;
				}
				state.studio[key]  = data[key]
			}
			state.theater.data = []
		},
		getStudios(state,data){
			state.studios = data.data
		},
		getTheaters(state,id){
			state.studios.some((item,index) =>{
				if(item._id === id){
					state.theaters = item.theaters
				}
			})
		},
		getTeatersByStudioId(state,data){
			for(let key in data){
				if( key === "page" || key ==="rows"){
					state.theater[key] = ~~data[key];
					continue;
				}
				state.theater[key]  = data[key]
			}
		}
	},
	actions:{
	 	async getMovies(context){
			const {data} = await axios.get(`/schedules/movieList`, {
				params: {
     				page:1,
     				rows:999999       
    			}
			})
			context.commit("getMovies",data)
			return data
		},
		async getStudios(context){
			const {data} = await axios.get(`/studios/getStudios`, {
				params: {
     				page:1,
     				rows:999999       
    			}
			})
			context.commit("getStudios",data)
		},
		async getScheduleListByMovieId(context,movies){
			const {data} = await axios.get(`/schedules/getScheduleListByMovieId`, {
				params: {
     				page:movies.page,
     				rows:movies.rows,
     				movieId:movies.id,
     				showTime:new Date()     
    			}
			})
			context.commit("getScheduleListByMovieId",data)			
		},
		async addSchedule(context,schedule){
			let showTime = moment(schedule.showTime).format("MM/DD/YYYY HH:mm")
			const {data} = await axios.post("/schedules/addSchedule",{
	  			movieId:schedule.movieId,
	  			studioId:schedule.studioId,
	  			showTime,
	  			theaterId:schedule.theaterId,
	  			price:schedule.price
	  		})
		},
		async getTeatersByStudioId(context,theater){
			const {data} = await axios.get(`/schedules/getTeatersByStudioId`, {
				params:theater
			})
			context.commit("getTeatersByStudioId",data)
		},
		async delStudioByStudioId(context,studio){
			const data = await axios.post("/schedules/delStudioByStudioId",studio)
			context.dispatch("getScheduleListByMovieId",{id:studio.movieId})
			context.dispatch("getTeatersByStudioId",studio)
		},
		async delTheaterSchedule(context,{row,showTime}){
			const data = await axios.post("/schedules/delTheaterSchedule",{scheduleId:row.id})
			context.dispatch("getTeatersByStudioId",{
				movieId:row.movieId._id,
	   			studioId:row.studioId,
	   			showTime
			})
		}

	}
}