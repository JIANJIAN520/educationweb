<template>
  <div id="app">
    <!-- 导航区域 -->
    <LuffyHeader />
    <router-view/>
    <SBfooter />
  </div>
</template>

<script>
import LuffyHeader from '@/components/Common/LuffyHeader';
import SBfooter from '@/components/Common/SBfooter';

export default {
  name: 'App',
  components:{
    LuffyHeader,
    SBfooter
  }
}
</script>

<style scoped>
</style>
