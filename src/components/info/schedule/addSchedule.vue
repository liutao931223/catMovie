<template>
	<div>
		电影：<el-select v-model="movieList" @change="getScheduleListByMovieId({id:movieList,page:1,rows:5})"  placeholder="请选择">
		    <el-option  
		    v-for="(item,index) in movies"
	      	:key="item._id"
	      	:label="item.cName"
	      	:value="item._id">
		    </el-option>
  		</el-select>
  		影院：<el-select v-model="studioList" @change="getTheater" placeholder="请选择">
		    <el-option  
		    v-for="(item,index) in studios"
	      	:key="item._id"
	      	:label="item.name"
	      	:value="item._id">
		    </el-option>
  		</el-select>
  		影厅：<el-select v-model="theaterList"  placeholder="请选择">
		    <el-option  
		    v-for="(item,index) in theaters"
	      	:key="item._id"
	      	:label="item.name"
	      	:value="item._id">
		    </el-option>
  		</el-select>
  		<div style="margin-top: 10px">
  			时间：<el-date-picker
      				v-model="date"
			     	type="datetime"
			      	placeholder="选择日期时间"
			     	align="right"
			      	:picker-options="pickerOptions1">
   			</el-date-picker>
   			票价：<el-input style="width: 70px" v-model="price" placeholder="请输入内容"></el-input>
   			<el-button @click="add" type="primary">增加排片</el-button>
  		</div>
  		<div style="width: 700px;">
		    <el-table
		      :data="studio.data"
		      border
		      style="width: 700px;margin-top: 10px">
		      <el-table-column
		        prop="name"
		        label="影院名字"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="address"
		        label="影院地址"
		        >
		      </el-table-column>
		      <el-table-column
		      	style="text-align: center;"
		        label="操作"
		        >
		        <template slot-scope="scope">
      				<el-button @click="delStudio(scope.row)" type="danger" size="small">删除</el-button>
      				<el-button @click="check(scope.row)" type="info" size="small">查看影厅</el-button>
      			</template>
		      </el-table-column>
   			 </el-table>
		    <el-pagination
		      @current-change="handleCurrentChange"
		      :current-page.sync="studio.page"
		      :page-size="studio.rows"
		      layout="total, prev, pager, next"
		      :total="studio.count"
		      style="margin: auto;">
		    </el-pagination>   			
  		</div>
  		<el-table
		    :data="theater.data"
	  		stripe
		    border
		    style="margin-top: 10px;width: 700px">
		    <el-table-column
		      prop="theaterId.name"
		      label="影厅名称"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="show_time"
		      label="上映时间"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="price"
		      label="票价"
		      >
		    </el-table-column>
		    <el-table-column
		      label="操作"
		      width="100">
		      <template slot-scope="scope">
		        <el-button @click="handleClickTheaters(scope.row)" type="text" size="small">查看</el-button>
		        <el-button @click='delTheater(scope.row)' type="text" size="small">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<el-pagination
			@current-change="handleCurrentChangeTheater"
	    	:current-page.sync="theater.page"
	    	:page-size="theater.rows"
	    	layout="total, prev, pager, next"
	    	:total="theater.count"
	    	style="margin: auto;">
		</el-pagination>
	</div>
</template>

<script>
	import { mapActions, mapState, mapMutations  } from 'vuex'
	import moment from 'moment'
	export default {
	   	name: "addschedule",
	   	data(){
	   		return {
	   			movieList:"",
	   			studioList:"",
	   			theaterList:"",
	   			price:"30元",
	   			pickerOptions1: {
          			shortcuts: [{
			            text: '今天',
				            onClick(picker) {
				              picker.$emit('pick', new Date());
				            }
			          	}, {
			            text: '昨天',
				            onClick(picker) {
				              const date = new Date();
				              date.setTime(date.getTime() - 3600 * 1000 * 24);
				              picker.$emit('pick', date);
				            }
			          	}, {
			            text: '一周前',
			            onClick(picker) {
			              const date = new Date();
			              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
			              picker.$emit('pick', date);
			            }
			        }]
				},
		        date: new Date()
	   		}
	   	},
	  	created(){			
			this.init()
		},
		computed:{
			...mapState("scheduleStore",["movies","studios","theaters","studio","theater"])
		},
	  	methods: {
	   		...mapActions("scheduleStore",["getMovies","getStudios","getScheduleListByMovieId","addSchedule","getTeatersByStudioId","delStudioByStudioId","delTheaterSchedule"]),
	   		...mapMutations("scheduleStore",["getTheaters"]),
	   		add(){
	   			let schedule={
	   				movieId:this.movieList,
	   				studioId:this.studioList,
	   				theaterId:this.theaterList,
	   				showTime:this.date,
	   				price:this.price
	   			}
	   			this.addSchedule(schedule)
	   			this.date = new Date()
	   			this.getScheduleListByMovieId({id:this.movieList})
	   			console.log(this.studio)
	   		},
	   		check({_id}){
	   			 this.getTeatersByStudioId({
	   			 	movieId:this.movieList,
	   			 	studioId:_id,
	   			 	showTime:this.date,
	   			 	page:1,
	   			 	rows:5
	   			 })
	   			 this.studioList = _id
	   		},
	   		getTheater(){
	   			this.getTheaters(this.studioList)
	   			this.getTeatersByStudioId({
	   			 	movieId:this.movieList,
	   			 	studioId:this.studioList,
	   			 	showTime:this.date,
	   			 	page:1,
	   			 	rows:5
	   			 })
	   			this.theaterList = ""
	   		},
	   		delStudio({_id}){
	   			this.delStudioByStudioId({
	   				movieId:this.movieList,
	   				studioId:_id
	   			})
	   		},
	   		delTheater(row){
	   			this.delTheaterSchedule({
	   				row,showTime:this.date})
	   		},
		    handleCurrentChange(val) {
		        this.getScheduleListByMovieId({
		        	id:this.movieList,
		        	page:val,
		        	rows:this.studio.rows
		        })
		    },
		    handleCurrentChangeTheater(val){
		    	this.getTeatersByStudioId({
		    		movieId:this.movieList,
	   			 	studioId:this.studioList,
	   			 	showTime:this.date,
	   			 	page:val,
	   			 	rows:this.theater.rows
		    	})
		    },
		    async init(){
		     	const {data} = await this.getMovies()
		     	this.movieList =data[0]._id
		     	this.getScheduleListByMovieId({id:this.movieList,page:1,rows:5})
				this.getStudios()
		    }
		}
	}
</script>


<style>
	
</style>