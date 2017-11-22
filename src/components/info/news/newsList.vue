<template>
	<div class="newsListWrap">
		<div>
			<span class="newsListDes">电影名称</span>
			<el-select @change="changeValue" v-model="value"  placeholder="请选择">
		    <el-option
		      v-for="item in options"
		      :key="item._id"
		      :label="item.cName"
		      :value="item._id">
		    </el-option>
		  </el-select>
		</div>
		<el-table
      :data="tableData.data"
      style="width: 100%">
      <el-table-column
        prop="movieId.cName"
        label="电影名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="资讯标题"
        width="180">
      </el-table-column>
      <el-table-column
        label="图片" width="120" >
        <template scope="scope">
        	<img style="width:100px;height:100px;" v-for="item in scope.row.imgs" :src="'http://127.0.0.1:3001'+item.url" />
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="图片描述">
        <template scope="scope">
        	<p v-for="item in scope.row.imgs">{{item.description.slice(0,40)}}...</p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
	</div>
</template>
<style>
	.newsListWrap{
		margin-left: 30px;
	}
	.newsListDes{
		width: 100px;
	}
</style>
<script>
	import axios from "axios"
	export default {
    data() {
      return {
      	options: [{
          value: '',
          label: ''
        }],
        value:"",
        movieId:"",
        tableData: {
          page:1 ,
          count: 0,
          allPages: 0,
          rows:10,
          data:[]
        }
	    };
	  },
	  mounted() {
	    this.getMovies().then((data)=>{
	    	this.options = data
	    })    
	  },
    methods: {
    	async getMovies(){
    		const {data} = await axios.get('/movies/getMovies')	
    		return data.rows
    	},
    	changeValue(value){
      	this.movieId = value
      	this.getNewsByMovieId().then((data)=>{
      		// console.log(data.data)
      		data.data = data.data.map(item => {
      			// console.log(item)
      			item.imgs = item.imgs.map(val => {
      				// console.log(val)
      				val.url = val.url.substring(1)
      				return val
      			})
      			return item;
      		})
      		// console.log(data)
      		for (let key in data){
      			if(key === "page" || key === "rows"){
      				this.tableData[key] = ~~data[key];
      				continue;
      			}
      			this.tableData[key] = data[key];
      		}
      		
      	})
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      async getNewsByMovieId(){
      	const {data} = await axios.get('/news/getNewsByMovieId',{
      		params:{
      			movieId:this.movieId
      		}
      	})	
      	return data
      }
    }
  }
</script>