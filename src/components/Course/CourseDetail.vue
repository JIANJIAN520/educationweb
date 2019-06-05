<template>
  <div class="courseitem">
    <div class="head-wrap">
      <div class="head-video">
        <div class="videos">
          <video v-if="currentChapter" :src="GLOBAL.mediaUrl + currentChapter.video" controls="controls" preload="auto" width="100%" height="100%">
            您的浏览器不支持视频播放。
          </video>
        </div>
        <div class="item">
          <p class="name">{{course.name}}</p>
          <p class="data">{{course.learn_number}}人在学&nbsp;&nbsp;&nbsp;&nbsp;课程总时长：{{course.numbers}}课时/{{course.hours}}小时</p>
          <p class="price">
            <span>价格:</span>
            <span class="sp1">¥{{ course.price }}</span>
          </p>
          <div class="bottom">
            <p class="btns" v-if=" course.price > 0 ">
              <button class="btn1" @click="handleOfBuy">立即购买</button>
              <button class="btn2">免费试学</button>
            </p>
            <el-button v-if=" course.price == 0 " type="warning" plain @click="handleOfStudy">立即学习</el-button>

            <p class="add" v-if = 'paymentInfo.has_price' @click='addShop(paymentInfo.valid_period)'>
              <img src="../../../static/images/shop.svg" alt="">
              <transition name="bounce"  v-on:after-enter="afterEnter">
                <p v-if="show" class='active'>+1</p>
              </transition>
            </p>

          </div>
        </div>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :offset="1" :md="16" :lg="16">

        <div class="ui labeled button like" tabindex="0">
          <div class="ui button" @click="handleOfLike">
            <i v-if="like.is_liker" style="color:red;" class="heart icon"></i>
            <i v-else class="heart icon"></i>喜欢
          </div>
          <a class="ui basic label">
            {{ like.like_count }}
          </a>
        </div> 

        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="详情介绍" name="introduce">
            <div class="text item">{{ course.description }}</div>
          </el-tab-pane>
          <el-tab-pane label="课程章节" name="chapter">
            <div v-for="chapter in course.chapters" :key="chapter.id" class="text item">
              <el-link type="info">
                <img src="../../../static/images/play.svg" alt>
                {{ chapter.name }}
              </el-link>             
            </div>
          </el-tab-pane>

          <el-tab-pane label="用户评论" name="comment">
            <div v-if="userInfo">
              <el-image v-if="userInfo.image" :src="GLOBAL.mediaUrl + userInfo.image"></el-image>
              <el-image v-else src="../../../static/images/user.jpg"></el-image>    
              <el-input type="textarea" :rows="2" resize="none" style="width:88%; margin-left:20px;"  placeholder="写下你的评论" v-model="content"></el-input>
              <div style="text-align: right;padding-top:10px;">
                <el-button round @click="handleOfCancel">取消</el-button>
                <el-button type="success" round @click="handleOfSend">发送</el-button>
              </div>
            </div>
                       
            <h4>评论</h4>
            <el-divider></el-divider>

            <div v-for="comment in comments" :key="comment.id" class="text item">
              <el-container>
                <el-aside width="50px">
                  <el-image v-if="comment.user.image" :src="GLOBAL.mediaUrl + comment.user.image "></el-image>                            
                  <el-image v-else src="../../../static/images/user.jpg"></el-image>  
                </el-aside>
                <el-main style="padding-top:0;">
                  <el-link type="success" :underline="false">{{ comment.user.name }}</el-link>
                  <p>{{ comment.content }}</p>                    
                </el-main>
              </el-container>                                                   
              <el-divider></el-divider>
            </div>
          </el-tab-pane>

          <el-tab-pane label="章节检测" name="problem">
            <div class="text item">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="">
                  <p>课程标题 <span style="margin-left:100px;">成绩：<span style="color:red;">25分</span></span></p>
                </el-form-item>               
                <el-divider></el-divider>

                <el-form-item label="" v-for="(problem,index) in problems">
                  <p>{{ index + 1 }} . {{ problem.title }}</p> 
                  <el-radio-group v-model="form.resource1">
                    <el-radio :label="option.id" v-for="option in problem.options" :key="option.id">{{ option.title }}
                    </el-radio>
                  </el-radio-group>
                  <div>
                    <span style="margin-left:25px;">我的答案：A</span>
                    <span style="margin-left:25px;">得分：<span style="color:red;">25.0分</span></span>
                    <span style="margin-left:25px;color:green;font-size:24px;">
                      <i class="el-icon-success"></i>
                    </span>
                  </div>
                  <el-divider></el-divider>
                </el-form-item>
                

                <!-- <el-form-item label="">
                  <p>2.2018年“九合一”选举罕见地出现“一人救一党,一党救高雄”的现象,其中“一人”指的是()。</p>
                  <el-radio-group v-model="form.resource2">
                    <el-radio label="1">A.韩国瑜</el-radio>
                    <el-radio label="2">B.蔡英文</el-radio>
                    <el-radio label="3">C.陈其迈</el-radio>
                    <el-radio label="4">D.赖清德</el-radio>
                  </el-radio-group>
                  <div>
                    <span style="margin-left:25px;">我的答案：A</span>
                    <span style="margin-left:25px;">得分：<span style="color:red;">0.0分</span></span>
                    <span style="margin-left:25px;color:red;font-size:24px;"><i class="el-icon-error"></i></span>
                  </div>
                  <el-divider></el-divider>
                </el-form-item> -->

                  <el-form-item>
                    <el-button @click="onSubmit" type="info">提交</el-button>
                  </el-form-item>

            </el-form>
            </div>
          </el-tab-pane>
        </el-tabs> 
      </el-col>
    </el-row>

  </div>

