<template>
	<div class="box">
    <img src="../../../static/images/login.jpg" alt="">
    <div class="login">
     <div class="login-title">
      <h1>小书包课堂</h1>
      <p>帮助聪明的小青年们获得更好的学习帮助!</p>
    </div>
    <div class="login_box">
      <div class="title">
        <span v-on:click="isStu = true">学生注册</span>
        <span v-on:click="isStu = false">教师注册</span>
      </div>

      <el-form v-if="isStu == true" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"  class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm2.username" placeholder="请输入用户名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" placeholder="请输入密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" placeholder="确认密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="tel">
          <el-input type="text" v-model="ruleForm2.tel" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" style="width:100%;" @click="submitForm('ruleForm2')">注册</el-button>
          <p class="go_login">  已有账号  
            <router-link :to = "{name:'Login'}"> 立即登录 </router-link>
          </p>                                    
        </el-form-item>
      </el-form>

      <!-- <div class="inp-teacher" v-if="isStu == false"> 
       <input v-model = 'username' type="text"  placeholder="用户名" class="user">
       <input v-model = 'password' type="password" name="" class="pwd" placeholder="密码">
       <input v-model = 'type' type="text"  placeholder="所教课程" class="course">
       <input v-model = 'teachingAge' type="number"  placeholder="教龄" min="0" class="teachingAge">
       <input v-model = 'education' type="text"  placeholder="学历" class="education">
       <input v-model = 'phonenumber' type="text"  placeholder="手机号码" class="phone">
       <el-radio v-model="radio" label="1">男</el-radio>
       <el-radio v-model="radio" label="2">女</el-radio>
       <button class="login_btn" @click = 'loginHandler'>注册</button>
       <p class="go_login" >已有账号 
        <span>
          <router-link :to = "{name:'Login'}">
           立即登录
         </router-link>
        </span>
        </p>
      </div> -->

 </div>
</div>
</div>
</template>

<script>
export default {
  name: 'Register',
  data(){
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话号码不能为空'));
      }
      callback();
    };
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
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
      isStu: true,
      ruleForm2: {
        username: '',
        pass: '',
        checkPass: '',
        tel: ''
      },
      rules2: {
        username: [
        { validator: validateUsername, trigger: 'blur' }
        ],
        pass: [
        { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
        { validator: validatePass2, trigger: 'blur' }
        ],
        tel: [
        { validator: checkTel, trigger: 'blur' }
        ]
      }

    }
  },

  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            name:this.ruleForm2.username,
            password:this.ruleForm2.pass,
            phone: this.ruleForm2.tel,
            is_student: this.isStu
          };
          // if (this.isStu == false){
          //   params = {
          //     name:this.ruleForm2.username,
          //     password:this.ruleForm2.pass,
          //     phone: this.ruleForm2.tel,
          //     is_student: this.isStu
          //   }
          // }
          this.$http.addUser(params).then(res => {
            if(res.error) {
                this.error = res.error;
            } else {
                this.$store.dispatch('setUserInfo', res.data)
                //返回之前的页面
                this.$router.go(-1);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    loginHandler(){
      let params = {
        username:this.username,
        password:this.password,
        phonenumber: this.phonenumber,
        isStu: this.isStu
      };
      if (this.isStu == false){
        params = {
          username:this.username,
          password:this.password,
          phonenumber: this.phonenumber,
          isStu: this.isStu
        }
      }

      this.$http.addUser(params).then( res => {
        console.log(res);
            // if (res.error_no === 0) {           
            //     for(let key in res.data){
            //         this.$cookies.set(key,res.data[key])
            //     }
            //     // 分发actions中getUserInfo方法  找store/index.js
            //     this.$store.dispatch('setUserInfo',res.data)
            //     //返回之前的前面
            //     this.$router.go(-1);
            // }
          })
      .catch(err=>{
        console.log(err);
      })
    },
  },
};
</script>

<style lang="css" scoped>
.box{
	width: 100%;
	position: relative;
}
.box img{
	width: 100%;
}
.box .login {
	position: absolute;
	width: 500px;
	height: 400px;
	top: 50%;
	left: 50%;
	margin-left: -250px;
	margin-top: -300px;
}
.login .login-title{
 width: 100%;
 text-align: center;
}
.login-title img{
  width: 190px;
  height: auto;
}
.login-title p{
  font-family: PingFangSC-Regular;
  font-size: 18px;
  color: #fff;
  letter-spacing: .29px;
  padding-top: 10px;
  padding-bottom: 50px;
}
.login_box{
  width: 400px;
  height: auto;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
  border-radius: 4px;
  margin: 0 auto;
  padding: 0 40px 20px 40px;
}
.login_box .title{
	font-size: 20px;
	color: #9b9b9b;
	letter-spacing: .32px;
	border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  padding: 50px 60px 0 60px;
  margin-bottom: 20px;
  cursor: pointer;
}
.login_box .title span:nth-of-type(1){
	color: #4a4a4a;
  border-bottom: 2px solid #84cc39;
}

.go_login{
  margin-top: 15px;
  text-align: center;
}

</style>
