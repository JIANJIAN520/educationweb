import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
Vue.use(Vuex);

let store = new Vuex.Store({
	// 三大将
	state:{
		userInfo: VueCookies.get('userInfo'),
		num: 0
	},
	// 修改state的唯一方法 是提交mutations
	mutations:{
		setUserInfo(state,user){
			VueCookies.set('userInfo', user)
			state.userInfo = user;
			VueCookies.set('token', user.id)
			console.log(state.userInfo);
		},
		removeUserInfo(state){
			VueCookies.remove('userInfo')
			state.userInfo = null
			VueCookies.remove('token')
		},
		shopcart_num(state,num){
			state.num = num;
		}
	},
	actions:{
		setUserInfo({commit},user){
			commit('setUserInfo',user);
		},
		removeUserInfo({commit}) {
			commit('removeUserInfo');
		},
		shopcart_num({commit},num){
			commit('shopcart_num',num)
		}
	}
});
export default store;