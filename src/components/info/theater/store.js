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
        getTheatersByPage(state,page){
            Object.assign(state,page)
        }
    },
    actions:{
        //查询影厅
        async getTheatersByPageAsync(context,text){
            const {data} = await axios.get("/theaters/getTheater",{
                params:{
                    page:text.page,
                    rows:text.rows,
                    studioId:text.studioId
                }
            })
            // console.log(data)
            context.commit("getTheatersByPage",data)
        },
        //添加影厅
        async addTheater(context,text){
            const {name,colNo,rowNo,studioId} = text
            const {data} = await axios.post("/theaters/addTheater",{
                name,
                colNo,
                rowNo,
                studioId
            })
            if(data.state){
                alert("修改成功")
            }
        },
        //删除影厅
        async removeTheater(context,text){
            let arr=text.split("&")
            // console.log(arr)
            const {data} = await axios.get("/theaters/removeTheater",{
                params:{
                    _id:arr[0],
                    studioId:arr[1],
                    status:0,
                    page:this.state.theaterStore.page,
                    rows:this.state.theaterStore.rows
                }
            })
           if(data=="ok"){
                let studioId=arr[1]
                context.dispatch("getTheatersByPageAsync",{studioId,page:1,rows:10})
           }
        },
        //修改影厅
         async updateTheater2(context,text){
            const {theaterId,name,rowNo,colNo,studioId}=text
            console.log(theaterId,name,rowNo,colNo)
            console.log("a")
            const {data} = await axios.post("/theaters/updateTheater2",{
                _id:theaterId,
                name,
                rowNo,
                colNo,
                page:this.state.studioStore.curPage,
                rows:this.state.studioStore.eachPage
            })
            if(data=="ok"){
                alert("修改成功")
            }
        },
    }

}
