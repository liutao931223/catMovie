<template>
    <div>
      <el-table
      :data="data"
      style="width: 1200px">
        <el-table-column
          prop="_id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="seats.length"
          label="座位数">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
              <template slot-scope="scope">
                  <el-button @click="handleClick1(scope.row)" type="text" size="small">删除</el-button>
                  <el-button @click="handleClick2(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="handleClick3(scope.row)" type="text" size="small">查看座位</el-button>
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
      name:"theaterList",
      data(){
        return {
          studioId:'',
          page1:1,
          rows1:10
        }
      },
      computed:{
          ...mapState("theaterStore",["page","rows","allPages","count","data"])  
      },
      created(){
        this.studioId=this.$route.query.studioId
        this.getTheatersByPageAsync({studioId:this.studioId,page:this.page1,rows:this.rows1})
      },
      methods:{
        handleClick1(row) {
          let str=''+row._id+'&'+this.studioId
          this.removeTheater(str)
        },
        handleClick2(row) {
          const {_id , name} = row
          let colNo = row.seats[row.seats.length-1].colNo
          let rowNo = row.seats[row.seats.length-1].rowNo
          let str = ''+_id+"&"+name+'&'+colNo+'&'+rowNo
          this.$router.push({
            path: '/info/addTheater', 
            component: "AddStudio",
            query: { 
              theater:str
            }
          })
        },
        handleClick3(row) {
          this.$router.push({
            path: '/info/seatList', 
            query: { 
              theaterId:row._id
            }
          })
        },
        handleSizeChange(val) {
          this.getTheatersByPageAsync({page:this.page,rows:val,studioId:this.studioId})
        },
        handleCurrentChange(val) {
          this.getTheatersByPageAsync({page:val,rows:this.rows,studioId:this.studioId})
        },
        ...mapActions("theaterStore",["getTheatersByPageAsync","removeTheater"])
      }
    }
</script>