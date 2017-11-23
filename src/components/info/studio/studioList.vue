<template>
	<div>
      <el-table
      :data="data"
      style="width: 1000px">
        <el-table-column
          prop="_id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
              <template slot-scope="scope">
                  <el-button @click="handleClick1(scope.row)" type="text" size="small">删除</el-button>
                  <el-button @click="handleClick2(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看影厅</el-button>
                  <el-button @click="handleClick3(scope.row)" type="text" size="small">增加影厅</el-button>
              </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="~~page"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="~~rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count">
        </el-pagination>
      </div>   
    </div>
</template>
<script>
    import { mapState , mapActions } from "vuex"
    export default {
        name:"studioList",
        computed:{
          ...mapState("studioStore",["page","rows","allPages","count","data"])  
        },
        created(){
            this.getStudiosByPageAsync()
        },
        methods:{
          handleClick(row) {
            this.$router.push({
              path: '/info/theaterList',
              query: { 
                studioId:row._id
              } 
            })
          },
          handleClick1(row) {
            this.removeStudio(row)
          },
          handleClick2(row) {
            this.$router.push({
              path: '/info/addStudio', 
              component: "AddStudio",
              query: { 
                studio:row
              }
            })
          },
          handleClick3(row) {
            this.$router.push({
              path: '/info/addTheater',
              query: { 
                studio:row
              }  
            })
          },
          handleSizeChange(val) {
            console.log(val)
            this.getStudiosByPageAsync({page:this.page,rows:val})
          },
          handleCurrentChange(val) {
            console.log(val)
            this.getStudiosByPageAsync({page:val,rows:this.rows})
          },
          ...mapActions("studioStore",["getStudiosByPageAsync","removeStudio"])
        }
    }
</script>