<template>
	<div>
       <el-table
        :data="this.data"
        stripe
        style="width: 100%">
        <el-table-column
          prop="cName"
          label="中文名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="eName"
          label="中文名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="country"
          label="制片国家/地区">
        </el-table-column>
        <el-table-column
          prop="duration"
          label="片长">
        </el-table-column>
        <el-table-column
          prop="release"
          label="上映时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="130">
          <template slot-scope="scope">
            <el-button @click="change(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="~~this.curPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="~~this.eachPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="~~count">
        </el-pagination>
      </div>   
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
     export default {
         data() {
           return {
             curPage1: 1,
             eachPage1: 10
           }
         },
         created() {
           this.getMoviesByPageAsync()
         },
         computed: {
           ...mapState("movieStore", ['curPage', 'eachPage', 'maxPage', 'count', 'data'])
         },
         methods: {
           findPic(row) {
             console.log(row);
           },
           change(row) {
             this.$router.push({
               path: '/info/addMovie',
               query: {
                 data:row
               }
             });
           },
           del(row) {
             this.delMovies(row)
           },
           handleSizeChange(val) {
             this.getMoviesByPageAsync({
               page: this.curPage,
               rows: val
             })
           },
           handleCurrentChange(val) {
             this.getMoviesByPageAsync({
               page: val,
               rows: this.eachPage
             })
           },
           ...mapActions('movieStore', ['getMoviesByPageAsync','delMovies'])
         },
     }
</script>