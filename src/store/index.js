import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.getItem("token"),
    userInfo:JSON.parse(sessionStorage.getItem("userInfo"))
  },
  mutations: {
    //set
    SET_TOKEN:function (state,token) {
        state.token=token;
        //
        localStorage.setItem("token",token);
    },
    SET_USERINFO:function (state,userInfo) {
        state.userInfo=userInfo;
        //放到会话中  不能存一个对象所以对象要序列化
        sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
    },
    REMOVE_INFO:function (state) {
      //删除全局里面以及 localStorage sessionStorage中的token userInfo
        state.token="";
        state.userInfo={};
        localStorage.setItem("token","");
        sessionStorage.setItem("userInfo",JSON.stringify(''));
    }
  },
  getters:{
    //get
    getUserInfo:function (state) {
        return state.userInfo;
    }
  },
  actions: {
  },
  modules: {
  }
})
