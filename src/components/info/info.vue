<template>
	<div>
		<el-container style="width: 1300px;margin: auto;">
			<el-header>猫眼后台管理系统</el-header>
			<el-container>
				<el-aside style="width: 201px;border-right: solid 1px #e6e6e6;">
					<el-menu
						router
						:default-openeds ="arry"
			      		default-active="1"   				
			      		style="border-right: none;"
			      		class="el-menu-vertical-demo"
			      >
			     	<el-submenu index="1">
				        <template slot="title">
				          <i class="el-icon-location"></i>
				          <span>电影信息管理</span>
				        </template>
			        <el-menu-item-group>
			          <el-menu-item index="/info/movieList">电影列表</el-menu-item>
			          <el-menu-item index="/info/addMovie">添加电影</el-menu-item>
			        </el-menu-item-group>			        
			      </el-submenu>
			      <el-submenu index="2">
				        <template slot="title">
				          <i class="el-icon-location"></i>
				          <span>影院信息管理</span>
				        </template>
			        <el-menu-item-group>
			        	<el-menu-item index="/info/studioList">影院列表</el-menu-item>
			          	<el-menu-item index="/info/addStudio">添加影院</el-menu-item>
			        </el-menu-item-group>			        
			      </el-submenu>
			      <el-submenu index="3">
				        <template slot="title">
				          <i class="el-icon-location"></i>
				          <span>排片管理</span>
				        </template>
				        <el-menu-item-group>
			          		<el-menu-item index="">排片列表</el-menu-item>
				          	<el-menu-item index="">增加排片</el-menu-item>
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
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
</style>
