import Vue from 'vue'
import Router from 'vue-router'
// @ 绝对路径 检索到 .....src/
// 如果我们Router当做局部模块使用 一定要Vue.use(Router)
// 以后在组件中  可以通过this.$router  获取Router实例化对象
// 路由信息对象 this.$routes
import Home from '@/components/Home/Home'
import Course from '@/components/Course/Course'
import Teacher from '@/components/Teacher/Teacher'
import TeacherDetail from '@/components/Teacher/TeacherDetail'
import Center from '@/components/Center/Center'
import CourseDetail from '@/components/Course/CourseDetail'
import Login from '@/components/Login/Login'
import Register from '@/components/Register/Register'
import Cart from '@/components/Cart/Cart'
import CourseBuy from '@/components/Cart/CourseBuy'
Vue.use(Router)

// 配置路由规则
export default new Router({
   linkActiveClass:'is-active',
   mode: 'history',//改成history模式
  routes: [
    {
      path: '/',
      redirect:'/home'
      // component: HelloWorld
    },
    {
    	path:"/home",
    	name:'Home',
    	component:Home
    },
    {
    	path:"/course",
    	name:'Course',
    	component:Course
    },
    {
    	path:"/teacher",
    	name:'Teacher',
    	component:Teacher
    },
    // 教师详情
    {
      path:"/teacher/:teacherId/details",
      name:'teacherDetail',
      component:TeacherDetail,
    },
    {
    	path:"/center",
    	name:'Center',
    	component:Center
    },
    // 课程详情
    {
      path:"/courses/:detailId/details",
      name:'courseDetail',
      component:CourseDetail,
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    // 购物车的页面
    {
      path:"/purchase/shopping_cart",
      name:'purchase.shop',
      component:Cart
    },
    {
      path:'/course/buy',
      name:'course.buy',
      component:CourseBuy
    }
  ]
})
