<template>
  <el-container>
    <el-footer class="copy-rights">
      <p>Copyright &copy; 2019 Hongjian Li</p>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  name: 'SBfooter',
  methods:{
    shopCartInfo(){
        this.$router.push({
            name:'purchase.shop'
        })
    },
    enterHandler(){
      this.isShow = true;
    },
    leaveHandler(){
      this.isShow = false;
    }

  },
  computed:{
    userInfo(){
      console.log(this.$store.state.userInfo);
      return this.$store.state.userInfo;
    },
    shopcart_num(){
      
      return this.$store.state.num
    }
  },

};
</script>

<style scoped>
.el-container{
  background:#555F76;
	padding: 45px 0 30px;
  text-align: center;
  width: 100%;
}
.copy-rights p {
	color: #fff;
	font-size: 18px;
	font-weight: 200;
}
</style>