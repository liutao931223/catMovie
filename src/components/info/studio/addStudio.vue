<template>
	<div>
        <div style="margin-bottom:20px">
            <el-input style="width:400px" v-model="name" placeholder="影院名称..."></el-input>
        </div>
        <div style="margin-bottom:20px">
            <el-input style="width:400px" v-model="address" placeholder="影院地址..."></el-input>
        </div>
        <div>
            <el-button type="primary"  @click="add" round>保存</el-button> 
        </div>   
    </div>
</template>
<script>
    import { mapActions } from "vuex"
    export default {
        name:"addStudio",
        data() {
            return {
              name: '',
              address:'',
              studioId:0
            }
        },
        created(){
            if(this.$route.query.studio){
                this.studioId=this.$route.query.studio._id
                this.name=this.$route.query.studio.name
                this.address=this.$route.query.studio.address
            }
        },
        methods:{
            add(){
                if(this.studioId){
                    console.log("修改")
                    this.updateStudio2(this.$data)
                    alert("保存成功！")
                    this.$router.push({
                      path: '/info/studioList', 
                      component: "StudioList",
                    })
                }else{
                    console.log("添加")
                    this.addStudio(this.$data)
                    
                }
            },
            ...mapActions("studioStore",["addStudio","updateStudio2"])
        },
    }
</script>