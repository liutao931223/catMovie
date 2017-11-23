<template>
    <div>
        <div style="margin-bottom:20px">
            <el-input style="width:400px" v-model="name"  placeholder="影厅名称..."></el-input>
        </div>
        <div style="margin-bottom:20px">
            <el-input style="width:400px" v-model="colNo"  placeholder="座位列数..."></el-input>
        </div>
        <div style="margin-bottom:20px">
            <el-input style="width:400px" v-model="rowNo"  placeholder="座位行数..."></el-input>
        </div>
        <div>
            <el-button type="primary" @click="add" round>保存</el-button> 
        </div>    
    </div>
</template>
<script>
    import { mapActions } from "vuex"
    export default {
        name:"addTheater",
        data() {
            return {
              name: '',
              colNo:'',
              rowNo:'',
              studioId:'',
              theaterId:''
            }
        },
        created(){
            if(this.$route.query.studio){
                this.studioId=this.$route.query.studio._id
            }else{
                let arr=this.$route.query.theater.split("&")
                this.theaterId=arr[0]
                this.name=arr[1]
                this.colNo=arr[2]
                this.rowNo=arr[3]
            }
        },
        methods:{
            add(){
                if(this.theaterId){
                    console.log("修改")
                    this.updateTheater2(this.$data)
                }else{
                    console.log("增加")
                    this.addTheater(this.$data)
                    
                }
            },
            ...mapActions("theaterStore",["addTheater","updateTheater2"])
        }
    }
</script>