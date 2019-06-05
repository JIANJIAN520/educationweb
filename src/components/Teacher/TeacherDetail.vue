<template>
  <div class="contain">
    <div class="head">
      <img class="userImg" v-if="teacher.picture" :src="GLOBAL.mediaUrl + teacher.picture" alt="">
      <p class="username">{{ teacher.name }}
        <span>{{ teacher.education }}</span>
        <span>{{ teacher.description }}</span>
      </p>
    </div>
    <el-divider></el-divider>

    <el-col :offset="3" :md="16" :lg="16">
      <p style="font-size: 24px;margin-top:20px;">课程</p>
      <ul>
        <li v-for="(course, index) in teacher.courses" :key="course.id" @click="courseHandler(course.id)">
          <el-divider></el-divider>
          <el-container>
            <el-aside width="300px">
              <img  :src="GLOBAL.mediaUrl + course.image" width="100%" alt>
            </el-aside>
            <el-main>
              <div class="name">
                <p style="line-height:4; font-size: 24px;">{{ course.name}}</p>
              </div>
              <div class="teacher">
                <p style="font-size: 16px;margin-bottom:20px;"> 
                  <span>{{course.teacher.name}}</span>
                  <span>{{course.teacher.subject == 'chinese' ? '小学语文' : (course.teacher.subject == 'math' ? '小学数学' : '小学英语')}}</span>
                  <span>{{course.teacher.education}}</span>
                  <span>{{course.teacher.teaching_age}}年教龄</span>
                </p>
              </div>
            </el-main>
          </el-container>
        </li>
      </ul>
    </el-col>

  </div>
</template>

<script>
export default {
  name: "TeacherDetail",

  data() {
    return {
      teacherId: this.$route.params.teacherId,
      teacher: {},
    };
  },
  methods: {
    getTeacherById() {
      this.$http.getTeacherById(this.teacherId).then( res => {
        if(res.error){} else {
          this.teacher = res.data;
          console.log(this.teacher);
        }
        
      });
    }
  },
  computed:{
    userInfo(){    
      return this.$store.state.userInfo;
    },
  },
  created() {
    this.getTeacherById();
  },
  destroyed() {
    
  }
};
</script>

<style>
button{
  border: 0;
  outline: 0;
}
.like{
  position: absolute;
  left: 460px;
  height: 40px;
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
  .userImg{
  /*position: absolute;*/
  width: 150px;
  height: 150px;
  margin: 50px 0 0 100px;
}
.head .username{
  font-size: 24px;
  position: absolute;
  left: 300px;
  top:150px;
}
.head .username span{
  font-size: 16px;
  display: block;
}
  </style>

