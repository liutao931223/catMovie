<template>
	<div class="addNewsWrap">
		<div>
			<span class="addNewsDes">电影名称</span>
			<el-select @change="changeValue" v-model="value"  placeholder="请选择">
		    <el-option
		      v-for="item in options"
		      :key="item._id"
		      :label="item.cName"
		      :value="item._id">
		    </el-option>
		  </el-select>
		</div>
		<div>
			<span class="addNewsDes">资讯标题</span>
			<el-input
				style="width:300px;"
		    	suffix-icon="el-icon-document"
		    	v-model="title">
		    </el-input>
		</div>
		<div>
			<el-upload
			  :data="img"
			  class="upload-demo"
			  action="/news/upload"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  :on-success="getImgId"
			  multiple
			  :limit="3"
			  :on-exceed="handleExceed">		  
			  <el-button size="small" type="primary">点击添加图片</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,注意一张图片一个描述，且必须先写描述</div>
			</el-upload>
		</div>
		<div class="picDes">
			<span class="addNewsDes">图片描述</span>
			<el-input
				style="width:400px;"
		  	type="textarea"
		  	v-model="description"
		  	@blur="addNewsBlur"
			  :autosize="{ minRows: 4}"
			  placeholder="请输入图片描述">
			</el-input>
		</div>
		<el-button @click="addNewsBtn" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
	</div>
</template>
<style>
	.addNewsWrap{
		width: 600px;
		margin-left: 30px;
	}
	.addNewsWrap>*{
		margin-bottom: 30px;
	}
	.addNewsDes{
		display: inline-block;
		width: 100px;
	}
	.upload-demo{
		width: 400px;
	}
	.picDes{
		display: flex;
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
        description:"",
        title:"",
        img:{},
        imgsId:[]  
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
    		return data.data
    	},
    	handleRemove(file, fileList) {
        	console.log(file, fileList);
      	},
      	handlePreview(file) {
        	console.log(file);
      	},
      	handleExceed(files, fileList) {
        	this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      	},
      	changeValue(value){
      		this.movieId = value
      		this.imgsId = []
      	},
      	getImgId(response, file, fileList){
      		this.imgsId.push(response)
      	},
      	async addNewsBtn(){ 
      	const data = await axios.post('/news/addNews',{
      			movieId:this.movieId,
				title: this.title, 
				imgs:this.imgsId
      	})	
      },
      addNewsBlur(){
      	this.img.img=JSON.stringify({type:4,description:this.description})
      }
    }
  }
</script>