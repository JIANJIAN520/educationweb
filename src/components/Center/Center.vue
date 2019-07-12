<template>
	<div class="contain">
    <div class="head">
      <img class="userImg" v-if="userInfo.image" :src="GLOBAL.mediaUrl + userInfo.image" alt="">
      <img class="userImg" v-else src="../../../static/images/user.jpg" alt="" srcset="">
      <p class="username">{{ userInfo.name }}，你好！</p>
      <span>活着就要学习，学习不是为了活着。</span> 
      <el-button @click="handleOfCenter" type="success" style="border:1px solid #ffffff;margin-left:20px;" round>查看资料</el-button>
    </div>

    <el-col :offset="3" :md="16" :lg="16" v-if="userInfo.is_student">
      <p style="font-size: 24px;margin-top:20px;">我的课程</p>
      <ul>
        <li v-for="(course, index) in courseList" :key="'k' + course.course.id" @click="courseHandler(course.course_id)">
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

      <p style="font-size: 24px;margin-top:20px;">学习趋势分析表</p>
      <chart :chart-data="chartData"/>
      <el-divider></el-divider>
    </el-col>

    <el-col :offset="3" :md="16" :lg="16" v-else>
      <p style="font-size: 24px;margin-top:20px;">我的课程</p>
      <ul>
        <li v-for="(course, index) in courseList" :key="'k' + course.id" @click="courseHandler(course.id)">
          <el-divider></el-divider>
          <el-container>
            <el-aside width="400px">
              <img  :src="GLOBAL.mediaUrl + course.image" width="100%" alt>
            </el-aside>
            <el-main>
              <div class="name">
                <p style="line-height:4; font-size: 24px;">{{ course.name}}</p>
              </div>
            </el-main>
          </el-container>
        </li>
      </ul>
    </el-col>

    <div class="ui modal" v-if="userInfo.is_student">
      <i class="close icon"></i>
      <div class="header">编辑资料</div>      
      <div class="image content">
        <div class="ui medium image">
<!-- 
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload> -->

          <img v-if="userInfo.image" class="userImage" :src="GLOBAL.mediaUrl + userInfo.image">
          <img v-else class="userImage" src="../../../static/images/user.jpg">
          <el-button round style="margin:10px 0 0 0;">切换头像</el-button>
          <input style="display:none;" type="file" name="">
        </div>
        <div class="description">
          <p>
            用户名：
            <el-input style="width:80%;margin-left:70px;" v-model="userInfo.name" placeholder="请输入内容"></el-input>
          </p>

          电话号码：
          <el-input style="width:80%;margin-left:70px;" v-model="userInfo.phone" placeholder="请输入内容"></el-input>
        </div>
      </div>

      <div class="actions">
        <div class="ui black deny button">
          取消
        </div>
        <div class="ui positive right labeled icon button">
          提交
          <i class="checkmark icon"></i>
        </div>
      </div>
    </div>


    <div class="ui modal" v-else>
      <i class="close icon"></i>
      <div class="header">
        编辑资料
      </div>
      <div class="image content">
        <div class="ui medium image">
          <img class="userImage" v-if="userInfo.image" :src="GLOBAL.mediaUrl + userInfo.image">
          <img class="userImage" v-else src="../../../static/images/user.jpg">
          <el-button round style="margin:10px 0 0 0;">切换头像</el-button>
          <input style="display:none;" type="file" name="">
        </div>
        <div class="description">
          <p>
            用户名：
            <el-input style="width:80%;margin-left:70px;" v-model="userInfo.name" placeholder="请输入内容"></el-input>
          </p>
          <p>
            电话号码：
            <el-input style="width:80%;margin-left:70px;" v-model="userInfo.phone" placeholder="请输入内容"></el-input>
          </p>
        </div>
      </div>
      <div class="actions">
        <div class="ui black deny button">取消</div>
                   
        <div class="ui positive right labeled icon button">提交<i class="checkmark icon"></i>
                    
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Chart from './Chart'

export default {
  name: 'Center',
  components: {Chart},
  data() {
    return {
      courseList: [],
      chartData: {}
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
      this.$http.getUserCourse().then(res => {
        this.courseList = res.data;
      });
    },
    getScores(){
      this.$http.getScores().then(res => {
        let bottomTitles = [];
        let chartData = {
          'dimensions':['章节'],
          'sources': [
          ]
        };
        for (let item of res.data) {
          // 添加X轴
          if (chartData.dimensions.indexOf(item.chapter.course) < 0) {
            chartData.dimensions.push(item.chapter.course)
          }

          var added = false
          // 尝试添加当前科目到sources
          for (let source of chartData.sources) {
            if (item.chapter.name.slice(0, 3) === source.章节) {
              source[item.chapter.course] = item.score
              added = true
            }
          }

          // 如果添加失败，这证明该章节不在sources中
          if (!added) {
            var new_source = {
              章节: item.chapter.name.slice(0, 3)
            }
            new_source[item.chapter.course] = item.score
            chartData.sources.push(new_source)
          }
        }
        this.chartData = chartData
      });
    },
  },
  computed: {
    userInfo(){  
      let userInfo = this.$store.state.userInfo;
      if (!userInfo) {
        this.$router.push('/')
      }
      return userInfo
    },
  },
  created() {
    this.getUserCourses();
  },
  mounted() {
    this.getScores();
  }
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
.userImage{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #ffffff;
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
