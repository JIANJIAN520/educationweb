<template>
	<div class="contain">
    <div class="head">
      <img class="userImg" v-if="userInfo.image" :src="GLOBAL.mediaUrl + userInfo.image" alt="">
      <img class="userImg" v-else src="../../../static/images/user.jpg" alt="" srcset="">
      <p class="username">{{ userInfo.name }}，你好！</p>
      <span>活着就要学习，学习不是为了活着。</span> 
      <el-button @click="handleOfCenter" type="success" style="border:1px solid #ffffff;margin-left:20px;" round>查看资料</el-button>
    </div>
    <el-col :offset="3" :md="16" :lg="16">
      <p style="font-size: 24px;margin-top:20px;">我的课程</p>
      <ul>
        <li v-for="(course, index) in courseList" :key="course.course.id" @click="courseHandler(course.id)">
          <el-divider></el-divider>
          <el-container>
            <el-aside width="400px">
              <img  :src="GLOBAL.mediaUrl + course.course.image" width="100%" alt>
            </el-aside>
            <el-main>
              <div class="name">
                <p style="line-height:4; font-size: 24px;">{{ course.course.name}}</p>
              </div>
              <div class="teacher">
                <p style="font-size: 16px;margin-bottom:20px;"> 
                  <span>{{course.course.teacher.name}}</span>
                  <span>{{course.course.teacher.subject == 'chinese' ? '小学语文' : (course.course.teacher.subject == 'math' ? '小学数学' : '小学英语')}}</span>
                  <span>{{course.course.teacher.education}}</span>
                  <span>{{course.course.teacher.teaching_age}}年教龄</span>
                </p>
              </div>
            </el-main>
          </el-container>
        </li>
      </ul>
    </el-col>

    <div class="ui modal">
      <i class="close icon"></i>
      <div class="header">
        编辑资料
      </div>
      <div class="image content">
        <div class="ui medium image">
          <img :src="GLOBAL.mediaUrl + userInfo.image">
        </div>
        <div class="description">
          <div class="ui header"></div>
          <p>We've grabbed the following image from the <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your registered e-mail address.</p>
          <p>Is it okay to use this photo?</p>
        </div>
      </div>
      <div class="actions">
        <div class="ui black deny button">
          Nope
        </div>
        <div class="ui positive right labeled icon button">
          Yep, that's me
          <i class="checkmark icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  name: 'Center',

  data() {
    return {
      courseList: [],
    };
  },
  methods: {
    handleOfCenter(){
      $('.ui.modal').modal('show');     
    },
    courseHandler(courseId) {
      this.$router.push({
        path: `/courses/${courseId}/details`
      });
    },
    getUserCourses() {
      console.log(this.userInfo);
      this.$http.getUserCourse().then(res => {
        console.log(res);
        this.courseList = res.data;
      });
    }
  },
  computed:{
    userInfo(){    
      return this.$store.state.userInfo;
    },
  },
  created() {
    this.getUserCourses();
  },
};
</script>

<style lang="css" scoped>

.head{
  width: 100%;
  height: 190px;
  background-color: #67C23A;
  border: 1px solid #67C23A;
  opacity: 0.7;
  color: #ffffff;
}
.userImg{
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  /* background-image: url(../../../static/images/user.jpg); */
  border: 1px solid #ffffff;
  margin: 50px 0 0 100px;
}
.head p{
  font-size: 20px;
  margin-left: 200px;
  margin-top: 60px;
}
.head span{
  margin-left: 200px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

</style>
