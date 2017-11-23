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
          prop="displayName"
          label="名称">
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
    export default{
        name:'seat',
        data(){
            return{
                theaterId:'',
                page1:1,
                rows1:10
            }
        },
        computed:{
          ...mapState("seatStore",["page","rows","allPages","count","data"])  
        }, 
        created(){
            this.theaterId=this.$route.query.theaterId
            this.getSeatsListAsync({theaterId:this.theaterId,page:this.page1,rows:this.rows1})
        },
        methods:{
            handleSizeChange(val) {
              this.getSeatsListAsync({page:this.page,rows:val,theaterId:this.theaterId})
            },
            handleCurrentChange(val) {
              this.getSeatsListAsync({page:val,rows:this.rows,theaterId:this.theaterId})
            },
            ...mapActions("seatStore",["getSeatsListAsync"])
        }
    }
</script>