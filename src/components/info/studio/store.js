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
        getStudiosByPage(state,page){
            // let obj={};
            // obj.data=page.rows;
            // obj.count=page.total;
            // obj.maxPage=Math.ceil(page.total/page.rows.length)
            Object.assign(state,page)
            
        }
    },
    actions:{
        //查询影院
        async getStudiosByPageAsync(context,{page=this.state.studioStore.page,rows=this.state.studioStore.rows}={}){
            const {data} = await axios.get("/studios/getStudios",{
                params:{
                    page,
                    rows
                }
            })
            context.commit("getStudiosByPage",data)
        },
        //添加影院
        async addStudio(context,text){
            const {name,address} = text
            const {data} = await axios.post("/studios/addStudio",{
                    name,
                    address
            })
        },
        //修改影院
        async updateStudio2(context,text){
            const {name,address,studioId} = text
            console.log(studioId)
            const {data} = await axios.get("/studios/updateStudio2",{
                params:{
                    name,
                    address,
                    _id:studioId,
                    page:this.state.studioStore.curPage,
                    rows:this.state.studioStore.eachPage
                }
            })
        },
        //删除影院
        async removeStudio(context,text){
            console.log(text)
            const {_id} = text
            const {data} = await axios.get("/studios/removeStudio",{
                params:{
                    _id,
                    status:0,
                    page:this.state.studioStore.curPage,
                    rows:this.state.studioStore.eachPage
                }
            })
            context.commit("getStudiosByPage",data)
        },
    }

}
