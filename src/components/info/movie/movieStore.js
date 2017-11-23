import axios from 'axios'
export default{
    namespaced:true,
    state: {
        curPage:1,
        eachPage:10,
        maxPage:0,
        count:0,
        data:[],
        movieIds:'',
        img:[]
    },
    mutations: {
        changeData(state,data){
            this.state.movieStore.count = data.count
            this.state.movieStore.data = data.data
            this.state.movieStore.maxPage = data.allPages
            this.state.movieStore.curPage =  data.page
            this.state.movieStore.eachPage =  data.rows
        },
        changeImg(state,data){

            for(let i = 0;i < data.data.length;i++){
                data.data[i].url = 'http://127.0.0.1:3001/'+data.data[i].url
            }
            state.img = data.data
            console.log(this.state.movieStore.img)
        }
    },
    actions: {
        async getMoviesByPageAsync(context,{page=this.state.movieStore.curPage, rows=this.state.movieStore.eachPage} = {}) {
                const {data} = await axios.get(`/movies/getMovies`,{params:{
                  page,
                  rows
                }})
            context.commit('changeData',data)
        },
        async addMovies(context,datas){
                const {data} = await axios.post(`/movies/addMovies`,{
                      cName: datas.cName,
                      eName: datas.eName,
                      type: datas.type,
                      country: datas.country,
                      duration: datas.duration,
                      release: datas.release,
                      synopsis: datas.synopsis,
                      state: datas.state,
                      scoring: datas.scoring,
                })
                
                this.state.movieStore.movieId = data._id
                console.log(this.state.movieStore.movieId)
            // context.commit('changeData',data)
        },
        async changeMovies(context,datas){
                const {data} = await axios.post(`/movies/updateMovies`,{
                      cName: datas.cName,
                      eName: datas.eName,
                      type: datas.type,
                      country: datas.country,
                      duration: datas.duration,
                      release: datas.release,
                      synopsis: datas.synopsis,
                      _id:datas.movieId
                })
        },
        async delMovies(context,datas){
          // console.log(datas._id)
                const {data} = await axios.get(`/movies/delMovies`,{
                      params:{
                        movieId:datas._id,
                        status:0
                      }
                })
                if(data.ok){
                  context.dispatch("getMoviesByPageAsync")
                  // this.state.movieStore.getMoviesByPageAsync()
                }
        },
        async getImg(context,datas){
              const {data} = await axios.get(`/imgs/getImgsByMovieId`,{
                      params:{
                        type:datas.type,
                        movieId:datas.movieId
                      }
              })

             context.commit('changeImg',data)
        }
    }
}