<template>
    <div class="m-header">
        <H3>欢迎来到微辣的博客</H3>
        <div class="block">
            <el-avatar :size="50" :src="user.avatar"></el-avatar>
            <div>{{user.username}}</div>
        </div>
        <div class="m-menu">
            <span><el-link href="/blogs" target="_blank">主页</el-link></span>
            <el-divider direction="vertical"></el-divider>
            <span> <el-link type="success" href="/blog/add">发表博客</el-link></span>
            <el-divider direction="vertical"></el-divider>
            <span v-show="!hasLogin"><el-link type="primary" href="/login">登录</el-link></span>
            <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return{
                user:{
                    username:'请先登录',
                    avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                },
                hasLogin:false
            }
        },
        methods:{
            logout:function () {
                //退出
                const _this=this;
                //请求后端退出
                _this.$axios.get("/log/logout",{
                    headers:{
                        "Authorization":localStorage.getItem("token")
                    }
                }).then(function (response) {
                    console.log(response)
                    _this.$store.commit("REMOVE_INFO");
                    //跳转回到登录界面
                    _this.$router.push("/login")
                })
            }
        },
        //生命周期函数
        created() {
            if (this.$store.getters.getUserInfo!=null){
                this.hasLogin=true;
                this.user.username=this.$store.getters.getUserInfo.username
                this.user.avatar=this.$store.getters.getUserInfo.avatar
            }
        }
    }
</script>

<style scoped>
    .m-header {
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
    }
    .m-menu{
        margin: 10px 0;
    }
</style>