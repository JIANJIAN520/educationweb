<template>

		<el-carousel indicator-position="outside" height="500px">
		    <el-carousel-item v-for="item in lunboImgs" :key="item.id">
		      <img :src="item.imgSrc" alt="">
		    </el-carousel-item>
		 </el-carousel>

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

img{
	width: 100%;
}
</style>
