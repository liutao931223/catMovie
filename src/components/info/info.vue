<template>
 	<div>
		<el-container style="width: 100%;margin: auto;">
			<el-header>猫眼后台管理系统</el-header>
			<el-container>
				<el-aside style="width: 201px;border-right: solid 1px #e6e6e6;background-color: #D6ECF0">
					<el-menu
						router
						:default-openeds ="arry"
			      		default-active="1"
			      		background-color="#D6ECF0"   				
			      		style="border-right: none;"
			      		class="el-menu-vertical-demo">
			     		<el-submenu index="1">
				        	<template slot="title">				          
				          		<img src="../../assets/电影.png" style="width: 24px;height: 24px">
				          		<span>电影信息管理</span>
				        	</template>
				        <el-menu-item-group>
				          <el-menu-item index="/info/movieList">
				          	<img src="../../assets/列表.png" style="width: 24px;height: 24px">
				             电影列表</el-menu-item>
				          <el-menu-item index="/info/addMovie">
				          	<img src="../../assets/增加.png" style="width: 24px;height: 24px">   添加电影</el-menu-item>
				        </el-menu-item-group>			        
			      </el-submenu>
			      <el-submenu index="2">
				        <template slot="title">
				           <img src="../../assets/电影院.png" style="width: 24px;height: 24px">
				          <span>影院信息管理</span>
				        </template>
			        <el-menu-item-group>
			        	<el-menu-item index="/info/studioList">
			        		<img src="../../assets/列表.png" style="width: 24px;height: 24px"> 影院列表</el-menu-item>
			          	<el-menu-item index="/info/addStudio"><img src="../../assets/增加.png" style="width: 24px;height: 24px">  添加影院</el-menu-item>
			        </el-menu-item-group>			        
			      </el-submenu>
			      <el-submenu index="3">
				        <template slot="title">
				           <img src="../../assets/排片.png" style="width: 24px;height: 24px">
				          <span>排片管理</span>
				        </template>
				        <el-menu-item-group>
				          	<el-menu-item index="/info/addSchedule"><img src="../../assets/增加.png" style="width: 24px;height: 24px"> 增加排片</el-menu-item>
			        	</el-menu-item-group>		        			        
			      </el-submenu>
			         <el-submenu index="4">
				        <template slot="title">
				           <img src="../../assets/资讯.png" style="width: 24px;height: 24px">
				          <span>资讯管理</span>
				        </template>
			        <el-menu-item-group>
			        	<el-menu-item index="/info/addNews"><img src="../../assets/增加.png" style="width: 24px;height: 24px"> 添加资讯</el-menu-item>
			          	<el-menu-item index="/info/newsList"><img src="../../assets/列表.png" style="width: 24px;height: 24px"> 资讯列表</el-menu-item>
			        </el-menu-item-group>			        
			      </el-submenu>
			    </el-menu>
			</el-aside>
				<el-main>
					<router-view></router-view>
			</el-main>
			</el-container>			
		</el-container>
	</div>
</template>

<script>
export default {
  name: "info",
  data(){
  	return {
  		arry :["1"]
  	}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
.el-header {
 	text-align: center;
 	font-size: 26px;
 	font-size: 600;
  background-color: #D6ECF0;
  color: #333;
  line-height: 60px;
}
</style>