</template>

<script>
export default {
  name:'CourseDetail',
  data(){
    return {
      course:{},
      paymentInfo:{},
      show:false,
      comments: [],
      problems: [],
      activeName: 'introduce',
      content: '',
      courseId: this.$route.params.detailId,
      isLike: false,
      currentChapter: {},
      like: {},
      navList: [
      { id: 1, title: '详情介绍', name: 'introduce'},
      { id: 2, title: '课程章节', name: 'chapter'},
      { id: 3, title: '用户评论', name: 'comment'},
      { id: 4, title: '常见问题', name: 'problem'},
      ],
      form: {
        resource1: '1',
        resource2: '2',
      },
    }
  },
  methods:{
    onSubmit() {
      console.log('submit!');
    },
    afterEnter(){
      this.show = false;
    },
    handleClick(tab, event) {
      console.log(tab.paneName);
      if (tab.paneName == "comment") {
        this.getComments();
      }
      if (tab.paneName == "problem") {
        this.getProblems();
      }
    },
    handleOfLike() {
      let token = this.$cookies.get('token');
      if(!token) {
        alert('未登录！登录后才能进行点赞！');
      } else {
        this.$http.updateLike(this.courseId).then( res => {
          this.getLikes();
          console.log(res);
        });
      }
    },
    getProblems() {
      this.$http.getProblems(this.courseId,this.currentChapter.id).then(res => {
        console.log(res.data.problems);
        this.problems = res.data.problems;
      })
    },
    getComments() {
      this.$http.getComments(this.courseId).then(res => {
        this.comments = res.data
      })
    },
    getLikes() {
      this.$http.getLikes(this.courseId).then(res => {        
        this.like = res;
      });
    },
    handleOfBuy() {
      console.log('购买成功');
    },
    handleOfStudy() {
      console.log('开始学习');
    },
    handleOfCancel() {
      this.content = '';
    },
    handleOfSend() {
      this.$http.addComment(this.courseId,this.content).then(res => {
        if (res.msg == 'ok') {
          this.content = '';
          this.getComments();
        }
      });
    },
    // 添加购物车按钮事件
    addShop(validPeriodId){
      if (this.$cookies.isKey('access_token')) {
          //用户已登录  买东西
          let param = {
            courseId:this.courseId,
            validPeriodId:validPeriodId
          }
          this.$http.shopCart(param)
          .then(res=>{
            console.log(res);
            if (res.error_no ===10) {
              this.$message('购物车套餐更新成功')
            }
            if (res.error_no === 0) {
              this.show = !this.show;
              var num = parseInt(this.$cookies.get('shop_cart_num'));
              num++;
                  //分发actions中声明的shopcart_num方法，让购物车的数量+1
                  this.$store.dispatch('shopcart_num',num);

              //同时保存cookie中存储的购物车数量
              this.$cookies.set('shop_cart_num',num)
            }
            
          })
          .catch(err=>{
            console.log(err);
          })
        }else{
          //用户未登陆
          // 跳转登录页面 
          // 使用编程式导航来跳转
          this.$router.push({
            name:'Login',
            query:{
              return_url:window.location.href
            }
          })

        }

      },
      getCourseById(){
        this.$http.courseTop(this.$route.params.detailId)
        .then(res=>{
          console.log(res)
          this.course = res.data;
          if(this.course.chapters){
            this.currentChapter = this.course.chapters[0];
            console.log(this.currentChapter);
          }
        })
      },
      getCoursePaymentInfo(){
      // this.$http.coursePaymentInfo(this.$route.params.detailId)
      // .then(res=>{
      //   console.log(res);
      //   this.paymentInfo = res.data;
      // })
    }
  },
  computed:{
    userInfo(){    
      return this.$store.state.userInfo;
    },
  },
  created(){
    this.getCourseById();
    this.getLikes();
    // this.getCoursePaymentInfo()
  }
}
</script>

