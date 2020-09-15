<template>
    <div>
        <Header></Header>
        <el-timeline>
            <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs" :key="index">
                <el-card>
                    <router-link v-bind:to="{name:'BlogDetail',params:{blogId:blog.id}}">
                        <h4>{{blog.title}}</h4>
                    </router-link>
                    <p>{{blog.description}}</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <el-pagination class="mpage"
                background
                layout="prev, pager, next"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       :total="total"
                        @current-change=page
        >
        </el-pagination>
    </div>
</template>

<script>
    import Header from "../components/Header"
    export default {
        name: "Blogs",
        //注册组件
        components:{Header},
        data(){
          return{
              blogs:{},
              currentPage:1,
              total:0,
              pageSize:5,
              pages:0
          }
        },
        methods:{
            page(currentPage){
                const _this=this;
                _this.$axios.get("/blog/blogs?currentPage="+currentPage).then(
                    function (response) {
                        /*console.log(response)*/
                        _this.blogs=response.data.data.records
                        _this.total=response.data.data.total
                        _this.pageSize=response.data.data.size
                        _this.pages=response.data.data.pages
                    }
                )
            }
        },
        created() {
            //页面渲染之前调用
            this.page(this.currentPage);
        }
    }
</script>

<style scoped>
    .mpage{
        margin: 0 auto;
        text-align: center;
    }
</style>