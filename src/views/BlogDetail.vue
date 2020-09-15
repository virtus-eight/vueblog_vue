<template>
    <div>
        <Header></Header>
        <div class="mblog">
            <h2>{{blog.title}}</h2>
            <el-link icon="el-icon-edit" v-show="editBlog">
                <router-link :to="{name:'BlogEdit',params:{blogId:blog.id}}">编辑</router-link>
            </el-link>
            <el-divider></el-divider>
            <div v-html="blog.content" class="markdown-body"></div>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header"
    import 'github-markdown-css/github-markdown.css'
    export default {
        name: "BlogDetail",
        components:{Header},
        data(){
            return{
                blog:{
                    id:'',
                    title: '',
                    description: '',
                    content: ''
                },
                editBlog:false
            }
        },
        created() {
            const thisId=this.$route.params.blogId;
            console.log(thisId)
            if (thisId!==null&&thisId!==""){
                const _this=this;
                _this.$axios.get("/blog/blogs/"+thisId).then(function (response) {
                    var blog = response.data.data;
                    _this.blog.id=blog.id;
                    _this.blog.title=blog.title;
                    _this.blog.description=blog.description;
                    var markdown = require("markdown-it");
                    var md=new markdown();
                    var render = md.render(blog.content);
                    _this.blog.content=render;

                    _this.editBlog=(blog.id===_this.$store.getters.getUserInfo.id)
                })
            }
        }
    }
</script>

<style scoped>
    .mblog{
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 100%;
        min-height: 500px;
        padding:20px;
    }
</style>