<style>
button{
  border: 0;
  outline: 0;
}
.like{
  position: absolute;
  left: 460px;
  height: 38px;
  z-index: 999;
}
.ui.button {
  background:#fff;
  padding-right: 0;
  color: #1e70bf;
}
.ui.button:hover{
  background: #fff;
  color: #1e70bf;
}
.ui.basic.label{
  background:#fff;
  border:unset;
}
.el-image{
  width: 50px;
  height: 50px;
}
.el-image img{
  border-radius:25px; 
}
.el-row{
  padding-left: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
}

.singles-video .prism-info-display {
  z-index: 1 !important;
}
.singles-video .prism-big-play-btn {
  position: absolute;
  left: 50% !important;
  bottom: 50% !important;
  margin-left: -31.5px !important;
  margin-bottom: -31.5px !important;
  cursor: pointer !important;
  z-index: 2 !important;
}
.courseitem {
  width: 100%;
  height: auto;
  background: #FAFAFA
}

.courseitem .head-wrap {
  width: 100%;
  height: auto;
  background: #fff;
  padding-top: 30px
}

.courseitem .head-wrap .head-video {
  width: 1200px;
  height: auto;
  display: flex;
  margin: 0 auto
}

.courseitem .head-wrap .head-video .videos {
  width: 690px;
  height: 388px;
  background: #000
}

.courseitem .head-wrap .head-video .videos div {
  width: 100%;
  height: 100%
}

.courseitem .head-wrap .head-video .item {
  flex: 1;
  background: #fff;
  position: relative
}

.courseitem .head-wrap .head-video .item .name {
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: #333333;
  padding: 10px 23px;
  letter-spacing: 0.45px
}

.courseitem .head-wrap .head-video .item .data {
  padding-left: 23px;
  padding-right: 23px;
  padding-bottom: 16px;
  font-size: 14px;
  color: #9B9B9B;
  font-family: PingFangSC-Light
}

.courseitem .head-wrap .head-video .item .preferential {
  width: 100%;
  height: auto;
  background: #FA6240;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #4A4A4A;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 23px
}

.courseitem .head-wrap .head-video .item .preferential p:nth-of-type(1) {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 0.36px
}

.courseitem .head-wrap .head-video .item .preferential p:nth-of-type(2) {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FFFFFF
}

.courseitem .head-wrap .head-video .item .preferential p:nth-of-type(2) span {
  width: 24px;
  height: auto;
  display: inline-block;
  background: #FAFAFA;
  color: #5E5E5E;
  padding: 6px 0;
  text-align: center
}

.courseitem .head-wrap .head-video .item .price {
  width: 100%;
  height: auto;
  background: #F9F1E7;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #4A4A4A;
  display: flex;
  align-items: flex-end;
  padding: 5px 23px
}

.courseitem .head-wrap .head-video .item .price .sp1 {
  font-size: 26px;
  color: #FA6240;
  margin-left: 10px;
  display: inline-block;
  margin-bottom: -5px
}

.courseitem .head-wrap .head-video .item .price .sp2 {
  font-size: 14px;
  color: #9b9b9b;
  margin-left: 10px;
  text-decoration: line-through
}

.courseitem .head-wrap .head-video .item .bac {
  background: #fff
}

.courseitem .head-wrap .head-video .item .bottom {
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 23px;
  padding-right: 23px
}

.courseitem .head-wrap .head-video .item .bottom .btns {
  display: flex;
  align-items: center
}

.courseitem .head-wrap .head-video .item .bottom .btns button {
  width: 125px;
  height: 40px;
  background: #F5A623;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  margin-right: 15px
}

.courseitem .head-wrap .head-video .item .bottom .btns .btn2 {
  background: #fff;
  color: #F3A536;
  border: 1px solid #F3A536
}

.courseitem .head-wrap .head-video .item .bottom .add img {
  width: 20px;
  height: auto;
  cursor: pointer
}

.courseitem .this {
  color: #F5A623;
  border-bottom: 2px solid #F5A623
}

.courseitem .this span {
  color: #F5A623 !important
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
/*.bounce-leave-active {
  animation: bounce-in .5s reverse;
  }*/
  @keyframes bounce-in {
    0% {
      transform: translate(0,0);
    }
    100% {
      transform: translate(0,-50px);
    }
  }
  p.add{
    position: relative;
  }
  p.active{
    color: #D38600;
    font-size: 20px;
    font-weight: 500;
    position: absolute;
    top: -5px;
    left: 0;
  }
  </style>

