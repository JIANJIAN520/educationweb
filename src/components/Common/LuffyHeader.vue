<template>
  <!-- element-ui -->
 <el-container>
      <el-header height = '80px' >
            <div class="header">
                <div class="nav-left">
                  <h1>小书包课堂</h1>
                </div>
                <div class="nav-center">
                  	<ul>
                  		<li v-for = '(list) in headerList' :key = 'list.id'>
                  			<router-link :to = '{name:list.name}'>
                  			 {{list.title}}
                  			</router-link>
                  		</li>
                      <li>
                        <el-input size="small" placeholder="请输入内容" @keyup.enter.native="exequery" prefix-icon="el-icon-search" v-model="inputQuery"></el-input>
                      </li>
                  	</ul>
                </div>
                
                <!-- <el-dropdown> -->
               <div class="nav-right " v-if = 'userInfo' @mouseenter = 'enterHandler' @mouseleave ='leaveHandler'>
                  <span class = 'el-dropdown-link'>学习中心</span>
                 	<span class="user">{{userInfo.name}}</span>
                 	<img v-if="userInfo.image" :src="GLOBAL.mediaUrl + userInfo.image" alt="">
                   <img v-else src="../../../static/images/user.jpg" alt="">
                  <ul class="my_account" v-show = 'isShow'>
                      <li>
                        <router-link :to = "{name:'Center'}">
                          我的账户
                        </router-link>                        
                      </li>
                      <li>
                        我的订单
                      </li>
                      <li>
                        我的消息<span class="msg">(40)</span>
                      </li>
                      <li @click ='logout'>
                       退出
                      </li>
                  </ul>
                </div> 
              <!-- </el-dropdown> -->
                <div class="nav-right" v-else>
                  <router-link :to = "{name:'Login'}">
                  	登录
                  </router-link>
                  &nbsp;| &nbsp;
                  <router-link :to = "{name:'Register'}">
                  	注册
                  </router-link>
                </div>
            </div>
      </el-header>
    </el-container>

</template>

<script>
export default {

  name: 'LuffyHeader',
  data(){
    return {
        headerList:[
          {id:'1', name:'Home', title:'首页'},
          {id:'2', name:'Course', title:'课程'},
          // {id:'3', name:'', title:'题库'},`
          {id:'4', name:'Teacher', title:'师资介绍'},
          // {id:'5', name:'Center', title:'个人中心'}
        ],
        isShow:false,
        inputQuery: '',
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('removeUserInfo')
    },
    enterHandler(){
      this.isShow = true;
    },
    leaveHandler(){
      this.isShow = false;
    },
    exequery() {
     this.$http.exequery({name:this.inputQuery}).then(res => {
       console.log(res.data);
     });
    }
  },
  computed:{
    userInfo(){    
      return this.$store.state.userInfo
    },
    shopcart_num(){      
      return this.$store.state.num
    }
  },
  created() {
  },

};
</script>

<style lang="css" scoped>
.el-header{
  border-bottom: #c9c9c9;
  box-shadow: 0 0.5px 0.5px 0 #c9c9c9;
}
.header{
  /* width: 1200px; */
  height: 80px;
  line-height: 80px;
  margin: 0 auto;
}
.nav-left{
  float: left;
 margin-top: 10px;
}
.nav-center{
  float: left;
  margin-left: 100px;
  /* width:  */
}

.nav-center ul{
	overflow: hidden;
}
.nav-center  ul li{
	float: left;
	margin: 0 5px;
	/*width: 100px;*/
	padding: 0 20px;
	height: 80px;
	line-height: 80px;
	text-align: center;
}
.nav-center ul li a{
	color: #4a4a4a;
	width: 100%;
	height: 60px;
	display: inline-block;

}
.nav-center ul li a:hover{
	color: #B3B3B3;
}
.nav-center ul li a.is-active{
	    color: #4a4a4a;
    	     border-bottom: 4px solid #ffc210;
}
.nav-right{
  float: right;
  position: relative;
  z-index: 100;
  
}
.nav-right span{
  cursor: pointer;
}
.nav-right .user{
	margin-left: 15px;
}
.nav-right img{
	width: 26px;
	height: 26px;
	border-radius: 50%;
	display: inline-block;
	vertical-align: middle;
	margin-left: 15px;
}
.nav-right  ul{
  position: absolute;
  width: 221px;
  z-index: 100;
  font-size: 12px;
  top: 80px;
  background: #fff;
  border-top: 2px solid #d0d0d0;
    box-shadow: 0 2px 4px 0 #e8e8e8;
}
.nav-right ul li{
    height: 40px;
    color: #4a4a4a;
    padding-left: 30px;
    padding-right: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all .2s linear;
}
.nav-right ul li span.msg{
  margin-left: -80px;
  color: red;
}
.nav-right ul li span.count{
  margin-left: -100px;
  color: red;
}
</style>
