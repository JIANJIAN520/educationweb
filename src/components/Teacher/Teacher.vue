<template>
  <div class="container">
    <div class="nav-teacher">
      <el-row>
        <el-col :xs="12" :sm="10" :md="8" :lg="6" :offset="12">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="nav in navList" :key="nav.id" :label="nav.title" :name="nav.name"></el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="40" style="margin: 10px auto;">
      <div class="ui special cards" @mouseenter="handleMouseHover">
        <el-col 
          :xs="8"
          :sm="8"
          :md="8"
          :lg="8"
          :xl="8"
          v-for="teacher in teacherList"
          :key="teacher.id"
        >
          <div class="card" @click="teacherHandler(teacher.id)">
            <div class="blurring dimmable image">
              <div class="ui dimmer">
                <div class="content">
                  <div class="center">{{ teacher.description }}</div>
                </div>
              </div>
              <img :src="GLOBAL.mediaUrl + teacher.picture" alt width="100%">
            </div>
            <div class="content teacher-content">
              <a class="header">{{ teacher.name}}【 小学{{ teacher.subjectname}}老师 】</a>
              <div class="meta">
                <p class="date">
                  {{ teacher.education }}
                  <span class="teaching_age" style="margin-left:10px;">{{ teacher.teaching_age }}年教龄</span>
                </p>
              </div>
              <div class="meta">
                <span class="date">教师资格证编号： {{ teacher.teach_code }}</span>
              </div>
            </div>
            <div class="extra content">
              <a>
                <i class="users icon"></i>
                共 2 门课程
              </a>
            </div>
          </div>
        </el-col>
        </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Teacher",

  data() {
    return {
      activeName: "all",
      dialogVisible: false,
      teacherList: [],
      navList: [
        { id: 1, title: "全部", name: "all" },
        { id: 2, title: "语文", name: "chinese" },
        { id: 3, title: "数学", name: "math" },
        { id: 4, title: "英语", name: "english" }
      ]
    };
  },
  methods: {
    teacherHandler(teacherId) {
      this.$router.push({
        path: `/teacher/${teacherId}/details`
      });
    },
    handleClick(tab, event) {
      tab.paneName == "all"
        ? this.getTeacherList()
        : this.getTeacherList(tab.paneName);
    },
    handleMouseHover() {
      $(".special.cards .image").dimmer({
        on: "hover"
      });
    },
    getTeacherList(subject) {
      this.$http.getTeachers({ subject: subject }).then(res => {
        console.log(res);
        res.data.map(item => {
          this.getSubjectName(item);
        });
        this.teacherList = res.data;
      });
    },
    getSubjectName(item) {
      item.subject == "math"
        ? (item.subjectname = "数学")
        : item.subject == "english"
        ? (item.subjectname = "英语")
        : (item.subjectname = "语文");
    }
  },
  created() {
    this.getTeacherList();
    document.styleSheets[0].addRule(
      ".el-tabs__nav-wrap::after",
      "background: #ffffff"
    );
  },
  destroyed() {
    document.styleSheets[0].addRule(
      ".el-tabs__nav-wrap::after",
      "background: #E4E7ED"
    );
  }
};
</script>

<style lang="css" scoped>
.el-row {
  width: 80%;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
   border-radius: 4px; 
   margin-bottom: 15px;
}
.ui.cards~.ui.cards{
  margin-top: -.875em;
}
.teacher-content a, .teacher-content span, .extra a{
  line-height: 2;
}
/* .bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
} */
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.teacher-box {
  text-align: center;
}
.teacher-box .teaching_age {
  margin-left: 10px;
}
.nav-teacher {
  /* border: 1px solid blue; */
  padding: 50px 15px;
}
.nav-teacher .el-breadcrumb {
  width: 220px;
  margin: auto;
  /* border: 1px solid red; */
}
.nav-teacher span {
  font-size: 18px;
}
.teacherList {
  /* border: 1px solid red; */
  text-align: center;
  padding-left: 100px;
}
.teacherList li {
  float: left;
  /* border: 1px solid red;  */
  padding: 10px;
  margin: 0 15px 15px 0;
  text-align: center;
}
</style>
