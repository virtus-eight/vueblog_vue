import axios from 'axios'
import Element from 'element-ui'
import store from './store'
import router from './router'
//设置请求前缀
axios.defaults.baseURL="http://localhost:8888"

//前置拦截
axios.interceptors.request.use(function (config) {
    console.log("前置拦截")
    return config;
})

//后置拦截
axios.interceptors.response.use(function (response) {
    console.log("后置拦截")
    let res = response.data;

    console.log(res);
    if (res.code === "0"){
        return response;
    }else {
        Element.Message.error(res.msg,{duration:3*1000});
        //
        return Promise.reject(response.data.msg);
    }
},
    function (error) {
        console.log(error)
        if (error.response.data!=null){
            error.message=error.response.data.msg
        }
        if (error.response.status==401){
            //执行store里面的清空方法
            store.commit("REMOVE_INFO")
            //路由跳转到login页面
            router.push("/login")
        }else {
            //获取err message信息
            Element.Message.error(error.message,{duration:3*1000})
            //阻止返回
            return Promise.reject(error);
        }
    }
)