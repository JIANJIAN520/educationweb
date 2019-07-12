
import Axios  from 'axios'
// 设置公共的url
import {baseApi} from '../../settings'
Axios.defaults.baseURL = baseApi
import QS from 'qs'
import VueCookies from 'vue-cookies'

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (VueCookies.get('token')) {
        //用户登录完成之后 ，每次请求都携带请求头的token值，
    	config.headers.Authorization = VueCookies.get('token')
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


  // 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.error && response.error == '未登录'){
        this.$notify({
            title: '提示',
            message: '这是一条不会自动关闭的消息',
            duration: 0
        });
    } 
    return response;
    
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


// 分类列表api
export const subjectList =  ()=> {
	return Axios.get('teacher').then(res=>res.data);
}

// 登录
export const  userLogin = (username,password)=>{
    // 这个参数至少有五个字段 username password  验证的三个字段
	return Axios.post('login', {username,password}).then(res=>res.data);
}
// 注册
export const  addUser = (params)=>{
    console.log(params);
    // 这个参数至少有五个字段 username password  验证的三个字段
    return Axios.post('signup', {params}).then(res=>res.data);
}

//添加评论
export const  addComment = (courseId,content) => {
	return Axios.put(`course/${courseId}/add/comment`, {content}).then(res=>res.data);
}

// 搜索查询
export const  exequery = (query) => {
	return Axios.get(`course/name`, {params: query}).then(res=>res.data);
}

// 获取点赞
export const  getLikes = (courseId) => {
	return Axios.get(`course/${courseId}/like/`).then(res=>res.data);
}

// 更改点赞
export const  updateLike = (courseId) => {
    return Axios.get(`course/${courseId}/update/like/`).then(res=>res.data);
}

// 获取评论
export const  getComments = (courseId) => {
    return Axios.get(`course/${courseId}/comment/`).then(res=>res.data);
}

// 获取课程列表
export const  courseList = (query) => {
    console.log(query)
	return Axios.get(`course`, {params: query}).then(res=>res.data);
}

// 获取老师列表
export const  getTeachers = (query) => {
    console.log(query)
	return Axios.get(`teacher`, {params: query}).then(res=>res.data);
}

// 获取用户的课程
export const  getUserCourse = (query) => {
	return Axios.get(`user/course`).then(res=>res.data);
}

// 课程详情顶部数据
export const courseTop = (courseId)=>{
	return Axios.get(`course/${courseId}/detail/`).then(res=>res.data);
}

// 通过id查询老师信息
export const  getTeacherById = (teacherId) => {
    return Axios.get(`teacher/${teacherId}/details/`).then(res=>res.data);
}

// 获取题目列表
export const  getProblems = (courseId,chapterId) => {
    return Axios.get(`course/${courseId}/detail/${chapterId}/problem/`).then(res=>res.data);
}

// 加入学习
export const joinStudy = (courseId,can_watch) => {
    console.log(courseId)
    return Axios.get(`course/${courseId}/join`, {params: can_watch}).then( res => res.data );
}

// 提交题目回答
export const submitAnswer = (courseId,params) => {
    return Axios.post(`course/${courseId}/problem/`, {params}).then( res => res.data );
}

// 获取分数表
export const getScores = () => {
    return Axios.get(`center/scores`).then( res => res.data);
}




// 课程概述
export const coursePaymentInfo = (courseid)=>{
	return Axios.get(`course/${courseid}/payment_info/`).then(res=>res.data);
}

// geetest接口
export const geetest = ()=>{
	return Axios.get(`captcha_check/`).then(res=>res.data);
}

// 加入购物车的接口
export const shopCart = (params)=>{
    console.log(params)
	return Axios.post('user/shop_cart/create/',params).then(res=>res.data);
}
// 购物车的数据
export const shopCartList = ()=>{
	return Axios.get(`user/shop_cart/list/`).then(res=>res.data);
}
export const removeCourse = (params)=>{
    // params = QS.stringify(params);
    // console.log(params); 
    // 如果服务端将参数当做 java对象来封装接收则 参数格式为：{data: param}
    return Axios.delete(`user/shop_cart/remove/`,{data: params}).then(res=>res.data);
}

//更新购物车套餐数据
export const shopCartUpdate = (params)=>{
    return Axios.put(`user/shop_cart/update/`,params).then(res=>res.data);
}
export const order_confirm = (params)=>{
    return Axios.post('/order/confirm/',params).then(res=>res.data)
}