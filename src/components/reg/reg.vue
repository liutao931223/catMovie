<template>
	<div class="regWrap">
		<div class="regBox">
			<h1 class="RegTitle">用户注册</h1>
	    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
	      <el-form-item label="用戶名" prop="username">
	        <el-input ref="username" v-model.String="ruleForm2.username" style="width:250px"></el-input>
	      </el-form-item>
	      <el-form-item label="密码" prop="pass">
	        <el-input ref="password" type="password" v-model="ruleForm2.pass" auto-complete="off" style="width:250px"></el-input>
	      </el-form-item>
	      <el-form-item label="确认密码" prop="checkPass">
	        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" style="width:250px"></el-input>
	      </el-form-item> 
	      <el-form-item class="loginLink">
	        <a href="#" @click="login">已有账户？请直接登录</a>
	      </el-form-item>  
	      <el-form-item>
	        <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
	        <el-button @click="resetForm('ruleForm2')">重置</el-button>
	      </el-form-item>
	    </el-form>
		</div>
	</div>
</template>
<style>
.regWrap{
	background-color:#1f2d3d;
	height:100%;
	overflow:hidden;
}	
.regBox{
	overflow:hidden;
	background-color:#ffffff;
	width:400px;
	margin:200px auto;
	border-radius:3px;
}
.RegTitle{
	text-align:center;
	margin:30px 0 20px;
}
.loginLink{	
	margin:0 0 5px;
}
.loginLink a{
	color:#409EFF;
}
.loginLink a:hover{
	color:lightpink;
}
</style>
<script>
import axios from "axios"
export default {
  name: "reg",
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用戶名不能为空'));
      }else{ 	    	 
      	this.regCheck().then((value) => {
      		if(value){
      			return callback(new Error('该用户名已被占用'))
      		}else{
      			setTimeout(() => {
			        callback()
			      }, 500);
      		}
      	}) 	
      }     
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if(value.length <6){
      	callback(new Error('密码不能少于6位'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: '',
        checkPass: '',
        username: ''
      },
      rules2: {
        pass: [{
        	required: true,
          validator: validatePass,
          trigger: 'blur'
        }],
        checkPass: [{
        	required: true,
          validator: validatePass2,
          trigger: 'blur'
        }],
        username: [{
        	required: true,
          validator: checkUsername,
          trigger: 'blur'
        }]
      }
    };
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        	this.reg()
        	this.$confirm('注册成功', '提示', {
	          confirmButtonText: '登录后台',
	          cancelButtonText: '继续注册',
	          type: 'success'
	        }).then(() => {
	        	this.$router.push({
	            name: "login",
	          })
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消跳转'
	          });          
	        });        
        } else {
          this.$alert('请输入正确的用户名和密码', '温馨提示', {
	          confirmButtonText: '确定',
	        });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async regCheck(){
    	const {data} = await axios.get("/users/regCheck",{
    		params:{
          username:this.$refs.username.value
        }
			})  		
			return data.data[0]
    },
    async reg(){
    	const {data} = await axios.get("/users/reg",{
    		params:{
          username:this.$refs.username.value,
          password:this.$refs.password.value
        }
    	})
    },
    login(e){
    	e.preventDefault()
      this.$router.push('/login')
    }
  }
}
</script>