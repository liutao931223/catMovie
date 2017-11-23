<template>
  <div class="loginWrap" > 
    <div class="loginBox">
      <h1 class="loginTitle">系统登录</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item  label="用户昵称" prop="username">
          <el-input ref="username" style="width:250px" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input ref="password" style="width:250px" v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="regLink" >
          <a href="#" @click="reg" >没有账号？请注册</a>
        </el-form-item>
        <el-form-item>
          <el-button class="loginBtn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style>
.loginWrap{
  background-color:#1f2d3d;
  height:100%;
  overflow:hidden;
}
.loginBox{
  overflow:hidden;
  background-color:#ffffff;
  width:400px;
  margin:200px auto;
  border-radius:3px;
}
.loginTitle{
  text-align:center;
  margin:30px 0 20px;
}
.loginBtn{
  width:200px;
}
.regLink{ 
  margin:0 0 5px;
}
.regLink a{
  color:#409EFF;
}
.regLink a:hover{
  color:lightpink;
}
</style>

<script>
  import axios from "axios"
  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ], 
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],  
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {   
            this.login()
          } else {
            this.$alert('请输入正确的用户名和密码', '温馨提示', {
              confirmButtonText: '确定',
            });
            return false;
          }
        });
      },   
      async login(){  
        const {data} = await axios.get("/users/login",{
          params:{
            username:this.$refs.username.value,
            password:this.$refs.password.value  
          }
        })
        if(data.isLogin){
          this.$router.push('/info')
        }else{
          this.$alert('用户名或密码错误', '温馨提示', {
            confirmButtonText: '确定',
          });
        }
      }, 
      reg(e){
        e.preventDefault()
        this.$router.push('/reg')
      }
    }
  }
</script>