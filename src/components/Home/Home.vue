<template>
  <div>
    <el-carousel indicator-position="outside" height="500px">
      <el-carousel-item v-for="item in lunboImgs" :key="item.id">
        <img :src="item.imgSrc" alt="">
      </el-carousel-item>
    </el-carousel>

    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <p style="font-size:40px;text-align: center;color:#F5A623;margin-bottom:10px;">配套学校教材的同步学习平台</p>
          <p style="font-size:16px;text-align: center;color:#99a9bf;">我们与您共同关注青少年的身心发展，共同培育祖国未来的花朵</p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :offset="3" :span="6">
        <div class="grid-content">
          <img src="../../../static/images/chinese.png">
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <img src="../../../static/images/math.png">
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <img src="../../../static/images/english.png">
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <p style="font-size:40px;text-align: center;color:#F5A623;margin-bottom:10px;">在线学习 有趣有效</p>
          <p style="font-size:18px;text-align: center;color:#99a9bf;">打破时间与地域的限制，高效利用课余时间</p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :offset="3" :span="6">
        <div class="grid-content bg-purple">
          <p style="margin-bottom:10px;">自由安排学习时间</p>
          <p style="font-size:18px;text-align: center;color:#99a9bf;">学员可根据自身情况 <br>自由定制上课时间</p>
          <!-- <img src="../../../static/images/chinese.png"> -->
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p style="margin-bottom:10px;">提升自主学习水平</p>
          <p style="font-size:18px;text-align: center;color:#99a9bf;">运用多元教学法，深度结合 <br>外教面授课+智能多媒体课件</p>
          <!-- <img src="../../../static/images/math.png"> -->
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p style="margin-bottom:10px;">教学服务保证</p>
          <p style="font-size:18px;text-align: center;color:#99a9bf;">外教、中方指导老师、课程顾问 <br>提供以学员为中心的优质教学</p>
          <!-- <img src="../../../static/images/math.png"> -->
        </div>
      </el-col>
    </el-row>

  </div>	
</template>

<script>
export default {

  name: 'Home',
  data() {
    return {
    	lunboImgs:[
        {
          id:1,
          imgSrc: '../../../static/images/a.png'
        },
         {
          id:2,
          imgSrc: '../../../static/images/b.png'
         },
           {
            id:3,
            imgSrc: '../../../static/images/c.png'
          }
      ]
    };
  },
  created(){
    // console.log(localStorage);
  }
};
</script>

<style lang="css" scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;

  }
  .bg-purple{
    /*border:1px solid #666;*/
    font-size:32px;
    text-align: center;
    color:#666;
    padding:60px 20px;
  }
  .bg-purple:hover{
    border:1px solid #F5A623;
  }
img{
	width: 100%;
}
</style>
