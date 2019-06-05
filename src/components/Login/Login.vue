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
					<span>密码登录</span>
					<span>短信登录</span>
				</div>

                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"  class="demo-ruleForm">
                    <el-form-item prop="username">
                      <el-input type="text" v-model="ruleForm2.username" placeholder="用户名 / 手机号码" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="pass">
                      <el-input type="password" v-model="ruleForm2.pass" placeholder="请输入密码" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="success" style="width:100%;" @click="submitForm('ruleForm2')"> 登录 </el-button>
                      <p class="go_login">  没有账号  
                        <router-link :to = "{name:'Register'}"> 立即注册 </router-link>
                      </p>                                    
                    </el-form-item>
                </el-form>
			</div>        
		</div>
	</div>
</template>

<script>
export default {
  name: 'Login',
  data(){
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
    return {
        error: "",
        ruleForm2: {
            username: '',
            pass: '',
        },
        rules2: {
            username: [
                { validator: validateUsername, trigger: 'blur' }
            ],
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ]
        }
    }
  },

  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.userLogin(this.ruleForm2.username, this.ruleForm2.pass).then(res => {
            if(res.error) {
                this.error = res.error;
            } else {
                this.$store.dispatch('setUserInfo', res.user)
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
        this.$http.userLogin(this.username, this.password)
        .then(res=>{
            if(res.error) {
                this.error = res.error;
            } else {
                this.$store.dispatch('setUserInfo', res.user)
                //返回之前的页面
                this.$router.go(-1);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },
  },
  created(){
  }
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
    	padding: 40px 60px 0 60px;
    	margin-bottom: 20px;
    	cursor: pointer;
}
.login_box .title span:nth-of-type(1){
	color: #4a4a4a;
    	border-bottom: 2px solid #84cc39;
}

.inp{
	width: 350px;
	margin: 0 auto;
}
.inp input{
    border: 0;
    outline: 0;
    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    text-indent: 20px;
    font-size: 14px;
    background: #fff !important;
}
.inp input.user{
    margin-bottom: 16px;
}
.inp .rember{
     display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-top: 10px;
}
.inp .rember p:first-of-type{
    font-size: 12px;
    color: #4a4a4a;
    letter-spacing: .19px;
    margin-left: 22px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    /*position: relative;*/
}
.inp .rember p:nth-of-type(2){
    font-size: 14px;
    color: #9b9b9b;
    letter-spacing: .19px;
    cursor: pointer;
}

.inp .rember input{
    outline: 0;
    width: 30px;
    height: 45px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    text-indent: 20px;
    font-size: 14px;
    background: #fff !important;
}

.inp .rember p span{
    display: inline-block;
  font-size: 12px;
  width: 100px;
  /*position: absolute;*/
/*left: 20px;*/

}
#geetest{
	margin-top: 20px;
}
.login_btn{
     width: 100%;
    height: 45px;
    background: #84cc39;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    letter-spacing: .26px;
    margin-top: 30px;
}
.go_login{
  margin-top: 15px;
  text-align: center;
}
</style>
