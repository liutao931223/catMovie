import axios from "axios"
export default {
    namespaced:true,
    state:{
        page:1,
        rows:10,
        allPages:0,
        count:0,
        data:[]
    },
    mutations:{
        getSeatsList(state,page){
            Object.assign(state,page)
        }
    },
    actions:{
        //查询影厅
        async getSeatsListAsync(context,text){
            const {data} = await axios.get("/theaters/seatsList",{
                params:{
                    page:text.page,
                    rows:text.rows,
                    theaterId:text.theaterId
                }
            })
            context.commit("getSeatsList",data)
        },   
    }

}